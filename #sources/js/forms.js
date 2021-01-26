const errClassName = "_error";
const activeClassName = "_active";

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
const form = document.querySelector("._form");
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
  const formReq = document.querySelectorAll("._req");
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

// Select
const selects = document.getElementsByTagName("select");
if (selects.length > 0) {
  selectsInit();
}

function selectsInit() {
  [].forEach.call(selects, (select) => {
    selectInit(select);
  });

  document.addEventListener("click", (e) => {
    selectsClose(e);
  });
  document.addEventListener("keydown", (e) => {
    if (e.which == 27) {
      selectsClose(e);
    }
  });
}

function selectsClose(e) {
  const selects = document.querySelectorAll(".select");
  if (!e.target.closest(".select")) {
    [].forEach.call(selects, (select) => {
      const selectBodyOptions = select.querySelector(".select__options");
      select.classList.remove(activeClassName);
      _slideUp(selectBodyOptions, null, 100);
    });
  }
}

function selectInit(select) {
  const selectParent = select.parentElement;
  const selectModifier = select.getAttribute("class");
  const selectSelectedOption = select.querySelector("option:checked");
  select.setAttribute("data-default", selectSelectedOption.value);
  select.style.display = "none";

  selectParent.insertAdjacentHTML(
    "beforeend",
    "<div class='select select_" + selectModifier + "'></div>"
  );

  const newSelect = selectParent.querySelector(".select");
  newSelect.append(select);
  selectItem(select);
}

function selectItem(select) {
  const selectParent = select.parentElement;
  const selectItems = selectParent.querySelector(".select__item");
  const selectOptions = select.querySelectorAll("option");
  const selectSelectedOption = select.querySelector("option:checked");
  const selectSelectedText = selectSelectedOption.text;
  const selectType = select.getAttribute("data_type");

  if (selectItems) {
    selectItems.remove();
  }

  let selectTypeContent = "";
  if (selectType == "input") {
    selectTypeContent =
      "<div class='select__value icon-select-arrow'><input autocomplete='off' type='text' name='form[]' value='" +
      selectSelectedText +
      "'/></div>";
  } else {
    selectTypeContent =
      "<div class='select__value icon-select-arrow'><span>" +
      selectSelectedText +
      "</span></div>";
  }

  selectParent.insertAdjacentHTML(
    "beforeend",
    "<div class='select__item'>" +
      "<div class='select__title'>" +
      selectTypeContent +
      "</div>" +
      "<div class='select__options'>" +
      selectGetOptions(selectOptions) +
      "</div></div></div>"
  );

  selectActions(select, selectParent);
}

function selectActions(original, select) {
  const selectItem = select.querySelector(".select__item");
  const selectBodyOptions = select.querySelector(".select__options");
  const selectOptions = select.querySelectorAll(".select__option");
  const selectType = original.getAttribute("data-type");
  const selectInput = select.querySelector(".select__input");

  selectItem.addEventListener("click", () => {
    const selects = document.querySelectorAll(".select");
    [].forEach.call(selects, (select) => {
      const selectBodyOptions = select.querySelector(".select__options");
      if (select != selectItem.closest(".select")) {
        select.classList.remove(activeClassName);
        _slideUp(selectBodyOptions, null, 100);
      }
    });
    _slideToggle(selectBodyOptions, null, 100);
    select.classList.toggle(activeClassName);
  });

  [].forEach.call(selectOptions, (selectOption) => {
    const selectOptionValue = selectOption.getAttribute("data-value");
    const selectOptionText = selectOption.innerHTML;

    if (selectType == "input") {
      selectInput.addEventListener("keyup", selectSearch);
    } else {
      if (selectOption.getAttribute("data-value") == original.value) {
        selectOption.style.display = "none";
      }
    }
    selectOption.addEventListener("click", () => {
      [].forEach.call(selectOptions, (el) => {
        el.style.display = "block";
      });
      if (selectType == "input") {
        selectInput.value = selectOptionText;
        original.value = selectOptionValue;
      } else {
        select.querySelector(".select__value").innerHTML =
          "<span>" + selectOptionText + "</span>";
        original.value = selectOptionValue;
        selectOption.style.display = "none";
      }
    });
  });
}

function selectGetOptions(selectOptions) {
  if (selectOptions) {
    let selectOptionsContent = "";
    [].forEach.call(selectOptions, (selectOption) => {
      const selectOptionValue = selectOption.value;
      if (selectOptionValue) {
        const selectOptionText = selectOption.text;
        selectOptionsContent =
          selectOptionsContent +
          "<div data-value='" +
          selectOptionValue +
          "' class='select__option'>" +
          selectOptionText +
          "</div>";
      }
    });
    return selectOptionsContent;
  }
}

function selectSearch(e) {
  const selectBlock = e.target
    .closest(".select")
    .querySelector(".select__options");
  const selectOptions = e.target
    .closest(".select")
    .querySelectorAll(".select__option");
  const selectSearchText = e.target.value.toUpperCase();

  [].forEach.call(selectOptions, (selectOption) => {
    const selectTxtValue = selectOption.textContent || selectOption.innerText;
    if (selectTxtValue.toUpperCase().indexOf(selectSearchText) > -1) {
      selectOption.style.display = "";
    } else {
      selectOption.style.display = "none";
    }
  });
}

function selectsUpdateAll() {
  const selects = document.querySelectorAll("select");
  if (selects) {
    [].forEach.call(selects, (select) => {
      selectItem(select);
    });
  }
}
// Select end
