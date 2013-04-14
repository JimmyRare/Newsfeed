var app = app || {};
var socket = socket || io.connect('/');

app.ArticlesView = Backbone.View.extend({
	el: '.container',
	initialize: function() {
		var _this = this;
		var $article = $('.article');
		this.$el.isotope({
			itemSelector: '.article',
			getSortData: {
				latest: function( $article ) {
					return $article.find('.date').text();
				}
			} 
		});

		this.collection = new app.Articles();
		this.collection.on('add', function(article) {
			var articleView = new app.ArticleView({ model: article, id: article.cid });
			_this.$el.append(articleView.el)
				.isotope('reloadItems')
				.isotope({ sortBy: 'latest', sortAscending : false });
		});
	}
});