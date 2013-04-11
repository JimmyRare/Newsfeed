var app = app || {};

app.Newspaper = Backbone.Collection.extend({
	initialize: function(options) {
		this.options = options;
	},
	model: app.Article,
	url: function() {
		return '/api/rss/' + this.options.paper;
	}
});