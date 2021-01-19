"use strict";

function testWebP(cb) {
  var webP = new Image();

  webP.onload = webP.onerror = function () {
    cb(webP.height == 2);
  };

  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});
;
var img = document.querySelectorAll("._ibg");
Array.prototype.forEach.call(img, function (value) {
  if (value.querySelector("img")) {
    value.style.backgroundImage = "url(" + value.querySelector("img").getAttribute("src") + ")";
  }
});
; //Check mobile

var isMobile = {
  Android: function Android() {
    return !!navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function BlackBerry() {
    return !!navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function iOS() {
    return !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function Opera() {
    return !!navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function Windows() {
    return !!navigator.userAgent.match(/IEMobile/i);
  },
  any: function any() {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
  }
}; //Set touch mode or mouse mode

if (isMobile.any()) {
  document.body.classList.add("_touch");
  var arrows = document.querySelectorAll("._menu-arrow");
  [].forEach.call(arrows, function (e) {
    var thisLink = e.previousElementSibling;
    var subMenu = e.nextElementSibling;
    thisLink.classList.add("_parent");
    e.addEventListener("click", function () {
      subMenu.classList.toggle("_open");
      e.classList.toggle("_active");
    });
  });
} else {
  document.body.classList.add("_mouse");
}

;
var PLACEHOLDER_OPACITY = 0.5;
var inputs = document.querySelectorAll(".input");

if (inputs) {
  [].forEach.call(inputs, function (e) {
    var dv = e.getAttribute("data-value");
    var isPlaceholder = true;
    e.isPlaceholder = isPlaceholder;

    if (dv) {
      e.style.color = "rgba(255, 255, 255, ".concat(PLACEHOLDER_OPACITY, ")");
      e.value = dv;
    }

    e.addEventListener("focus", function () {
      if (isPlaceholder) {
        e.value = "";
        isPlaceholder = false;
        e.isPlaceholder = isPlaceholder;
        e.style.color = "rgba(255, 255, 255, 1)";
      }
    });
    e.addEventListener("blur", function () {
      if (e.value === "") {
        e.value = dv;
        isPlaceholder = true;
        e.isPlaceholder = isPlaceholder;
        e.style.color = "rgba(255, 255, 255, ".concat(PLACEHOLDER_OPACITY, ")");
      }
    });
  });
}

var form = document.querySelector(".form");

if (form) {
  form.addEventListener("submit", function (e) {
    if (formValidate(form) === 0) {//
    } else {
      e.preventDefault();
    }
  });
}

function formValidate() {
  var error = 0;
  var formReq = document.querySelectorAll(".req");
  [].forEach.call(formReq, function (e) {
    formRemoveError(e);

    if (e.classList.contains("email")) {
      if (emailTest(e)) {
        formAddError(e);
        error++;
      }
    } else if (e.getAttribute("type") === "checkbox" && e.checked === false) {
      formAddError(e);
      error++;
    } else {
      if (e.value === "" || e.isPlaceholder) {
        formAddError(e);
        error++;
      }
    }
  });
  return error;
}

function formAddError(input) {
  input.parentElement.classList.add("_err");
  input.classList.add("_err");
}

function formRemoveError(input) {
  input.parentElement.classList.remove("_err");
  input.classList.remove("_err");
}

function emailTest(input) {
  return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

;
var w, h;
w = window.outerWidth;
h = window.outerHeight;

function resize() {
  // adiptiveHeader("header-menu", "header-top-lang", "header-top");
  adiptiveHeader(640, "menu__body", "bottom-header__actions", "_c1", 1);
  adiptiveHeader(640, "menu__body", "info-header__callback", "_c2");
  adiptiveHeader(640, "contacts-header__item--icon", "info-header__cart", "_c3");
  adiptiveHeader(979, "page__content", "page__side-content", "page__side");
}

function adiptiveHeader(treshold, burgerMenuClass, elementClass, returnPointClass) {
  var order = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var burgerMenu = document.querySelector("." + burgerMenuClass);
  var element = document.querySelector("." + elementClass);
  var returnPoint = document.querySelector("." + returnPointClass);

  if (w <= treshold) {
    if (!element.classList.contains("done")) {
      element.classList.add("done");

      if (order !== 0) {
        burgerMenu.prepend(element);
      } else {
        burgerMenu.append(element);
      }
    }
  } else {
    element = burgerMenu.querySelector("." + elementClass);

    if (element) {
      if (element.classList.contains("done")) {
        element.classList.remove("done");

        if (element.classList.contains(elementClass + "--right")) {
          returnPoint.parentNode.lastChild.previousSibling.prepend(element);
        } else {
          returnPoint.append(element);
        }
      }
    }
  }
}

window.addEventListener("resize", function () {
  w = window.outerWidth;
  h = window.outerHeight;
  resize();
});
resize(); // let wo, ho, wi, hi;
// wo = window.outerWidth;
// ho = window.outerHeight;
// wi = window.innerWidth;
// hi = window.innerHeight;
// function resize() {
// document.querySelector(".mainblock").style.minHeight = hi + "px";
// }
// window.addEventListener("resize", () => {
//   wo = window.outerWidth;
//   ho = window.outerHeight;
//   wi = window.innerWidth;
//   hi = window.innerHeight;
//   resize();
// });
// resize();

var menuIcon = document.querySelector(".icon-menu");
var menu = document.querySelector(".top-header__menu"); // const menuSocial = document.querySelector(".header__social");

var links = document.querySelectorAll(".menu__link");
menuIcon.addEventListener("click", function () {
  function toggleClass(c) {
    menuIcon.classList.toggle(c);
    menu.classList.toggle(c); // menuSocial.classList.toggle(c);

    [].forEach.call(links, function (lnk) {
      lnk.classList.toggle("_active");
    });
    document.body.classList.toggle("_lock");
  }

  toggleClass("_active");

  function linkCB() {
    toggleClass("_active");
    [].forEach.call(links, function (l) {
      l.removeEventListener("click", linkCB);
    });
  }

  [].forEach.call(links, function (l) {
    l.addEventListener("click", linkCB);
  });
});
;

if (document.querySelector(".mainslider")) {
  var mySwiper = new Swiper(".mainslider__body", {
    // Optional parameters
    // direction: "vertical",
    // loop: true,
    autoHeight: true,
    slidesPerView: 1,
    speed: 800,
    // If we need pagination
    pagination: {
      el: ".mainslider__dots",
      clickable: true
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
      320: {// autoHeight: true,
      },
      768: {// autoHeight: false,
      }
    }
  });
  var sliderDots = document.querySelectorAll(".mainslider__dots .swiper-pagination-bullet");
  var sliderImages = document.querySelectorAll(".mainslider__image");
  [].forEach.call(sliderImages, function (sliderImage, i) {
    var imgPath = sliderImage.querySelector("img").getAttribute("src");
    sliderDots[i].style.backgroundImage = 'url("' + imgPath + '")';
  });
}

if (document.querySelector(".products-slider")) {
  var prodSwiper = new Swiper(".products-slider__item", {
    // Optional parameters
    // direction: "vertical",
    // loop: true,
    autoHeight: true,
    slidesPerView: 1,
    speed: 800,
    // If we need pagination
    pagination: {
      el: ".products-slider__info",
      type: "fraction" // clickable: true,

    },
    // Navigation arrows
    navigation: {
      nextEl: ".products-slider__arrow--next",
      prevEl: ".products-slider__arrow--prev"
    },
    // And if we need scrollbar
    // scrollbar: {
    // el: '.swiper-scrollbar',
    // },
    breakpoints: {
      320: {// autoHeight: true,
      },
      768: {// autoHeight: false,
      }
    }
  });
}

if (document.querySelector(".brands-slider")) {
  var brandsSwiper = new Swiper(".brands-slider__body", {
    // Optional parameters
    // direction: "vertical",
    loop: true,
    autoHeight: true,
    slidesPerView: 5,
    speed: 800,
    // If we need pagination
    // pagination: {
    //   el: ".products-slider__info",
    //   type: "fraction",
    // clickable: true,
    // },
    // Navigation arrows
    navigation: {
      nextEl: ".brands-slider__arrow--next",
      prevEl: ".brands-slider__arrow--prev"
    },
    // And if we need scrollbar
    // scrollbar: {
    // el: '.swiper-scrollbar',
    // },
    breakpoints: {
      320: {
        slidesPerView: 1,
        autoHeight: true
      },
      480: {
        slidesPerView: 2
      },
      600: {
        slidesPerView: 3
      },
      768: {
        slidesPerView: 4
      },
      979: {
        slidesPerView: 5
      }
    }
  });
} // const myLotsSwiper = new Swiper(".lots__slide", {
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


;
var menuHeader = document.querySelector(".header");
var mainBlock = document.querySelector(".mainblock");
var scrolled = false; // first fullscreen parallax effect
// window.addEventListener("scroll", () => {
//   const s = pageYOffset / 2;
//   document.querySelector(
//     ".mainblock__bg"
//   ).style.transform = `translate3d(0, ${s}px, 0)`;
//   if (pageYOffset > 0) {
//     scrolled = true;
//     if (scrolled) {
//       menuHeader.style.backgroundColor = "rgba(34, 34, 34, 1)";
//       // mainBlock.style.marginTop = `${menuHeader.offsetHeight}px`;
//     }
//   } else {
//     scrolled = false;
//     // mainBlock.style.marginTop = `0px`;
//     menuHeader.style.backgroundColor = "transparent";
//   }
// });
//smooth scroll from first fullscreen to content
// const gotos = document.querySelectorAll("._goto");
// if (gotos) {
//   [].forEach.call(gotos, (e) => {
//     e.parentNode.addEventListener("click", () => {
//       const link = e.getAttribute("href");
//       if (link) {
//         const box = document
//           .querySelector("." + link.split("#")[1])
//           .getBoundingClientRect();
//         window.scrollTo({
//           top: box.top + pageYOffset - menuHeader.offsetHeight,
//           behavior: "smooth",
//         });
//       }
//     });
//   });
// }
// $(document).ready(function () {
//   if ($(".team__row").length > 0) {
//     $(".team__row").slick({
//       // autoplay: true,
//       // infinite: false,
//       dots: true,
//       arrows: true,
//       accessibility: false,
//       slidesToShow: 4,
//       slidesToScroll: 4,
//       autoplaySpeed: 3000,
//       adaptiveHeight: true,
//       nextArrow: "<button type='button' class='slick-next'></button>",
//       prevArrow: "<button type='button' class='slick-prev'></button>",
//       responsive: [
//         {
//           breakpoint: 767,
//           settings: {
//             slidesToShow: 2,
//             slidesToScroll: 2,
//           },
//         },
//         {
//           breakpoint: 480,
//           settings: {
//             slidesToShow: 1,
//             slidesToScroll: 1,
//             dots: false,
//           },
//         },
//       ],
//     });
//   }
// });

if (isMobile.any()) {
  var menuParentsLinks = document.querySelectorAll(".menu-page__parent a");
  [].forEach.call(menuParentsLinks, function (menuParentLink) {
    menuParentLink.addEventListener("click", function (e) {
      menuParentLink.parentElement.classList.toggle("_active");

      _slideToggle(menuParentLink.parentElement.querySelector(".submenu-page__item"), menuParentLink, 300);

      e.preventDefault();
    });
  });
} else {
  var menuParents = document.querySelectorAll(".menu-page__parent");
  [].forEach.call(menuParents, function (menuParent) {
    menuParent.addEventListener("mouseenter", function (e) {
      menuParent.classList.add("_active");
    });
    menuParent.addEventListener("mouseleave", function (e) {
      menuParent.classList.remove("_active");
    });
  });
}

var sideBurger = document.querySelector(".menu-page__burger");
var sideBody = document.querySelector(".menu-page__body");

if (sideBurger) {
  sideBurger.addEventListener("click", function (e) {
    sideBurger.classList.toggle("_active");

    _slideToggle(sideBody, sideBurger);
  });
}

var searchTitle = document.querySelector(".search-page__title");
var categoriesSearch = document.querySelector(".categories-search");
searchTitle.addEventListener("click", function (e) {
  searchTitle.classList.toggle("_active");

  _slideToggle(categoriesSearch, searchTitle);
});
var checkboxCategories = document.querySelectorAll(".categories-search__checkbox");
var searchQuantity = document.querySelector(".search-page__quantity");
[].forEach.call(checkboxCategories, function (checkboxCategory) {
  checkboxCategory.addEventListener("change", function (e) {
    checkboxCategory.classList.toggle("_active");
    var checkboxActiveCategories = document.querySelectorAll(".categories-search__checkbox._active");

    if (checkboxActiveCategories.length > 0) {
      searchTitle.classList.add("_categories");
      searchQuantity.innerHTML = searchQuantity.getAttribute("data-text") + " " + checkboxActiveCategories.length;
    } else {
      searchTitle.classList.remove("_categories");
    }
  });
});

var _slideUp = function _slideUp(target, pauseTarget) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;

  if (pauseTarget) {
    pauseTarget.style.pointerEvents = "none";
  }

  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + "ms";
  target.style.height = target.offsetHeight + "px";
  target.offsetHeight;
  target.style.overflow = "hidden";
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  setTimeout(function () {
    target.style.display = "none";
    target.style.removeProperty("height");
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    target.style.removeProperty("overflow");
    target.style.removeProperty("transition-property");
    target.style.removeProperty("transition-duration");
    target.classList.remove("_slide");

    if (pauseTarget) {
      pauseTarget.style.pointerEvents = "all";
    }
  }, duration);
};

var _slideDown = function _slideDown(target, pauseTarget) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;

  if (pauseTarget) {
    pauseTarget.style.pointerEvents = "none";
  }

  target.style.removeProperty("display");
  var display = window.getComputedStyle(target).display;

  if (display === "none") {
    display = "block";
  }

  target.style.display = display;
  var height = target.offsetHeight;
  target.style.overflow = "hidden";
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + "ms";
  target.style.height = height + "px";
  target.style.removeProperty("padding-top");
  target.style.removeProperty("padding-bottom");
  target.style.removeProperty("margin-top");
  target.style.removeProperty("margin-bottom");
  setTimeout(function () {
    target.style.removeProperty("height");
    target.style.removeProperty("overflow");
    target.style.removeProperty("transition-property");
    target.style.removeProperty("transition-duration");
    target.classList.remove("_slide");

    if (pauseTarget) {
      pauseTarget.style.pointerEvents = "all";
    }
  }, duration);
};

var _slideToggle = function _slideToggle(target, pauseTarget) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;

  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");

    if (window.getComputedStyle(target).display === "none") {
      return _slideDown(target, pauseTarget, duration);
    } else {
      return _slideUp(target, pauseTarget, duration);
    }
  }
};