var app = app || {};
var socket = socket || io.connect('/');

app.Articles = Backbone.Collection.extend({

	model: app.Article,

	initialize: function() {
		_this = this;

		this.collectionSizeBefore = 0;
		this.collectionSizeAfter = 0;
		this.collectionAdded = 0;

		socket.on('article', function(article) {
			var match = _this.findWhere({ title: article.title, pubDate: article.pubDate });
			if(!match) {
				_this.unshift(article);
			}
		});

		socket.on('feed-start', function(data) {
			console.log('feed-start');
			_this.collectionSizeBefore = _this.length;
			console.log('Collections size is: ' + _this.collectionSizeBefore);
			$('#followingBallsG').hide();
		});

		socket.on('feed-complete', function() {
			console.log('feed-complete');
			_this.collectionSizeAfter = _this.length;
			_this.collectionAdded = _this.collectionSizeAfter - _this.collectionSizeBefore;
			console.log('Added ' + _this.collectionAdded + ' article(s)' );
			console.log('Collections size is now: ' + _this.collectionSizeAfter);
		});

		this.on('add', function(article) {
			console.log(article);
		});
	}

});