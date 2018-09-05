$(document).ready(function() {

  $('.header__hamburger').click(function() {

      $(this).toggleClass('hamburger--active');
      $('.nav').toggleClass('active');

  });
  $('.nav li').click(function () {
      $(this).parents('.nav').removeClass('active');
  })
	

});

$(window).scroll(function() {

	if ($(this).scrollTop() > 80) {
		$('header').addClass('scroll');
	} else {
		$('header').removeClass('scroll');
	}

  // Add active to intro according to scroll height
  $('.section-header').each(function() {
    if ($(window).scrollTop() > $(this).offset().top - 20) {
      let id = $(this).attr('id');
      $('.intro-nav a').removeClass('active');
      $('[href="#'+ id +'"]').addClass('active');
    }
  });
  

});

$('.intro-nav a').on('click', function() {

  $('.intro-nav a').removeClass('active');
  $(this).addClass('active');

});

//
// Smooth Scroll
//
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 300, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });