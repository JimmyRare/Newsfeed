var app = app || {};
var socket = socket || io.connect('/');

app.ArticleView = Backbone.View.extend({
	tagName: 'article',
	className: 'article',
	template: _.template($('#articleTemplate').html()),

	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.html(this.template(this.model));
		return this;
	}

});