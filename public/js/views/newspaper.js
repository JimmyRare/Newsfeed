var app = app || {};

app.NewspaperView = Backbone.View.extend({
	el: '.wrapper',

	initialize: function() {
		this.collection = new app.Newspaper();
		this.collection.fetch({reset: true}),
		this.render();

		this.collection.on('reset', this.render, this);
	},

	render: function() {
		this.collection.each(function(article) {
			this.renderArticle(article);
		}, this);
	},

	renderArticle: function(article) {
		var articleView = new app.ArticleView({
			model: article
		});
		this.$el.append(articleView.render().el);
	}
});