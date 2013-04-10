var app = app || {};

app.ArticleView = Backbone.View.extend({
	tagName: 'article',
	className: 'articleContainer',
	template: _.template($('#articleTemplate').html()),
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});