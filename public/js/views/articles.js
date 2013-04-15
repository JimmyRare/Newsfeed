var app = app || {};
var socket = socket || io.connect('/');
var rssFeed = rssFeed || 'ntAllt';

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
			_this.$el.append(articleView.el);
		});

		socket.on('feed-complete', function() {
			_this.$el.isotope('reloadItems').isotope({ sortBy: 'latest', sortAscending : false });

			// Scroll down to the latest article of the requested feed
			setTimeout(function() {
				$('html,body').animate({
					scrollTop: $('.' + rssFeed).first().offset().top
				}, 'fast');
			}, 100);

			// Add a border to the latest article of the feed
			$('.article').removeClass('special-border');
			$('.' + rssFeed).first().addClass('special-border');
		});
	}
});