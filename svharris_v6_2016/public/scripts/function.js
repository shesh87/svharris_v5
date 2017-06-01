
$('.js-mobilenav').on('click', function() {
	$('.js-navlist').slideToggle(350, 'linear');
	$('.mobilenav').toggleClass('active');
});

// $('.navbar--list').on('click', function() {
// 	$('.js-navlist').slideToggle(350, 'linear');
// });

$('.js-backtotop').on('click', function(event){
	event.preventDefault();
	$('body').animate({
		scrollTop: 0,
	}, 700);
});

