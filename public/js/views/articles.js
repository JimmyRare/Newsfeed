var app = app || {};
var socket = socket || io.connect('/');
var rssFeed = rssFeed || 'ntAllt';

app.ArticlesView = Backbone.View.extend({
	el: '.container',
	initialize: function() {
		var _this = this;

		this.collection = new app.Articles();

		this.$el.imagesLoaded(function() {
			_this.$el.isotope({
				itemSelector: '.article',
				getSortData: {
					dateAndTime: function( $elem ) {
						return $elem.find('.date').attr('data-time');
					}
				} 
			});
		});

		this.collection.on('add', function(article) {
			var articleView = new app.ArticleView({ model: article, id: article.cid });
			_this.$el.append(articleView.el);
		});

		socket.on('feed-complete', function() {
			// Sort articles
			_this.$el.isotope('reloadItems')
				.isotope({ sortBy: 'dateAndTime', sortAscending: false });

			// Scroll down to the latest article of the requested feed
			setTimeout(function() {
				$('html,body').animate({
					scrollTop: $('.' + rssFeed).first().offset().top
				}, 'fast');
			}, 100);

			// Add a border to the latest article of the feed
			$('article').removeClass('special-border');
			$('article').first().addClass('special-border');
		});
	}
});