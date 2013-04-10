var app = app || {};

app.Newspaper = Backbone.Collection.extend({
	model: app.Article,
	url: function(paper) {
		return '/api/rss/' + paper;
	}
});