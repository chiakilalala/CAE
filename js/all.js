"use strict";

$(function () {
  var $isLang = window.location.pathname.toUpperCase().indexOf("/EN/") > -1 ? "EN" : "TW";
  var $share = $(".share"),
      $topNavli = $(".topNav>li"),
      $topNavA = $(".topNav>li>a");
  /*↓↓↓↓ 搜尋出現 ↓↓↓↓*/

  $("input.btn").click(function () {
    $("input.text").fadeIn(800);
  });
  /* --- 滑開選單 start --- */
  // 先取得相關元素及各自區塊的寬高

  var $menu = $('.mainNavWrap'),
      _menuWidth = 250,
      $page = $('.main'),
      $page2 = $('.subNavWrap'),
      $page3 = $('footer'),
      $page4 = $('.closeOpenMenu'),
      $indexSection = $('.wrapper>section:not(.Nav)'),
      _pageHeight = $page.outerHeight(true);

  $menu.addClass('hideMenu'); //用function包起來

  function openMenu() {
    event.preventDefault();
    var isHide = $menu.hasClass('hideMenu');
    $menu.stop().animate({
      left: isHide ? 0 : -_menuWidth
    }, 'easeOutCubic');
    $page.stop().animate({
      left: isHide ? _menuWidth : 0
    }, 'easeOutCubic');
    $page2.stop().animate({
      left: isHide ? _menuWidth : 0
    }, 'easeOutCubic');
    $page3.stop().animate({
      left: isHide ? _menuWidth : 0
    }, 'easeOutCubic');
    $page4.stop().animate({
      left: isHide ? _menuWidth : 0
    }, 'easeOutCubic');
    $indexSection.stop().animate({
      left: isHide ? _menuWidth : 0
    }, 'easeOutCubic');
    $menu.toggleClass('hideMenu');

    if (!$('.mainNavWrap').hasClass('hideMenu')) {
      $('.closeOpenMenu').stop().fadeIn(100);
      $('.fixedBtn').stop().fadeOut(100);
      $('.subNavOther .search span').stop().fadeOut(100);
      $('.subNavOther .search>a').removeClass('searchClick');
    } else {
      $('.closeOpenMenu').stop().fadeOut(100); //$('.fixedBtn').stop().fadeIn(100);
    }
  } // 當 #menuControl 被點擊時


  $('.menuControl,.closeOpenMenu').click(function (event) {
    openMenu();
  });

  function debounce(fn, delay) {
    var timer;
    return function () {
      var context = this;
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  } // if ($('.leftBtns > li > a.focus').text() === '姊妹鐵道') {
  //     var dom = $('.leftBtns > li > a.focus').next('ul.focus').clone().addClass('desktop-listbutton');
  //     $('h1').before(dom);
  //     $('.desktop-listbutton').removeClass('focus');
  // }


  var addScrollbarMenu = $('.topNav>li ul li ul');

  function ctrlScrollbarMenu(width) {
    if (width > 1024) {
      if (addScrollbarMenu.hasClass('mCustomScrollbar') === true) {
        return false;
      } else {
        addScrollbarMenu.mCustomScrollbar({
          theme: 'dark-3',
          scrollInertia: 400,
          mouseWheel: {
            preventDefault: true
          }
        });
      }
    } else {
      if (addScrollbarMenu.hasClass('mCustomScrollbar') === true) {
        addScrollbarMenu.mCustomScrollbar('destroy');
      } else {
        return false;
      }
    }
  }

  $(window).on('resize', debounce(function () {
    var _windowWidth = $(window).width();

    function padToPhone() {
      /*1024以下時，把上方選單第三層隱藏*/
      //0529$('.topNav>li>ul').css('display', 'none');

      /*1024以下時，側開選單的如果有第三層，加Class*/
      $('.topNav>li').has("ul").addClass('haveSecond'); //判斷是否有下一層 加箭頭

      /*1024以下時，搜尋變成圓圈圈*/

      $('.subNavOther .search').addClass('mobileSearch');
      $(".mobileSearch>a").bind("click", function () {
        $(this).toggleClass('searchClick');
        $('.subNavOther .mobileSearch span').stop(true, true).fadeToggle(400);
        $('.subNavOther .mobileSearch > div').stop(true, true).fadeToggle(400);
      });
      /*1024以下時，側開選單如果有hideMenu這個Class，黑黑透明的就會出現*/

      if (!$('.mainNavWrap').hasClass('hideMenu')) {
        /*已經把測開選單展開了，可是又變回電腦版，然後又縮回手機板時*/
        $('.main').css('left', 200);
        $('.closeOpenMenu').stop().fadeIn(100);
      }
      /*1024以下時停用電腦版效果，讓他不會吃到電腦版效果*/


      $topNavli.off("mouseenter");
      $topNavli.off("mouseleave");
      $topNavA.off("focus");
      /*1024以下時，側開選單展開下層*/

      $topNavA.off("click"); //因為on Click會一直累加事件上去，所以先移掉(感謝家鼎)

      $topNavA.on("click", function () {
        $(this).parent().toggleClass('UPPP');
        /*只是為了加箭頭*/

        $(this).parent().siblings('li').find('ul').slideUp(500); //把別人關起來

        $(this).siblings('ul').stop(true, true).slideToggle(500); //把自己展開
      });
      $share.off("mouseenter");
      $share.off("mouseleave");
      $share.off("click");
      $share.on("click", function () {
        $(this).find('ul').stop(true, true).slideToggle(500);
      });
    }

    function searchComeBack() {
      /*變回電腦版時，搜尋回來*/
      $(".mobileSearch>a").unbind('click');
      $('.subNavOther .search span').stop().fadeIn(100);
      $('.subNavOther .search').removeClass('mobileSearch');
      $('.subNavOther .mobileSearch>a').removeClass('searchClick');
    }

    if (_windowWidth > 1025) {
      $menu.attr('style', '');
      /*↓↓↓↓ 分享 ↓↓↓↓*/

      if (!$('.mainNavWrap').hasClass('hideMenu')) {
        /*就算選單是滑開的當下又變回電腦版，LEFT還是0*/
        $('.main,footer').css('left', 0);
        $('.closeOpenMenu').stop().fadeOut(100);
      }

      searchComeBack();
      $('.leftBtns ul.focus li').css('display', 'block');
      /* --- mega start --- */

      $topNavli.on("mouseenter", function () {
        $(this).addClass('navNowHover');
        $(this).children('li>ul').stop(true, true).fadeIn(500);
      });
      $topNavli.on("mouseleave", function () {
        $(this).removeClass('navNowHover');
        $(this).children('li>ul').stop(true, true).fadeOut(200);
      });
      $topNavA.on("focus", function () {
        $(this).next('ul').stop(true, true).fadeIn(500);
      }); //排除最後一個物件下面還有第三層的

      $topNavA.next('ul').find('li.Level2:not(:has(ul))').filter(":last-child").find('a').focusout(function () {
        $(".topNav>li>ul").stop(true, true).fadeOut(200); // console.log('電腦版的fadeOUt事件');
      }); //加上第三層最後一個物件的移開事件

      $topNavA.next('ul').find('li.Level2').filter(":last-child").filter(":last-child").find('li.Level3').filter(":last-child").find('a').focusout(function () {
        $(".topNav>li>ul").stop(true, true).fadeOut(200); // console.log('電腦版的fadeOUt事件2');
      });
      /* --- mega end --- */
      //console.log('大於1024');

      $topNavA.off("click");
      /* --- 一般列表 --- */

      var $txtUlList_1 = $('.txtUlList>ul>li'),
          $txtUlList_2 = $('.txtUlList>ul>li ul');
      $txtUlList_1.hover(function () {
        $(this).find('ul').stop(true, true).slideDown(800);
      });
    } else if (_windowWidth < 798) {
      padToPhone();
      /*768以下時，讓該層focus的li增加Class*/

      $('.leftBtns>li>a.focus').parent().addClass("mobileSecondBtn");
      /*768以下時，讓該層focus的如果有第三層，加Class*/

      $('.leftBtns>li').has("ul.focus").addClass('haveThird');
      /*768以下時，讓該層focus的如果有第三層，加Class*/

      if ($('.leftBtns .mobileSecondBtn>a.focus').text() === '姊妹鐵道') {
        $('.leftBtns').addClass('listbutton');
      }

      var haveFocusBtn = $('.leftBtns ul.focus');
      /*768以下時，focus有第三層的話，i的位置設定*/

      if (haveFocusBtn.length > 0) {
        //有時候頁面沒有第三層時找不到haveFocusBtn會壞掉
        //console.info($('.Nav').css('top'));
        //之前因為NAV在卷軸超過150時會變成FIXED
        //就變成上面的高度變矮了
        //所以一直觸發resize事件時，他就會重新把i定位在一個很怪的位置
        //要用一個if去判斷NAV的狀況為何
        $('.leftBtns i').css('top', haveFocusBtn.offset().top - 123); // if ($('.Nav').offset().top == 0) {
        // } else {
        //     $('.leftBtns i').css('top', haveFocusBtn.offset().top - 123 + 68);
        // }
      }
      /*---第三層 展開選單(左邊變中間)---*/
      // $('.leftBtns i').text(($isLang == "TW" ? "展開選單" : "Unfold Menu"));
      //$('.mobileSecondBtn>ul li').slideUp(0);


      $('.mobileSecondBtn i').off('click');
      $('.mobileSecondBtn i').click(function () {
        $('.mobileSecondBtn>ul li').stop(true, true).slideToggle(400);
        $(this).toggleClass('UUUp');

        if (!$('.mobileSecondBtn i').hasClass('UUUp')) {
          $(this).text($isLang == "TW" ? "展開選單" : "Unfold Menu");
        } else {
          $(this).text($isLang == "TW" ? "收合選單" : "Fold up Menu");
        }
      });
    } else {
      padToPhone();
      searchComeBack();
    }

    ctrlScrollbarMenu(_windowWidth);
  }, 1000));
  $(window).trigger('resize'); // $(".fixedBtn").hide$(function() {();

  function ctrlFixedBtn() {
    if ($(window).scrollTop() > 500) {
      $(".fixedBtn").fadeIn();
    } else {
      $(".fixedBtn").fadeOut();
    }

    ;
  }

  ctrlFixedBtn();
  $(window).scroll(function () {
    ctrlFixedBtn(); // $('.subNavOther .mobileSearch span').stop().fadeOut(100);
    // $('.subNavOther .mobileSearch>a').removeClass('searchClick')

    /*if ($(this).scrollTop() > 500) {
        $(".fixedBtn").fadeIn();
    } else {
        $(".fixedBtn").fadeOut();
    };
    if ($(this).scrollTop() > 150) {
        $(".Nav").stop(true, true).animate({
            'top': -150,
        }, 200);
        //console.log("150之後先退到後面一點");
    } else {
        $(".Nav").stop(true, true).animate({
            'top': 0
        }, 200);
        //console.log("150之前貼頂")
    }*/

    /*if ($(this).scrollTop() > 150) {
        _windowWidth2 = $(window).width();
        if (_windowWidth2 > 1025) { //寬版  
            $(".Nav").stop(true, true).animate({
                'top': -80
            }, 200).addClass('NavFixed');
            $(".wrapper").addClass('NavFixed_pding');
            //console.log("200之後 定住不動 寬");
        } else { //手機板    
            $(".Nav").stop(true, true).animate({
                'top': 0
            }, 200).addClass('NavFixed');
            $(".wrapper").addClass('NavFixed_pding');
            //console.log("200之後 定住不動 窄");
        }
    } else {
        $(".Nav").removeClass('NavFixed');
        $(".wrapper").removeClass('NavFixed_pding');
        //console.log("200之前 不要定住");
    }*/

    if ($(window).width() > 1025) {
      if ($(this).scrollTop() > 140) {
        $('.mainNavWrap').addClass('fadeInDown');
      } else {
        $('.mainNavWrap').removeClass('fadeInDown');
      }
    } else {
      return false;
    }
  });
  $(".goTop").click(function () {
    $("body,html").animate({
      scrollTop: 0
    }, 800);
    $(".firstGoTo").focus();
    return false;
  });
  /*----搜尋----*/

  $(".mobileSearch>a").click(function (event) {
    $(this).toggleClass('searchClick');
    $('.subNavOther .mobileSearch span').fadeToggle(400);
  });
  /*----手機側開選單----*/

  $('.topNav>li.haveSecond').click(function (event) {//$(this).toggleClass('UPPP');/*只是為了加箭頭*/
  }); // $(".textWrap .imgLiquid").imgLiquid({
  //     fill: true
  // });
  // $(".imgLiquid").imgLiquid({
  //     fill: true
  // });
  // 卷軸

  /*if(!($(".topNav>li>ul>li>ul").html()==undefined))
  {
  	$(".topNav>li>ul>li>ul").mCustomScrollbar({
  		theme: "dark-3",
  		scrollButtons: {
  			enable: true
  		}
  	}); 
  }
  if(!($(".linkOutPage .box span").html()==undefined))
  {
  	$(".linkOutPage .box span").mCustomScrollbar(); 
  }*/
  //fatfooter
  // $('.sitemapAll').before('<a href="#" name="close-Panel1" id="close-Panel1" class="trigger"><i></i></a>');
  // $('.sitemapAll').before('<a href="#" name="open-Panel1" id="open-Panel1" class="trigger"><i></i></a>');

  $('a#close-Panel1').click(function () {
    $(this).hide();
    $('.sitemapAll ul').slideUp(1000);
    $('#open-Panel1').fadeIn(500);
    window.location.href = "#open-Panel1";
    return false;
  });
  $('a#open-Panel1').hide().click(function () {
    $(this).hide();
    $('.sitemapAll ul').slideDown(1000);
    $('#close-Panel1').fadeIn(500);
    window.location.href = "#close-Panel1";
    return false;
  });
  $('a').on('mousedown', function (e) {
    e.preventDefault();
  });
  $('.outerWrap').after('<div class="moduleMask"></div>');
  $('.openModule').click(function () {
    var obj = $(this).attr('href');
    $(obj).addClass('show');
    $('.moduleMask').addClass('show');
    $('body').css('overflow', 'hidden');
    return false;
  });
  $('.moduleMask, .moduleClose').click(function () {
    $('.moduleBox, .moduleMask').removeClass('show');
    $('body').css('overflow', 'auto');
  });
});
/* 首頁search */

$('.btnSearch').click(function () {
  $('.searchArea').fadeIn();
});
$('.searchArea').find('.btnClose').click(function () {
  $('.searchArea').fadeOut();
});
/* Proc.html */

$('.openSoftModule').click(function () {
  $('.listArea').fadeIn();
});
$('.inner').find('.buttonClose').click(function () {
  $('.listArea').fadeOut();
});
$('.openPayModule').click(function () {
  $('.payArea').fadeIn();
});
$('.inner').find('.btn_Close').click(function () {
  $('.payArea').fadeOut();
});
/*首頁登入 */

$(function () {
  $('.btn_forget').click(function () {
    $('.forgetCheck').slideDown(200);
    $('.login').slideUp(200);
  });
  $('.btn_relog').click(function () {
    $('.forgetCheck').slideUp(200);
    $('.login').slideDown(200);
  });
});
/*跑馬燈 */

(function () {
  function scroller() {
    var scroll = $('.scroll');
    var height = scroll.height();
    var topAdj = -height - 10;
    scroll.animate({
      'top': [topAdj, 'linear']
    }, 3000, function () {
      scroll.css('top', 10);
      scroller();
    });
  }

  scroller();
})();
/*首頁輪播 */


var swiper = new Swiper('.blog-slider', {
  spaceBetween: 30,
  effect: 'fade',
  loop: true,
  speed: 500,
  mousewheel: {
    invert: true
  },
  autoplay: true,
  // autoHeight: true,
  pagination: {
    el: '.blog-slider__pagination',
    clickable: true
  }
});
/*首頁新聞 */
// tabbed content

$(".tab_content").hide();
$(".tab_content:first").show();
/* if in tab mode */

$("ul.tabs li").click(function () {
  $(".tab_content").hide();
  var activeTab = $(this).attr("rel");
  $("#" + activeTab).fadeIn();
  $("ul.tabs li").removeClass("active");
  $(this).addClass("active");
  $(".tab_drawer_heading").removeClass("d_active");
  $(".tab_drawer_heading[rel^='" + activeTab + "']").addClass("d_active");
});
/* if in drawer mode */

$('<span class="slideDown">').appendTo(".tab_drawer_heading");
$(".tab_drawer_heading").click(function () {
  $(".tab_content").hide();
  var d_activeTab = $(this).attr("rel");
  $("#" + d_activeTab).fadeIn(); // $('.tab_content').not($(this).next()).slideUp();
  // 

  $(".tab_drawer_heading").removeClass("d_active");
  $(this).addClass("d_active");
  $("ul.tabs li").removeClass("active");
  $("ul.tabs li[rel^='" + d_activeTab + "']").addClass("active");
});
var colorButton = $(".colors li");
colorButton.on("click", function () {
  // Remove class from currently active button
  $(".colors > li").removeClass("active-color"); // Add class active to clicked button

  $(this).addClass("active-color"); // Get background color of clicked

  var newColor = $(this).attr("data-color"); // Change background of everything with class .bg-color

  $(".bg-color").css("background-color", newColor); // // Change color of everything with class .text-color
  // $(".text-color").css("color", newColor);
});
/* Extra class "tab_last" 
   to add border to right side
//    of last tab */
// $('ul.tabs li').last().addClass("tab_last");

$(".tab_contents").hide();
$(".tab_contents:first").show();
/* if in tab mode */

$("ul.tabs2 li").click(function () {
  $(".tab_contents").hide();
  var activeTab = $(this).attr("rel");
  $("#" + activeTab).fadeIn();
  $("ul.tabs2 li").removeClass("active_2");
  $(this).addClass("active_2");
  $(".drawer_heading").removeClass("t_active");
  $(".drawer_heading[rel^='" + activeTab + "']").addClass("t_active");
});
/* if in drawer mode */

$('<span class="slideDown2">').appendTo(".drawer_heading");
$(".drawer_heading").click(function () {
  $(".tab_contents").hide();
  var t_activeTab = $(this).attr("rel");
  $("#" + t_activeTab).fadeIn(); // $('.tab_content').not($(this).next()).slideUp();
  // 

  $(".drawer_heading").removeClass("t_active");
  $(this).addClass("t_active");
  $("ul.tabs2 li").removeClass("active_2");
  $("ul.tabs2 li[rel^='" + t_activeTab + "']").addClass("active_2");
});
$(function () {
  $('.navHead').on('click', function () {
    $('#navService').toggleClass("open");
  });
});
$(function () {
  var swiper = new Swiper('.carousel-gallery .swiper-container', {
    loop: true,
    effect: 'slide',
    speed: 900,
    slidesPerView: 4,
    spaceBetween: 20,
    simulateTouch: true,
    autoplay: false,
    // pagination: {
    //     el: '.carousel-gallery .swiper-pagination',
    //     clickable: true
    // },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      // when window width is <= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 5
      },
      // when window width is <= 480px
      480: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      // when window width is <= 640px
      640: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
  });
});
/*faq accordin */

$(function () {
  // (Optional) Active an item if it has the class "is-active"	
  $(".accordion > .accordion-item.is-active").children(".accordion-panel").slideDown();
  $(".accordion > .accordion-item").click(function () {
    // Cancel the siblings
    $(this).siblings(".accordion-item").removeClass("is-active").children(".accordion-panel").slideUp(); // Toggle the item

    $(this).toggleClass("is-active").children(".accordion-panel").slideToggle("ease-out");
  });
});
/*  問題 first q&a*/

(function ($) {
  $(document).ready(function () {
    //step1 hide all content divs
    $('#generic-tabs div').hide(); //step2 show the first content div

    $('#generic-tabs div:first').show(); //Add actice class to the first tab link

    $('#generic-tabs ul#Member_tabs li:first').addClass('active'); //when a tab is clicked 

    $('#generic-tabs ul#Member_tabs li a').click(function () {
      //firstly remove the current active class
      $('#generic-tabs ul#Member_tabs li ').removeClass('active'); //apply active class to parent(li) of the link tag

      $(this).parent().addClass('active');
      var CurrentTab = $(this).attr('href'); //set the current Tab to the link
      //hide away all tabs

      $('#generic-tabs div').hide(); //show the current tab

      $(CurrentTab).show(); //Stop default link action from happening

      return false;
    });
  });
})(window.jQuery); // mCustomScrollbar
// (function($){
//     $(window).on("load",function(){
//      //   $(".content").mCustomScrollbar();
// $(".wrapper").mCustomScrollbar({ theme: "rounded" });
//     });
// })(jQuery);
//# sourceMappingURL=all.js.map
