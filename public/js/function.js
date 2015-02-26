$('.js-btn-nav').on('click', function() {
	$('.js-navbar-sml').slideToggle(350, 'linear');
	$('.btn-nav.fa-bars').toggleClass('fa-bars-active');
});




$('.btn-up').on('click', function(event){
  event.preventDefault();
  $('body').animate({
    scrollTop: 0,
    }, 700
  );
});










