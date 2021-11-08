
'use strict';

function setImageSlide() {
  var numSlide = $('#main .slick-wrap li').length;
  var slideNow = 0;
  var slidePrev = 0;
  var slideNext = 0;
  var slideFirst = 1;

  $('#main .control a.prev').on('click', function() {
    showSlide(slidePrev);
  });
  
  $('#main .control a.next').on('click', function() {
    showSlide(slideNext);
  });

  function showSlide(n) {
    //슬라이드 효과
    $('#main .slick-wrap li').css({'display': 'none'});
    $('#main .slick-wrap li:eq(' + (n - 1) +')').css({'display': 'block', 'transition-delay': '1.5s'});
    $('#main .slick-img-wrap li').css({'display': 'none'});
    $('#main .slick-img-wrap li:eq(' + (n - 1) +')').css({'display': 'block'});
    slideFirst = 1;
    slideNow = n;
    slidePrev = (n <= 1) ? numSlide : (n - 1);
    slideNext = (n >= numSlide) ? 1 : (n + 1);
    console.log(slidePrev + ' / ' + slideNow + ' / ' + slideNext);
  }
}

setImageSlide();



