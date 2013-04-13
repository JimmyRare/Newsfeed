var app = app || {};
var socket = socket || io.connect('/');

app.Articles = Backbone.Collection.extend({

	model: app.Article,

	initialize: function() {
		_this = this;
		socket.on('article', function(article) {
			_this.add(article);
		});

		this.on('add', function(article) {
			console.log(article.get('title'));
		});
	}

});