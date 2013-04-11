var app = app || {};

app.NewspaperView = Backbone.View.extend({
	el: '.container',

	initialize: function() {
		this.collection = new app.Newspaper({ paper: this.options.paper });
		this.collection.shift(); // don't as me why it includes the paper object in the collection.. :S
		this.collection.fetch({reset: true});
		this.render();
		this.collection.on('reset', this.render, this);
	},

	render: function() {
		var _this = this;

		this.$el.empty();
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