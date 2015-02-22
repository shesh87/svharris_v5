$('').on('hover', function() {
	$('.project-title').addClass('.project-row h3:hover');
})


$('.js-btn-nav').on('click touchstart', function() {
	$('.js-navbar-sml').slideToggle(350, 'linear');
	$('.btn-nav.fa-bars').toggleClass('fa-bars-active');
});

function outsideClick() {
	$('html').on('click touchstart', function() {
		$('.js-navbar-sml').hide();
		$('.btn-nav.fa-bars').removeClass('fa-bars-active');
	});
}
	















