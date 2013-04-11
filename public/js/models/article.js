var app = app || {};

app.Article = Backbone.Model.extend({
	defaults: {
		title: 'Unknown title',
		link: 'Unknown link',
		pubDate: 'Unknown pubDate',
		description: 'Unknown description'
	}
});