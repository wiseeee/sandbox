'use strict';
if (matchMedia("screen and (min-width: 768px)").matches) {
  // 980px 이상에서 사용할 JavaScript
  $(document).ready(function() {
    preventDefaultAnchor()
    setImageSlide('#main .slick-wrap', 1);
    squareCheckScroll();
    goToTop();
    topCheckScroll();
    checkVisibility('div.tit-box-wrap');
  });
} else {
  // 768px 미만에서 사용할 JavaScript
  $(document).ready(function() {
    preventDefaultAnchor()
    setImageSlide('#main .slick-wrap', 1);
    checkVisibility('div.tit-box-wrap');
    menuToggle();
    bottomFixed();
    setGNB('#header ul.main-gnb > li > a')
    swipeContent('div.content-box-wrap > .drag-wrap > ul.hexGrid', 1)
    swipeContent('div.content-box-wrap > .drag-wrap > ul.news-box-wrap', 1)
    scrollShowLeft('div.content-box-wrap > .drag-wrap')
  });
}

// a[href="#"] 기본 동작 방지(상단 이동)
function preventDefaultAnchor() {
  $(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
  });
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
  return false;
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

//swipe js
function swipeContent (selector, first) {
  var $selector = $(selector);
  var numSlide = $selector.children('li').length;
  var slideNow = 0;
  var slidePrev = 0;
  var slideNext = 0;
  var slideFirst = first;
  var startX = 0;
  var delX = 0;
  var offsetX = 0;
  var boxWidth = 0;
  var barWidth = 0;
  var offsetLeft = 0;
  var minOffsetLeft = 0;
  var timerId = '';
  var counter = 0;

  resetUI();
  showSlide(slideFirst);

  $selector.on('mousedown', function(e) {
    e.preventDefault();
    $(this).css({'transition': 'none'});
    startX = e.clientX;
    offsetX = $(this).position().left;
    $(document).on('mousemove', function(e) {
      delX = e.clientX - startX;
      if (Math.abs(delX) > 5) isBlocked = true;
      if ((slideNow === 1 && delX > 0) || (slideNow === numSlide && delX < 0)) {
        delX = delX / 10;
      }
      $selector.css({'left': (offsetX + delX) + 'px'});

      $(document).on('mouseup', function() {
        $(document).off('mousemove mouseup');
        if (delX < -50 && slideNow !== numSlide) {
          if(offsetLeft <= minOffsetLeft) {
            $selector.css({'transition': 'none'}).stop(true).animate({'left': (minOffsetLeft - 10) + 'px'}, 80).animate({'left': minOffsetLeft + 'px'}, 160, function() {
              showSlide(slideNow);
            });
          } else {
            showSlide(slideNext);
          }
        } else if (delX > 50 && slideNow !== 1) {
          if (offsetLeft >= 0) {
            $selector.find('.slide').css({'transition': 'none'}).stop(true).animate({'left': '10px'}, 80).animate({'left': 0}, 160, function() {
              showSlide(slideNow);
            });
          } else {
            showSlide(slidePrev);
          }
        } else {
          showSlide(slideNow);
        }
        delX = 0;
      })
    })
  })

  $(window).on('resize', function() {
    if (counter > 10) {
      resetUI();
      showSlide(slideNow);
      counter = 0;
    }
    counter++;

    clearTimeout(timerId);
    timerId = setTimeout(function() {
      resetUI();
      showSlide(slideNow);
    }, 300);
  });

  function resetUI() {
    boxWidth = $selector.parent('div.content-box-wrap').width();
    barWidth = 0;
    $selector.find('li').each(function() {
      barWidth += $(this).outerWidth(true);
    });
    $selector.css({'width': (barWidth + 10) + 'px'});
    //보이는 width - ul width
    minOffsetLeft = boxWidth - barWidth;
  }

  function showSlide(n) {
    offsetLeft = -$selector.find('li:eq(' + (n -1) + ')').position().left;
    if (offsetLeft < minOffsetLeft) {
      offsetLeft = minOffsetLeft;
      numSlide = n;
    }
    $selector.css({'transition': 'left 0.5s', 'left': offsetLeft + 'px'});
    slideNow = n;
    slidePrev = (n <= 1) ? numSlide : (n - 1);
    slideNext = (n > numSlide) ? 1 : (n + 1);
  }
}

//swiper scroll하면 나타나기 옆에서 나타나기
function scrollShowLeft (selector) {
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

//모바일 sub menu 오픈
function setGNB(selector) {
  var timerId = '';
  var $selector = $(selector);

  refresh();

  $selector.on('click', function() {
    if ($(this).parent().find('ul').length > 0) {
      var height = 0;
      $(this).next().find('> li').each(function() {
        height += $(this).outerHeight(true);
      });
      $selector.parent().find('ul').css({'height': 0 + 'px'});
      $(this).next().css({'height': height + 'px'});
    }
    console(height);
  });

  $('div.gnb-wrap').on('mouseleave', function() {
    timerId = setTimeout(function() {refresh();}, 500);
  }).on('mouseenter', function() {
    clearTimeout(timerId);
  });

  function refresh() {
    $(this).parent().parent().find('> li:not(.on) > ul').css({'height': 0 + 'px'});
    if ($(this).parent('li.on').find('ul').length > 0) {
      var height = 0;
      $(this).parent('li.on').find('> ul > li').each(function() {
        height += $(this).outerHeight(true);
      });
      $(this).parent('li.on').find('ul').css({'height': height + 'px'});
    }
  }
}
