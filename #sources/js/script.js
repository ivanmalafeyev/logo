@@include("webp.js");
@@include("ibg.js");
@@include("popup.js");
@@include("forms.js");
@@include("responsive.js");
@@include("my_swiper.js");
@@include("wNumb.min.js");
@@include("nouislider.js");

const menuHeader = document.querySelector(".header");
const mainBlock = document.querySelector(".mainblock");
let scrolled = false;

// first fullscreen parallax effect
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

const spoilers = document.querySelectorAll("._spoilers");
if (spoilers) {
  [].forEach.call(spoilers, (el) => {
    const spoilerItems = el.querySelectorAll("._spoiler");
    [].forEach.call(spoilerItems, (spoiler) => {
      const spoilerBody = spoiler.nextElementSibling;
      spoiler.addEventListener("click", (e) => {
        spoiler.classList.toggle("_active");
        _slideToggle(spoilerBody, spoiler);
      });
    });
  });
}

const priceSlider = document.querySelector(".price-filter__slider");
if (priceSlider) {
  noUiSlider.create(priceSlider, {
    start: [0, 100000],
    tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
    connect: true,
    range: {
      min: [0],
      max: [200000],
    },
  });
}

const priceFrom = document.querySelector("input#price-from");
const priceTo = document.querySelector("input#price-to");
if (priceFrom) {
  priceFrom.addEventListener("change", (e) => {
    priceSlider.noUiSlider.set([priceFrom.value, null]);
  });
}
if (priceTo) {
  priceTo.addEventListener("change", (e) => {
    priceSlider.noUiSlider.set([null, priceTo.value]);
  });
}

if (isMobile.any()) {
  const menuParentsLinks = document.querySelectorAll(".menu-page__parent a");
  [].forEach.call(menuParentsLinks, (menuParentLink) => {
    menuParentLink.addEventListener("click", (e) => {
      menuParentLink.parentElement.classList.toggle("_active");
      _slideToggle(
        menuParentLink.parentElement.querySelector(".submenu-page__item"),
        menuParentLink,
        300
      );
      e.preventDefault();
    });
  });
  const filterTitle = document.querySelector(".filter__title");
  if (filterTitle) {
    const filterContent = document.querySelector(".filter__content");
    filterTitle.addEventListener("click", (e) => {
      _slideToggle(filterContent, filterTitle);
    });
  }
} else {
  const menuParents = document.querySelectorAll(".menu-page__parent");
  [].forEach.call(menuParents, (menuParent) => {
    menuParent.addEventListener("mouseenter", (e) => {
      menuParent.classList.add("_active");
    });
    menuParent.addEventListener("mouseleave", (e) => {
      menuParent.classList.remove("_active");
    });
  });
}

const sideBurger = document.querySelector(".menu-page__burger");
const sideBody = document.querySelector(".menu-page__body");

if (sideBurger) {
  sideBurger.addEventListener("click", (e) => {
    sideBurger.classList.toggle("_active");
    _slideToggle(sideBody, sideBurger);
  });
}

const searchTitle = document.querySelector(".search-page__title");
const categoriesSearch = document.querySelector(".categories-search");
searchTitle.addEventListener("click", (e) => {
  searchTitle.classList.toggle("_active");
  _slideToggle(categoriesSearch, searchTitle);
});

const checkboxCategories = document.querySelectorAll(
  ".categories-search__checkbox"
);
const searchQuantity = document.querySelector(".search-page__quantity");
[].forEach.call(checkboxCategories, (checkboxCategory) => {
  checkboxCategory.addEventListener("change", (e) => {
    checkboxCategory.classList.toggle("_active");
    const checkboxActiveCategories = document.querySelectorAll(
      ".categories-search__checkbox._active"
    );
    if (checkboxActiveCategories.length > 0) {
      searchTitle.classList.add("_categories");
      searchQuantity.innerHTML =
        searchQuantity.getAttribute("data-text") +
        " " +
        checkboxActiveCategories.length;
    } else {
      searchTitle.classList.remove("_categories");
    }
  });
});

const _slideUp = (target, pauseTarget, duration = 500) => {
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
  setTimeout(() => {
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

const _slideDown = (target, pauseTarget, duration = 500) => {
  if (pauseTarget) {
    pauseTarget.style.pointerEvents = "none";
  }
  target.style.removeProperty("display");
  let display = window.getComputedStyle(target).display;
  if (display === "none") {
    display = "block";
  }

  target.style.display = display;
  let height = target.offsetHeight;
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
  setTimeout(() => {
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

const _slideToggle = (target, pauseTarget, duration = 500) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    if (window.getComputedStyle(target).display === "none") {
      return _slideDown(target, pauseTarget, duration);
    } else {
      return _slideUp(target, pauseTarget, duration);
    }
  }
};
