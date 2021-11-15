'use strict';
if (matchMedia("screen and (min-width: 980px)").matches) {
  // 980px 이상에서 사용할 JavaScript
  setImageSlide('#main .slick-wrap', 1);
  squareCheckScroll();
  goToTop();
  topCheckScroll();
  checkVisibility('div.tit-box-wrap');
} else {
  // 980px 미만에서 사용할 JavaScript
  setImageSlide('#main .slick-wrap', 1);
  checkVisibility('div.tit-box-wrap');
  menuToggle();
  bottomFixed();
}

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
  }
  
}


//right float btn -- S
function squareCheckScroll() {
  $(window).on('scroll resize', function() {
    var scrollAmt = $(document).scrollTop();
    if(scrollAmt < 200) {
      $('.right-btn').addClass('stop');
      $('.right-btn').css({'position': 'absolute', 'top': '44.25vw'});
    } else if(scrollAmt >= 200 && scrollAmt < 468) {
      $('.right-btn').removeClass('stop');
    } else {
      $('.right-btn').css({'position': 'fixed', 'top': '160px'});
      $('.right-btn').hover(function() {
        $(this).addClass('stop')
      }, function() {
        $(this).removeClass('stop')
      });
    }
  });
}

//스크롤 탑으로 올라가는 코드 jquery
//stop을 넣어주면 que 쌓이는거 막을 수 잇어여
function goToTop () {
  $('.top-btn a').on('click', function() {
    $('html').stop(true).animate({'scrollTop': 0}, 500, function() {
    });
  })
}


//top 버튼 자리 찾아가기
function topCheckScroll() {
  $(window).on('scroll resize', function() {
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
  });
}

//페이지 대제목 스크롤시 나타나기
function checkVisibility(selector) {
  $(window).on('scroll resize', function() {
    $(selector).each(function() {
      var $selector = $(this);
      var start = $selector.offset().top - $(window).height();
      var scrollAmt = $(document).scrollTop();
      if (scrollAmt > start) {
        $selector.addClass('on');
      } else {
        $selector.removeClass('on');
      }
    });
  });
}

//모바일 js
//menu-mo 나타나기
function menuToggle() {
  $('div.menu-mo a').on('click', function() {
    $('#header .gnb-wrap').addClass('on')
    $('div.menu-mo').addClass('on')
  })
  $('div.gnb-wrap > a').on('click', function() {
    $('#header .gnb-wrap').removeClass('on')
    $('div.menu-mo').removeClass('on')
  })
};

//하단 fixed scroll
function bottomFixed() {
  $(window).on('scroll resize', function() {
    var scrollAmt = $(document).scrollTop();
    var windowHeight = $(window).innerHeight();
    var footerHeight = $('#footer').offset().top;
    if(scrollAmt > windowHeight && scrollAmt + windowHeight < footerHeight) {
      $('.float-btn-mo').css({'opacity': '1'});
      $('.float-btn-mo').removeClass('stop');
    }else if (scrollAmt + windowHeight >= footerHeight){
      $('.float-btn-mo').addClass('stop');
    }

  });
}