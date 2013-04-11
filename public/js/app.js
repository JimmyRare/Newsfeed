var app = app || {};

$(document).ready(function() {

	new app.NewspaperView({ paper: 'ntAllt' });

	$('.menu').on('click', '.menuLink', function(e) {
		var rssFeed = $(this).attr('id');
		e.preventDefault();
		new app.NewspaperView({ paper: rssFeed });

	});

});