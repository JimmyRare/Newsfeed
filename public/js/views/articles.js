var app = app || {};
var socket = socket || io.connect('/');

app.ArticlesView = Backbone.View.extend({
	el: '.container',
	initialize: function() {
		var _this = this;

		this.$el.isotope({
			itemSelector: '.article'
		});

		this.collection = new app.Articles();
		this.collection.on('add', function(article) {
			$('#followingBallsG').hide();
			var articleView = new app.ArticleView({ model: article});
			_this.$el.append(articleView.el)
				.isotope('reloadItems')
				.isotope({ sortBy: 'original-order' });
		});
	}
});