// const btn = document.querySelectorAll("button[type='submit'],input[type='submit']");
const errClassName = "._error";
const activeClassName = "._active";

const forms = document.querySelectorAll("form");
if (forms.length > 0) {
  [].forEach.call(forms, (el) => {
    el.addEventListener("submit", formSubmit);
  });
}

function formSubmit(e) {
  const btn = event.target;
  const form = btn.closest("form");
  const message = form.getAttribute("data-message");
  const error = formValidate(form);
  if (error == 0) {
    //SendForm
    formClean(form);
    if (message) {
      popupOpen("message-" + message);
      e.preventDefault();
    }
  } else {
    const formError = form.querySelectorAll("." + errClassName);
    if (formError && form.classList.contains("_goto-error")) {
      _goto(formError[0], 1000, 50);
    }
    event.preventDefault();
  }
}

function formValidate(form) {
  let error = 0;
  const formReq = form.querySelectorAll("._req");
  if (formReq.length > 0) {
    [].forEach.call(formReq, (el) => {
      if (!_is_hidden(el)) {
        error += formValidateInput(el);
      }
    });
  }
  return error;
}

function formValidateInput(input) {
  let error = 0;
  const inputGValue = input.getAttribute("data-value");

  if (
    input.getAttribute("name") == "email" ||
    input.classList.contains("_email")
  ) {
    if (input.value != inputGValue) {
      const em = input.value.replace(" ", "");
      input.value = em;
    }
    if (emailTest(input) || input.value == inputGValue) {
      formAddError(input);
      error++;
    } else {
      formRemoveError(input);
    }
  } else {
    if (input.value == "" || input.value == inputGValue) {
      formAddError(input);
      error++;
    } else {
      formRemoveError(input);
    }
  }
  return error;
}

function formAddError(input) {
  input.classList.add(errClassName);
  input.parentElement.classList.add(errClassName);

  const inputError = input.parentElement.querySelector(".form_error");
  if (inputError) {
    input.parentElement.removeChild(inputError);
  }
  const inputErrorText = input.getAttribute("data-error");
  if (inputErrorText) {
    input.parentElement.insertAdjacentHTML(
      "beforeend",
      "<div class='form_error'>" + inputErrorText + "</div>"
    );
  }
}

function formRemoveError(input) {
  input.classList.remove(errClassName);
  input.parentElement.classList.remove(errClassName);

  const inputError = input.parentElement.querySelector(".form_error");
  if (inputError) {
    input.parentElement.removeChild(inputError);
  }
}

function formClean(form) {
  const inputs = form.querySelectorAll("input,textarea");
  [].forEach.call(inputs, (el) => {
    el.parentElement.classList.remove("_focus");
    el.classList.remove("_focus");
    el.value = el.getAttribute("data-value");
  });
  const checkboxes = form.querySelectorAll("checkbox__input");
  if (checkboxes.length > 0) {
    [].forEach.call(checkboxes, (checkbox) => {
      checkbox.checked = false;
    });
  }
  const selects = form.querySelectorAll("select");
  if (selects.length > 0) {
    [].forEach.call(selects, (select) => {
      const selectDefaultValue = select.getAttribute("data-default");
      select.value = selectDefaultValue;
      selectItem(select);
    });
  }
}

const viewPass = document.querySelectorAll(".form_viewpass");
[].forEach.call(viewPass, (element) => {
  element.addEventListener("click", (e) => {
    if (element.classList.contains(activeClassName)) {
      element.parentElement
        .querySelector("input")
        .setAttribute("type", "password");
    } else {
      element.parentElement.querySelector("input").setAttribute("type", "text");
    }
    element.classList.toggle(activeClassName);
  });
});

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

// Placeholders
let inputs = document.querySelectorAll(
  "input[data-value],textarea[data-value]"
);
inputsInit(inputs);

function inputsInit(inputs) {
  if (inputs.length > 0) {
    [].forEach.call(inputs, (input) => {
      const inputGValue = input.getAttribute("data-value");
      inputPlaceholderAdd(input);
      if (input.value != "" && input.value != inputGValue) {
        inputFocusAdd(input);
      }
      input.addEventListener("focus", (e) => {
        if (input.value == inputGValue) {
          inputFocusAdd(input);
          input.value = "";
        }
        if (input.getAttribute("data-type") === "pass") {
          input.setAttribute("type", "password");
        }
        if (input.classList.contains("_date")) {
          /*
          input.classList.add("_mask");
          Inputmask("99.99.9999", {
            // "placeholder": "",
            clearIncomplete: true,
            clearMaskOnLostFocus: true,
            onincomplete: function () {
              inputClearMask(input, inputGValue);
            },
          }).mask(input);
          */
        }
        if (input.classList.contains("_phone")) {
          // "+7(999) 999 9999"
          // "+38(999) 999 9999"
          // "+375(99)999-99-99"
          input.classList.add("_mask");
          Inputmask("+375 (99) 9999999", {
            //"placeholder": "",
            clearIncomplete: true,
            clearMaskOnLostFocus: true,
            onincomplete: function () {
              inputClearMask(input, inputGValue);
            },
          }).mask(input);
        }
        if (input.classList.contains("_digital")) {
          input.classList.add("_mask");
          Inputmask("9{1,}", {
            placeholder: "",
            clearIncomplete: true,
            clearMaskOnLostFocus: true,
            onincomplete: function () {
              inputClearMask(input, inputGValue);
            },
          }).mask(input);
        }
        formRemoveError(input);
      });

      input.addEventListener("blur", (e) => {
        if (input.value == "") {
          input.value = inputGValue;
          inputFocusRemove(input);
          if (input.classList.contains("_mask")) {
            inputClearMask(input, inputGValue);
          }
          if (input.getAttribute("data-type") === "pass") {
            input.setAttribute("type", "text");
          }
        }
      });

      if (input.classList.contains("_date")) {
        datepicker(input, {
          customDays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
          customMonths: [
            "Янв",
            "Фев",
            "Мар",
            "Апр",
            "Май",
            "Июн",
            "Июл",
            "Авг",
            "Сен",
            "Окт",
            "Ноя",
            "Дек",
          ],
          formatter: (input, date, instance) => {
            const value = date.toLocalDateString();
            input.value = value;
          },
          onSelect: (input, instance, date) => {
            inputFocusAdd(input.el);
          },
        });
      }
    });
  }
}

function inputPlaceholderAdd(input) {
  const inputGValue = input.getAttribute("data-value");
  if (input.value == "" && inputGValue != "") {
    input.value = inputGValue;
  }
}

function inputFocusAdd(input) {
  input.classList.add("_focus");
  input.parentElement.classList.add("_focus");
}

function inputFocusRemove(input) {
  input.classList.remove("_focus");
  input.parentElement.classList.remove("_focus");
}

function inputClearMask(input, inputGValue) {
  input.inputmask.remove();
  input.value = inputGValue;
  inputFocusRemove(input);
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
