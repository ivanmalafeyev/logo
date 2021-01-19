//Check mobile
const isMobile = {
  Android: () => {
    return !!navigator.userAgent.match(/Android/i);
  },
  BlackBerry: () => {
    return !!navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: () => {
    return !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: () => {
    return !!navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: () => {
    return !!navigator.userAgent.match(/IEMobile/i);
  },
  any: () => {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

//Set touch mode or mouse mode
if (isMobile.any()) {
  document.body.classList.add("_touch");
  const arrows = document.querySelectorAll("._menu-arrow");
  [].forEach.call(arrows, (e) => {
    const thisLink = e.previousElementSibling;
    const subMenu = e.nextElementSibling;
    thisLink.classList.add("_parent");
    e.addEventListener("click", () => {
      subMenu.classList.toggle("_open");
      e.classList.toggle("_active");
    });
  });
} else {
  document.body.classList.add("_mouse");
}
