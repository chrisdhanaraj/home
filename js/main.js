( function($){

  $('.header__text').fitText(0.88);


  $('.fa-angle-down').on('click', function() {
    var target = $('#content-start');

    $('html,body').animate({
      scrollTop: target.offset().top
    }, 800);
  });
})(jQuery);
