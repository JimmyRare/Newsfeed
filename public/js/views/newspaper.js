var app = app || {};

app.NewspaperView = Backbone.View.extend({
	el: '.container',

	initialize: function() {
		var _this = this;
		this.collection = new app.Newspaper({ paper: this.options.paper });
		this.collection.shift(); // don't as me why it includes the paper object in the collection.. :S

		// Init isotope
		this.$el.isotope();

		// Show loader
		this.$el.empty();
		$('#followingBallsG').show();

		// Fetch rss
		this.collection.fetch({reset: true}).complete(function() {
			_this.render();
		});

		// Re-render on reset(fetch)
		this.collection.on('reset', this.render, this);
	},

	render: function() {
		var _this = this;
		//Hide loader
		$('#followingBallsG').hide();
		console.log('should be empty');
		this.collection.each(function(article) {
			this.renderArticle(article);
		}, this);

		setTimeout(function() {
			_this.$el.isotope();
		}, 0);

		return this;
	},

	renderArticle: function(article) {
		var articleView = new app.ArticleView({
			model: article
		});
		this.$el.append(articleView.render().el);
		this.$el.isotope('reloadItems');
	}
});