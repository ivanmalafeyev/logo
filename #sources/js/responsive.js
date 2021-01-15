let w, h;
w = window.outerWidth;
h = window.outerHeight;

function resize() {
  // adiptiveHeader("header-menu", "header-top-lang", "header-top");
  adiptiveHeader(640, "menu__body", "bottom-header__actions", "_c1", 1);
  adiptiveHeader(640, "menu__body", "info-header__callback", "_c2");
  adiptiveHeader(
    640,
    "contacts-header__item--icon",
    "info-header__cart",
    "_c3"
  );
  adiptiveHeader(979, "page__content", "page__side-content", "page__side");
}

function adiptiveHeader(
  treshold,
  burgerMenuClass,
  elementClass,
  returnPointClass,
  order = 0
) {
  let burgerMenu = document.querySelector("." + burgerMenuClass);
  let element = document.querySelector("." + elementClass);
  let returnPoint = document.querySelector("." + returnPointClass);
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

window.addEventListener("resize", () => {
  w = window.outerWidth;
  h = window.outerHeight;
  resize();
});

resize();
// let wo, ho, wi, hi;
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

const menuIcon = document.querySelector(".icon-menu");
const menu = document.querySelector(".top-header__menu");
// const menuSocial = document.querySelector(".header__social");
const links = document.querySelectorAll(".menu__link");

menuIcon.addEventListener("click", () => {
  function toggleClass(c) {
    menuIcon.classList.toggle(c);
    menu.classList.toggle(c);
    // menuSocial.classList.toggle(c);
    [].forEach.call(links, (lnk) => {
      lnk.classList.toggle("_active");
    });
    document.body.classList.toggle("_lock");
  }
  toggleClass("_active");

  function linkCB() {
    toggleClass("_active");
    [].forEach.call(links, (l) => {
      l.removeEventListener("click", linkCB);
    });
  }

  [].forEach.call(links, (l) => {
    l.addEventListener("click", linkCB);
  });
});
