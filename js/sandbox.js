'use strict';

$('div.menu-mo a').on('click', function() {
  $('#header .gnb-wrap').toggleClass('on')
})

setImageSlide('#main .slick-wrap', 1);

function setImageSlide(selector, first) {
  var $selector = $(selector);
  var numSlide = $('#main .slick-txt-wrap li').length;
  var slideNow = 0;
  var slidePrev = 0;
  var slideNext = 0;
  var slideFirst = first;

  $selector.find('.control a.prev').on('click', function() {
    showSlide(slidePrev);
  });
  
  $selector.find('.control a.next').on('click', function() {
    showSlide(slideNext);
  });

    showSlide(slideFirst);


  function showSlide(n) {
    //슬라이드 효과
    // $selector.find('.slick-txt-wrap li')
    $selector.find('.slick-txt-wrap li').addClass('off');
    $selector.find('.slick-txt-wrap li').removeClass('on');
    $selector.find('.slick-txt-wrap li:eq(' + (n - 1) +')').addClass('on');
    $selector.find('.slick-txt-wrap li:eq(' + (n - 1) +')').removeClass('off');

    $selector.find('.slick-img-wrap li').addClass('off');
    $selector.find('.slick-img-wrap li').removeClass('on');
    $selector.find('.slick-img-wrap li:eq(' + (n - 1) +')').addClass('on');
    $selector.find('.slick-img-wrap li:eq(' + (n - 1) +')').removeClass('off');
    slideNow = n;
    slidePrev = (n <= 1) ? numSlide : (n - 1);
    slideNext = (n >= numSlide) ? 1 : (n + 1);
    console.log(slideNow);
  }
  
}


//right float btn -- S

sqrareCheckScroll();
$(window).on('scroll resize', function() {
  sqrareCheckScroll();
});

function sqrareCheckScroll() {
  var scrollAmt = $(document).scrollTop();
  if(scrollAmt < 200) {
    $('.right-btn').addClass('stop');
    $('.right-btn').css({'position': 'absolute', 'top': '44.25vw'});
  } else if(scrollAmt >= 200 && scrollAmt < 458) {
    $('.right-btn').removeClass('stop');
  } else {
    $('.right-btn').css({'position': 'fixed', 'top': '160px'});
    $('.right-btn').hover(function() {
      $(this).addClass('stop')
    }, function() {
      $(this).removeClass('stop')
    });
  }
}
//right float btn -- E


//스크롤 탑으로 올라가는 코드 jquery
//stop을 넣어주면 que 쌓이는거 막을 수 잇어여
$('.top-btn a').on('click', function() {
  $('html').stop(true).animate({'scrollTop': 0}, 500, function() {
  });
})

//scroll 된 양이 refresh 되도 읽을 수 있게 하는 것
topCheckScroll();

$(window).on('scroll resize', function() {
  topCheckScroll();
});

function topCheckScroll() {
  var scrollAmt = $(document).scrollTop();
  var windowHeight = $(window).innerHeight();
  var documentHeight = $('#footer').offset().top;
  if(scrollAmt > windowHeight && scrollAmt + windowHeight < documentHeight) {
    $('.top-btn').addClass('onShow');
    $('.top-btn').removeClass('bottomFixed');
  }else if (scrollAmt + windowHeight >= documentHeight) {
    $('.top-btn').addClass('bottomFixed');
  }else {
    $('.top-btn').removeClass('onShow');
  }
}

checkVisibility('div.tit-box-wrap');

$(window).on('scroll resize', function() {
  checkVisibility('div.tit-box-wrap');
});

function checkVisibility(selector) {
  $(selector).each(function() {
    var $selector = $(this);
    var start = $selector.offset().top - $(window).height();
    // var end = $selector.offset().top + $selector.outerHeight();
    var scrollAmt = $(document).scrollTop();
    if (scrollAmt > start) {
      $selector.addClass('on');
    } else {
      $selector.removeClass('on');
    }
  });
}


