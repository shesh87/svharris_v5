$('.js-mobilenav').on('click', function() {
	$('.js-navlist').slideToggle(350, 'linear');
	$('.mobilenav').toggleClass('active');
});




$('.js-backtotop').on('click', function(event){
  event.preventDefault();
  $('body').animate({
    scrollTop: 0,
    }, 700
  );
});

