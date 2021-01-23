const PLACEHOLDER_OPACITY = 0.5;
const inputs = document.querySelectorAll(".input");
if (inputs) {
  [].forEach.call(inputs, (e) => {
    const dv = e.getAttribute("data-value");
    let isPlaceholder = true;
    e.isPlaceholder = isPlaceholder;
    if (dv) {
      e.style.color = `rgba(255, 255, 255, ${PLACEHOLDER_OPACITY})`;
      e.value = dv;
      e.addEventListener("focus", () => {
        if (isPlaceholder) {
          e.value = "";
          isPlaceholder = false;
          e.isPlaceholder = isPlaceholder;
          e.style.color = `rgba(255, 255, 255, 1)`;
        }
      });
      e.addEventListener("blur", () => {
        if (e.value === "") {
          e.value = dv;
          isPlaceholder = true;
          e.isPlaceholder = isPlaceholder;
          e.style.color = `rgba(255, 255, 255, ${PLACEHOLDER_OPACITY})`;
        }
      });
    }
  });
}
const form = document.querySelector(".form");
if (form) {
  form.addEventListener("submit", (e) => {
    if (formValidate(form) === 0) {
      //
    } else {
      e.preventDefault();
    }
  });
}

function formValidate() {
  let error = 0;
  const formReq = document.querySelectorAll(".req");
  [].forEach.call(formReq, (e) => {
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

function digi(str) {
  return str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
}

function digiAnimate(digiAnimate) {
  if (digiAnimate.length > 0) {
    [].forEach.call(digiAnimate, (el) => {
      const elTo = +el.innerHTML.replace(" ", "");
      if (!el.classList.contains("_done")) {
        // digiAnimateValue(el, 0, elTo, 1500);
      }
    });
  }
}

const quantityButtons = document.querySelectorAll(".quantity__button");
if (quantityButtons.length > 0) {
  [].forEach.call(quantityButtons, (qb) => {
    qb.addEventListener("click", (e) => {
      let value = parseInt(
        qb.closest(".quantity").querySelector("input").value
      );
      if (qb.classList.contains("quantity__button--plus")) {
        value++;
      } else {
        value--;
        if (value < 1) {
          value = 1;
        }
      }
      qb.closest(".quantity").querySelector("input").value = value;
    });
  });
}
