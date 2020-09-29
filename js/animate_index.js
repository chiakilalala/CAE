"use strict";

$(function () {
  var controller = new ScrollMagic.Controller({});
  var tweenAA = new TimelineMax().add([TweenMax.fromTo(".hikingMan", 2, {
    bottom: 70
  }, {
    bottom: -90,
    ease: Linear.easeNone
  })]); //build scene and set duration to window height

  var scene = new ScrollMagic.Scene({
    triggerElement: ".activitySection,.resourcesSection,.policiesSection2",
    duration: 600
  }).setTween(tweenAA).addTo(controller);
  /*----------------------------------------------*/

  var tweenBB = new TimelineMax().add([TweenMax.fromTo(".activityWrap .titleAll .title", 2, {
    bottom: 300
  }, {
    bottom: 150,
    ease: Linear.easeNone
  })]); //build scene and set duration to window height

  var scene = new ScrollMagic.Scene({
    triggerElement: ".activitySection,.resourcesSection,.policiesSection2",
    duration: 200
  }).setTween(tweenBB).addTo(controller);
  /*----------------------------------------------*/

  var tween0000 = new TimelineMax().add([TweenMax.fromTo(".butterflyA", 2, {
    bottom: -50,
    right: -20,
    ease: Linear.easeNone
  }, {
    bottom: 80,
    right: 170,
    ease: Linear.easeNone
  }), TweenMax.fromTo(".butterflyB", 2, {
    bottom: 80,
    right: 20,
    ease: Linear.easeNone
  }, {
    bottom: 200,
    right: 20,
    ease: Linear.easeNone
  }), TweenMax.fromTo(".butterflyC", 2, {
    bottom: -50,
    right: 50,
    ease: Linear.easeNone
  }, {
    bottom: 28,
    right: 30,
    ease: Linear.easeNone
  })]); //build scene and set duration to window height

  var scene = new ScrollMagic.Scene({
    triggerElement: ".newsSection",
    duration: 800
  }).setTween(tween0000).addTo(controller);
  /*----------------------------------------------*/

  var tweenA = TweenMax.fromTo(".decoBird", 1.5, {
    top: 50,
    ease: Linear.easeNone
  }, {
    top: 210,
    ease: Linear.easeNone
  }); //build scene and set duration to window height

  var scene = new ScrollMagic.Scene({
    triggerElement: ".serviceSection",
    duration: 300
  }).setTween(tweenA).addTo(controller);
  /*----------------------------------------------*/

  $(document).on('cbox_open', function () {
    $("body").css("overflow", "hidden");
  });
  $(document).on('cbox_closed', function () {
    $("body").css("overflow", "auto");
  });
  /*----------------------------------------------*/

  $(window).resize(function () {
    var winWidth = $(window).width(),
        daisy = 1,
        daisy2 = 1;

    if (winWidth < 769) {
      $(".parkMap a").colorbox({
        inline: true,
        width: 320,
        height: 568,
        opacity: 0.7
      });
      $(".disasterAlert>div>a").colorbox({
        inline: true,
        width: 320,
        height: 568,
        opacity: 0.7
      });
    } else {
      $(".parkMap a").colorbox({
        inline: true,
        width: 980,
        height: 720,
        opacity: 0.7
      });
    }

    $("li.disasterAlert>a").click(function () {
      if (winWidth < 769) {
        /*平板以下時*/
        if (daisy == 1) {
          $(this).parent().stop(true, true).fadeOut(1800);
          daisy = 0;
        } else {
          daisy = 1;
        }
      } else {
        if (daisy == 1) {
          $(this).parent().stop(true, true).animate({
            right: -355
          }, 300);
          daisy = 0;
        } else {
          $(this).parent().stop(true, true).animate({
            right: 0
          }, 300);
          daisy = 1;
        }
      }
    });
    $("li.hotClick a").click(function () {
      if (daisy2 == 1) {
        $(this).parent().animate({
          right: -350
        }, 300);
        daisy2 = 0;
      } else {
        $(this).parent().animate({
          right: 0
        }, 300);
        daisy2 = 1;
      }
    });
  });
  $(window).resize();
  /*---------------------------------------------*/

  try {
    var _audio = document.getElementById('indexMusic'),
        $musicBtn = $('.musicBtn');

    $(document).ready(function () {
      $musicBtn.toggleClass('OpenMusic');

      _audio.pause();
    });
    $musicBtn.click(function (event) {
      $(this).toggleClass('OpenMusic');

      if ($(this).hasClass('OpenMusic')) {
        _audio.pause();
      } else {
        _audio.play();
      }
    });
  } catch (ex) {}
  /*----------------------------------------------*/

  /* 下雪Banner控制 */
  // function setSnowBannerTime(){
  //     setTimeout(function() { 
  //         $('.snowbanner').fadeOut(1000); 
  //     }, 40000);
  //     return false; 
  // }
  // $(window).on('load',setSnowBannerTime); 

});
//# sourceMappingURL=animate_index.js.map
