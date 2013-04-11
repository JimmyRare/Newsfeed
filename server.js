// Module dependencies
var express = require('express'),
	Feedr	= require('feedr').Feedr,
	feedr   = new Feedr(); 	

// Create server
var app = express();

// Configure server
app.configure(function() {
	app.use(express.bodyParser());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

// Start server
var port = 3000;
app.listen(port, function() {
	console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
	console.log(__dirname + '/public');
});

// Collect feeds
var feeds = {
	ntAllt: {
		url: 'http://www.nt.se/allt.rss'
	},
	ntLok: {
		url: 'http://www.nt.se/lok.rss'
	},
	ntNorrkoping: {
		url: 'http://www.nt.se/norrkoping.rss'
	}
}

// Get NT Allt feed
app.get('/api/rss/:paper', function(request, response) {
	feedr.readFeeds(feeds, function(err, result) {
		if(!err) {
			return response.send(result[request.params.paper].rss.channel[0].item);
		} else {
			console.log(err);
		}
	});
});