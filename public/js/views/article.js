var app = app || {};
var socket = socket || io.connect('/');
var paperId = paperId || 'nt';

app.ArticleView = Backbone.View.extend({
	tagName: 'div',
	className: 'article',
	template: _.template($('#articleTemplate').html()),

	initialize: function() {
		// Format pubDate into time and date
		var pubDate = this.model.get('pubDate'),
				date = pubDate.substr(0, 10),
				time = pubDate.substr(12, 7),
				dateAndTime = date + ' ' + time;
		this.model.set('dateAndTime', dateAndTime);

		// Give it the class of paperId
		this.$el.addClass(paperId);

		this.render();
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}

});