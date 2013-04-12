var app = app || {};
var socket = socket || io.connect('/');

app.ArticlesView = Backbone.View.extend({
	el: '.container',
	initialize: function() {
		var _this = this;

		if(!this.$el.hasClass('isotope')) {
			this.$el.isotope({
				itemSelector: '.article'
			});
		}

		this.collection = new app.Articles();

		socket.on('article', function(article) {
			var articleView = new app.ArticleView({model: article});
			articleView.render();
			_this.$el.prepend(articleView.el).isotope('insert', $(articleView.el));
		});
	}
});