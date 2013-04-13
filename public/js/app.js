var app = app || {};
var socket = socket || io.connect('/');

$(document).ready(function() {
	var rssFeed = 'ntAllt';

	// Init view
	new app.ArticlesView();

	socket.on('connected', function(data) {
		console.log(data.message);
	});

	// Choose newspaper
	$('.paper-menu').on('click', '.paper-menuLink', function(e) {
		var paperId = $(this).attr('id');

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

		$('.container').empty();
		$('#followingBallsG').show();

		$('.menuLink').removeClass('selected');
		$(this).addClass('selected');

		// Scroll down to content if on mobile
		if($(window).width() < 480) {
			$('html,body').animate({
				scrollTop: $('.container').offset().top
			}, 'fast');
		}

		// Tell the server that we want some articles
		socket.emit('feed', { rssFeed: rssFeed });

	});

});