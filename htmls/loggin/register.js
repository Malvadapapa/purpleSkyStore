const $regForm = document.getElementById("regForm");

const $username = document.getElementById("username");
const $email = document.getElementById("email");
const $password = document.getElementById("password");
const $repeatPassword = document.getElementById("repeatPasword");
const $terms = document.getElementById("terms");
const $termsSmall = document.getElementById("termsSmall");

const users = JSON.parse(localStorage.getItem("users")) || [];

const saveToLocalStorage = () => {
  localStorage.setItem("users", JSON.stringify(users));
};

const CHECK_IF_EMPTY = (input) => {
  return !input.value.trim().length;
};

const CHECK_IS_BETWEEN = (input, min, max) => {
  return input.value.length >= min && input.value.length <= max;
};

const CHECK_EXISTING_USERNAME = (input) => {
  return users.some((user) => user.userName === input.value.trim());
};

const CHECK_VALID_EMAIL = (input) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  return emailRegex.test(input.value.trim());
};

const CHECK_EXISTING_EMAIL = (input) => {
  return users.some((user) => user.email === input.value.trim());
};

const CHECK_PASSWORD_SECURE = (input) => {
  const passwordRegex = /^[^\s]{5,}$/;
  return passwordRegex.test(input.value.trim());
};

const CHECK_IS_PASSWORD_SAME = (input, email) => {
  console.log(email.value);
  return input.value === email.value;
};

const SHOW_ERROR = (input, message, inputSmall) => {
  inputSmall.innerHTML = "";
  input.classList.remove("formFieldsuccess");
  input.classList.add("formFieldError");
  inputSmall.innerHTML = message;
};

const SHOW_SUCCES = (input, inputSmall) => {
  input.classList.remove("formFieldError");
  input.classList.add("formFieldsuccess");
  inputSmall.innerHTML = "";
};

const CHECK_INPUT = (input) => {
  let valid = false;
  const formFieldSmall = input.nextElementSibling;
  if (CHECK_IF_EMPTY(input)) {
    SHOW_ERROR(input, "Este campo no debe estar vacio", formFieldSmall);
    return;
  }
  if (CHECK_EXISTING_USERNAME(input)) {
    SHOW_ERROR(input, "El Usuario ya esta registrado", formFieldSmall);
    return;
  }
  if (!CHECK_IS_BETWEEN(input, 3, 15)) {
    SHOW_ERROR(
      input,
      "Este campo debe tener entre 3 y 15 caracteres",
      formFieldSmall
    );
    return;
  }

  SHOW_SUCCES(input, formFieldSmall);
  valid = true;
  return valid;
};

const CHECK_EMAIL = (input) => {
  let valid = false;
  const formFieldSmall = input.nextElementSibling;
  if (CHECK_IF_EMPTY(input)) {
    SHOW_ERROR(input, "Este campo no debe estar vacio", formFieldSmall);
    return;
  }
  if (CHECK_EXISTING_EMAIL(input)) {
    SHOW_ERROR(input, "El Email ya esta registrado", formFieldSmall);
    return;
  }
  if (!CHECK_VALID_EMAIL(input)) {
    SHOW_ERROR(input, "El Email no es valido", formFieldSmall);
    return;
  }
  SHOW_SUCCES(input, formFieldSmall);
  valid = true;
  return valid;
};
const CHECK_PASSWORD = (input) => {
  let valid = false;
  const formFieldSmall = input.nextElementSibling;
  if (CHECK_IF_EMPTY(input)) {
    SHOW_ERROR(input, "Este campo no debe estar vacio", formFieldSmall);
    return;
  }
  if (!CHECK_PASSWORD_SECURE(input)) {
    SHOW_ERROR(
      input,
      "La contraseña debe tener 5 caracteres o mas sin espacios en blanco",
      formFieldSmall
    );
    return;
  }
  SHOW_SUCCES(input, formFieldSmall);
  valid = true;
  return valid;
};

const CHECK_REPEAT_PASSWORD = (input) => {
  let valid = false;
  const formFieldSmall = input.nextElementSibling;
  if (CHECK_IF_EMPTY(input)) {
    SHOW_ERROR(input, "Este campo no debe estar vacio", formFieldSmall);
    return;
  }
  if (!CHECK_IS_PASSWORD_SAME(input, $password)) {
    SHOW_ERROR(
      input,
      "La contraseña debe ser igual a la anterior",
      formFieldSmall
    );
    return;
  }
  SHOW_SUCCES(input, formFieldSmall);
  valid = true;
  return valid;
};

const IS_CHECKBOX_CHECKED = (checkboxInput) => {
  return checkboxInput.checked;
};

const REGISTER_OK = (e) => {
  e.preventDefault();

  let userValid = CHECK_INPUT($username);
  let emailValid = CHECK_EMAIL($email);
  let passwordValid = CHECK_PASSWORD($password);
  let repeatPaswordValid = CHECK_REPEAT_PASSWORD($repeatPassword);

  if (!IS_CHECKBOX_CHECKED($terms)) {
    SHOW_ERROR(
      $terms,
      "Debes aceptar los terminos y condiciones =(",
      $termsSmall
    );
    return;
  }
  SHOW_SUCCES($terms, $termsSmall);

  let isValidForm =
    userValid && emailValid && passwordValid && repeatPaswordValid;

  if (isValidForm) {
    users.push({
      userName: $username.value,
      email: $email.value,
      password: $password.value,
    });
  } else {
    return;
  }

  saveToLocalStorage(users);
  alert("Usuario registrado con Exito, seras llevado al inicio nuevamente!");
  window.location.href = "/index.html";
};

const INIT = () => {
  $username.addEventListener("input", () => {
    CHECK_INPUT($username);
  });
  $email.addEventListener("input", () => {
    CHECK_EMAIL($email);
  });
  $password.addEventListener("input", () => {
    CHECK_PASSWORD($password);
  });
  $repeatPassword.addEventListener("input", () => {
    CHECK_REPEAT_PASSWORD($repeatPassword);
  });

  $regForm.addEventListener("submit", REGISTER_OK);
};

INIT();
