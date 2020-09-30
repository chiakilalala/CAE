"use strict";

/* gallery  */
var galleryTop = new Swiper(".gallery", {
  spaceBetween: 10,
  grabCursor: false,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  loop: true,
  loopedSlides: 4,
  autoplay: {
    delay: 5000
  },
  // other parameters
  on: {
    click: function click() {
      /* do something */
    }
  },
  keyboard: {
    enabled: true,
    onlyInViewport: false
  }
});
/* thumbs */

var galleryThumbs = new Swiper(".gallery-thumbs", {
  spaceBetween: 10,
  centeredSlides: true,
  slidesPerView: "auto",
  touchRatio: 0.4,
  slideToClickedSlide: true,
  loop: true,
  loopedSlides: 4,
  keyboard: {
    enabled: true,
    onlyInViewport: false
  }
});
/* set conteoller  */

galleryTop.controller.control = galleryThumbs;
galleryThumbs.controller.control = galleryTop;
//# sourceMappingURL=gallery.js.map
