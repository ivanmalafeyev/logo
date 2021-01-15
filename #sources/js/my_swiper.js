if (document.querySelector(".mainslider")) {
  const mySwiper = new Swiper(".mainslider__body", {
    // Optional parameters
    // direction: "vertical",
    // loop: true,
    autoHeight: true,
    slidesPerView: 1,
    speed: 800,

    // If we need pagination
    pagination: {
      el: ".mainslider__dots",
      clickable: true,
    },

    // Navigation arrows
    // navigation: {
    //   nextEl: ".control-main-slider__arrow--next",
    //   prevEl: ".control-main-slider__arrow--prev",
    // },

    // And if we need scrollbar
    // scrollbar: {
    // el: '.swiper-scrollbar',
    // },
    breakpoints: {
      320: {
        // autoHeight: true,
      },
      768: {
        // autoHeight: false,
      },
    },
  });

  const sliderDots = document.querySelectorAll(
    ".mainslider__dots .swiper-pagination-bullet"
  );

  const sliderImages = document.querySelectorAll(".mainslider__image");
  [].forEach.call(sliderImages, (sliderImage, i) => {
    const imgPath = sliderImage.querySelector("img").getAttribute("src");
    sliderDots[i].style.backgroundImage = 'url("' + imgPath + '")';
  });
}

if (document.querySelector(".products-slider")) {
  const prodSwiper = new Swiper(".products-slider__item", {
    // Optional parameters
    // direction: "vertical",
    // loop: true,
    autoHeight: true,
    slidesPerView: 1,
    speed: 800,

    // If we need pagination
    // pagination: {
    //   el: ".mainslider__dots",
    //   clickable: true,
    // },

    // Navigation arrows
    navigation: {
      nextEl: ".products-slider__arrow--next",
      prevEl: ".products-slider__arrow--prev",
    },

    // And if we need scrollbar
    // scrollbar: {
    // el: '.swiper-scrollbar',
    // },
    breakpoints: {
      320: {
        // autoHeight: true,
      },
      768: {
        // autoHeight: false,
      },
    },
  });
}

// const myLotsSwiper = new Swiper(".lots__slide", {
//   // Optional parameters
//   // direction: "vertical",
//   loop: true,
//   speed: 800,
//   // autoHeight: false,
//   // slidesPerView: 1,

//   // If we need pagination
//   // pagination: {
//   //   el: '.swiper-pagination',
//   // },

//   // Navigation arrows
//   navigation: {
//     nextEl: ".lots-slider-next",
//     prevEl: ".lots-slider-prev",
//   },

//   // And if we need scrollbar
//   // scrollbar: {
//   // el: '.swiper-scrollbar',
//   // },
//   breakpoints: {
//     320: {
//       autoHeight: true,
//       slidesPerView: 1,
//     },
//     500: {
//       slidesPerView: 2,
//     },
//     768: {
//       autoHeight: false,
//       slidesPerView: 3,
//     },
//     975: {
//       slidesPerView: 3,
//     },
//   },
// });

// const myQuotesSwiper = new Swiper(".slider-quotes__slider", {
//   // Optional parameters
//   // direction: "vertical",
//   loop: true,
//   speed: 800,
//   effect: "fade",
//   autoHeight: false,
//   slidesPerView: 1,

//   // If we need pagination
//   // pagination: {
//   //   el: '.swiper-pagination',
//   // },

//   // Navigation arrows
//   navigation: {
//     nextEl: ".control-slider-quotes__circle",
//     // prevEl: ".lots-slider-prev",
//   },

//   // And if we need scrollbar
//   // scrollbar: {
//   // el: '.swiper-scrollbar',
//   // },
//   breakpoints: {
//     320: {
//       autoHeight: true,
//     },
//     650: {
//       autoHeight: false,
//     },
//   },
// });
