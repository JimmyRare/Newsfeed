var app = app || {};
var socket = socket || io.connect('/');

app.Article = Backbone.Model.extend({
	validate: function(attrs) {
		if(attrs === attrs) {
			return "this article already exists";
		}
	}
});