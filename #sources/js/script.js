@@include("webp.js");
@@include("ibg.js");
@@include("forms.js");
@@include("responsive.js");

const menuHeader = document.querySelector(".header");
const mainBlock = document.querySelector(".mainblock");
let scrolled = false;

// first fullscreen parallax effect
window.addEventListener("scroll", () => {
  const s = pageYOffset / 2;
  document.querySelector(
    ".mainblock__bg"
  ).style.transform = `translate3d(0, ${s}px, 0)`;

  if (pageYOffset > 0) {
    scrolled = true;
    if (scrolled) {
      menuHeader.style.backgroundColor = "rgba(34, 34, 34, 1)";
      // mainBlock.style.marginTop = `${menuHeader.offsetHeight}px`;
    }
  } else {
    scrolled = false;
    // mainBlock.style.marginTop = `0px`;
    menuHeader.style.backgroundColor = "transparent";
  }
});

//smooth scroll from first fullscreen to content
const gotos = document.querySelectorAll("._goto");
if (gotos) {
  [].forEach.call(gotos, (e) => {
    e.parentNode.addEventListener("click", () => {
      const link = e.getAttribute("href");
      if (link) {
        const box = document
          .querySelector("." + link.split("#")[1])
          .getBoundingClientRect();
        window.scrollTo({
          top: box.top + pageYOffset - menuHeader.offsetHeight,
          behavior: "smooth",
        });
      }
    });
  });
}

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
