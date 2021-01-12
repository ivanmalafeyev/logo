@@include("webp.js");
@@include("ibg.js");
@@include("forms.js");
@@include("responsive.js");

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

const menuParents = document.querySelectorAll(".menu-page__parent");

[].forEach.call(menuParents, (menuParent) => {
  menuParent.addEventListener("mouseenter", (e) => {
    menuParent.classList.add("_active");
  });
  menuParent.addEventListener("mouseleave", (e) => {
    menuParent.classList.remove("_active");
  });
});

const sideBurger = document.querySelector(".menu-page__burger");
const sideBody = document.querySelector(".menu-page__body");

if (sideBurger) {
  sideBurger.addEventListener("click", (e) => {
    sideBurger.classList.toggle("_active");
    _slideToggle(sideBody);
  });
}

const searchTitle = document.querySelector(".search-page__title");
const categoriesSearch = document.querySelector(".categories-search");
searchTitle.addEventListener("click", (e) => {
  searchTitle.classList.toggle("_active");
  _slideToggle(categoriesSearch);
});

const _slideUp = (target, duration = 500) => {
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
  }, duration);
};

const _slideDown = (target, duration = 500) => {
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
  }, duration);
};

const _slideToggle = (target, duration = 500) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    if (window.getComputedStyle(target).display === "none") {
      return _slideDown(target, duration);
    } else {
      return _slideUp(target, duration);
    }
  }
};
