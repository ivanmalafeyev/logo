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
    autoHeight: true,
    slidesPerView: 1,
    speed: 800,

    // If we need pagination
    pagination: {
      el: ".products-slider__info",
      type: "fraction",
      // clickable: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: ".products-slider__arrow--next",
      prevEl: ".products-slider__arrow--prev",
    },
  });
}

if (document.querySelector(".brands-slider")) {
  const brandsSwiper = new Swiper(".brands-slider__body", {
    loop: true,
    autoHeight: true,
    slidesPerView: 5,
    speed: 800,

    // Navigation arrows
    navigation: {
      nextEl: ".brands-slider__arrow--next",
      prevEl: ".brands-slider__arrow--prev",
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        autoHeight: true,
      },
      480: {
        slidesPerView: 2,
      },
      600: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      979: {
        slidesPerView: 5,
      },
    },
  });
}

if (document.querySelector(".images-product")) {
  const imagesSubSwiper = new Swiper(".images-product__subslider", {
    slidesPerView: 4,
    speed: 800,
  });

  const imagesMainSwiper = new Swiper(".images-product__mainslider", {
    slidesPerView: 1,
    speed: 800,
    thumbs: {
      swiper: imagesSubSwiper,
    },
  });
}
