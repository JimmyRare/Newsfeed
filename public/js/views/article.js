var app = app || {};
var socket = socket || io.connect('/');
var paperId = paperId || 'nt';
var rssFeed = rssFeed || 'ntAllt';

app.ArticleView = Backbone.View.extend({
	tagName: 'div',
	className: 'article',
	template: _.template($('#articleTemplate').html()),

	initialize: function() {
		// Format pubDate into time and date
		var pubdate = this.model.attributes.pubdate,
				date = pubdate.substr(0, 10),
				time = pubdate.substr(11, 8),
				dateAndTime = date + ' ' + time;
		this.model.set('date', date);
		this.model.set('time', time);
		this.model.set('dateAndTime', dateAndTime);

		// Give it the class of paperId
		this.$el.addClass(paperId);

		this.render();
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON())).addClass(rssFeed);
		return this;
	}

});