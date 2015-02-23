
$('.js-btn-nav').on('click', function() {
	$('.js-navbar-sml').slideToggle(350, 'linear');
	$('.btn-nav.fa-bars').toggleClass('fa-bars-active');
});




$(function () {

  $("#slider1").responsiveSlides({
    auto: true,
    pager: true,
    nav: true,
    speed: 500,
    // maxwidth: 800,
    namespace: "centered-btns"
  });

});















