var app = app || {};
var socket = socket || io.connect('/');

app.Articles = Backbone.Collection.extend({

	model: app.Article

});