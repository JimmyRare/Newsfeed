var app = app || {};

app.ArticleView = Backbone.View.extend({
	tagName: 'article',
	className: 'article',
	template: _.template($('#articleTemplate').html()),
	render: function() {
		var model = this.model.toJSON();
		// Remove GMT info
		model.pubDate[0] = model.pubDate[0].substring(0, model.pubDate[0].length - 5);
		this.$el.html(this.template(model));
		return this;
	}
});