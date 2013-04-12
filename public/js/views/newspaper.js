var app = app || {};

app.NewspaperView = Backbone.View.extend({
	el: '.container',

	initialize: function() {
		var _this = this;
		this.collection = new app.Newspaper({ paper: this.options.paper });
		this.collection.shift(); // don't as me why it includes the paper object in the collection.. :S

		// Init isotope
		setTimeout(function() {
			if($('.article').length > 0) {
				_this.$el.isotope();
			}
		}, 0);

		// Show loader
		this.$el.empty();
		$('#followingBallsG').show();

		// Fetch rss
		this.collection.fetch({reset: true});
		this.render();

		// Re-render on reset(fetch)
		this.collection.on('reset', this.render, this);
	},

	render: function() {
		var _this = this;
		this.collection.each(function(article) {
			_this.renderArticle(article);
		}, this);

		setTimeout(function() {
			if($('.article').length > 0) {
				_this.$el.isotope();
			}
		}, 0);

		return this;
	},

	renderArticle: function(article) {
		var _this = this;
		var articleView = new app.ArticleView({
			model: article
		});
		var $article = $(articleView.render().el);

		$('#followingBallsG').hide();

		_this.$el.append($article).isotope('reloadItems');
	}
});