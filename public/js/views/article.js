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
		var months = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
			days = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag'],
		  	pubdate = this.model.attributes.pubdate,
			dateObj = new Date(pubdate),
			year = dateObj.getFullYear(),
			date = dateObj.getDate(),
			day = days[dateObj.getDay()],
			hour = ('0' + dateObj.getHours()).slice(-2),
			minute = ('0' + dateObj.getMinutes()).slice(-2),
			second = ('0' + dateObj.getSeconds()).slice(-2);

		var	dateFormat = day + ' ' + date + ' ' + year, 
			timeFormat = hour + ':' + minute, // seconds seem unecessary
		 	millis = dateObj.getTime();

		this.model.set('year', year);
		this.model.set('date', date);
		this.model.set('day', day);
		this.model.set('timeFormat', timeFormat);
		this.model.set('dateFormat', dateFormat);
		this.model.set('millis', millis);

		console.log(date);

		// Give it the class of paperId
		this.$el.addClass(paperId);

		this.render();
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON())).addClass(rssFeed);
		return this;
	}

});