var app = app || {};
var socket = socket || io.connect('/');
var paperId = paperId || 'nt';
var rssFeed = 'ntAllt';

$(document).ready(function() {

	// Init view
	new app.ArticlesView();

	socket.on('connected', function(data) {
		console.log(data.message);
	});

	// Choose newspaper
	$('.paper-menu').on('click', '.paper-menuLink', function(e) {
		paperId = $(this).attr('id');

		e.preventDefault();

		$('.paper-menuLink').removeClass('selected');
		$(this).addClass('selected');

		$('.menu').slideUp('fast');
		$('.menu-' + paperId).slideDown('fast');
	})

	// When a rss link is clicked
	$('.menu').on('click', '.menuLink', function(e) {
		rssFeed = $(this).attr('id');

		e.preventDefault();

		// Clear when fetching new stream
		// $('.container').empty();

		// Show loading animation
		$('#followingBallsG').show();

		$('.menuLink').removeClass('selected');
		$(this).addClass('selected');

		// Tell the server that we want some articles
		socket.emit('feed', { rssFeed: rssFeed });

	});

});