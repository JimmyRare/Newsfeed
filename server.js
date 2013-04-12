var express = require('express'),
	app = express(), 
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	FeedParser	= require('feedparser'),
	request   = require('request'); 	

// Configure server
app.configure(function() {
	app.use(express.bodyParser());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

// Start server
var port = 3000;
server.listen(port, function() {
	console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
	console.log(__dirname + '/public');
});

// Collect feeds
var feeds = {
	// NT
	ntAllt: {
		url: 'http://www.nt.se/allt.rss'
	},
	ntLok: {
		url: 'http://www.nt.se/lok.rss'
	},
	ntNorrkoping: {
		url: 'http://www.nt.se/norrkoping.rss'
	},
	ntFinspang: {
		url: 'http://www.nt.se/finspang.rss'
	},
	ntSoderkoping: {
		url: 'http://www.nt.se/soderkoping.rss'
	},
	ntValdemarsvik: {
		url: 'http://www.nt.se/valdemarsvik.rss'
	},
	ntInut: {
		url: 'http://www.nt.se/inut.rss'
	},
	ntSport: {
		url: 'http://www.nt.se/sport.rss'
	},
	ntNoku: {
		url: 'http://www.nt.se/noku.rss'
	},
	// NSD
	nsdAllt: {
		url: 'http://www.nsd.se/allt.rss'
	},
	nsdLok: {
		url: 'http://www.nsd.se/lok.rss'
	},
	nsdSport: {
		url: 'http://www.nsd.se/sport.rss'
	},
	nsdNoku: {
		url: 'http://www.nsd.se/noku.rss'
	},
	nsdInut: {
		url: 'http://www.nsd.se/inut.rss'
	},
	nsdFiske: {
		url: 'http://www.nsd.se/fiske.rss'
	},
	// Kuriren
	kurirenAllt: {
		url: 'http://2007.kuriren.nu/allt.rss'
	},
	kurirenLok: {
		url: 'http://2007.kuriren.nu/sn.rss'
	},
	kurirenInut: {
		url: 'http://2007.kuriren.nu/inut.rss'
	},
	kurirenSport: {
		url: 'http://2007.kuriren.nu/sport.rss'
	},
	kurirenNoku: {
		url: 'http://2007.kuriren.nu/noku.rss'
	},
	// Hela Gotland (HG)
	hgAllt: {
		url: 'http://www.helagotland.se/allt.rss'
	},
	hgLok: {
		url: 'http://www.helagotland.se/gotland.rss'
	},
	hgSport: {
		url: 'http://www.helagotland.se/sport.rss'
	},
	hgNoku: {
		url: 'http://www.helagotland.se/kultur_noje.rss'
	},
	// UNT
	untLedare: {
		url: 'http://www.unt.se/rss/ledare'
	},
	untLok: {
		url: 'http://www.unt.se/rss/lokalt'
	},
	untSport: {
		url: 'http://www.unt.se/rss/sport'
	},
	untNoku: {
		url: 'http://www.unt.se/rss/kulturnoje'
	},
	untEkonomi: {
		url: 'http://www.unt.se/rss/ekonomi'
	},
	untIn: {
		url: 'http://www.unt.se/rss/sverige'
	},
	untUt: {
		url: 'http://www.unt.se/rss/varlden'
	},
	untSenaste: {
		url: 'http://www.unt.se/rss/senaste'
	},
	// MVT
	mvtNyheter: {
		url: 'http://www.mvt.se/nyheter.rss'
	},
	mvtLedare: {
		url: 'http://www.mvt.se/ledare.rss'
	},
	mvtSport: {
		url: 'http://www.mvt.se/sport.rss'
	},
	mvtNoku: {
		url: 'http://www.mvt.se/kultur_noje.rss'
	},
	mvtFamilje: {
		url: 'http://www.mvt.se/familje.rss'
	}
}



// Socket.io
io.sockets.on('connection', function(socket) {
	socket.emit('connected', {message: 'Hello from the server'});
	console.log('connected');

	socket.on('feed', function(data) {
		request(feeds[data.rssFeed])
		  .pipe(new FeedParser())
		  .on('error', function (error) {
		    console.error(error);
		  })
		  .on('meta', function (meta) {
		    console.log('===== %s =====', meta.title);
		  })
		  .on('article', function(article){
		    console.log('Got article: %s', article.title || article.description);
		    socket.emit('article', article);
		  });
		});
});