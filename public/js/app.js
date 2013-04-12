var app = app || {};

$(document).ready(function() {
	var rssFeed = 'ntAllt';

	// Initialize View
	new app.NewspaperView({ paper: 'ntAllt' });

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

		$('.menuLink').removeClass('selected');
		$(this).addClass('selected');

		// Scroll down to content if on mobile
		if($(window).width() < 480) {
			$('html,body').animate({
				scrollTop: $('.container').offset().top
			}, 'fast');
		}

		// Create View
		new app.NewspaperView({ paper: rssFeed });

	});

});