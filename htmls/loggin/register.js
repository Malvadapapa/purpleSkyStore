const $burgerContainer = document.querySelector(".navContainer");
const $closeBurger = document.getElementById("exitBurger");
const $openBurger = document.getElementById("burgerOpener");

const $regForm = document.getElementById("regForm");

const $username = document.getElementById("username");
const $email = document.getElementById("email");
const $password = document.getElementById("password");
const $repeatPassword = document.getElementById("repeatPasword");
const $terms = document.getElementById("terms");
const $termsSmall = document.getElementById("termsSmall");

const $closeLoggin = document.getElementById("closeLoggin");
const $logginSecition = document.getElementById("logginSection");
 const $logginUsername = document.getElementById("logginUsername");
const $logginPassword = document.getElementById("logginPassword");
const $logginSubmitBtn = document.getElementById("logginSubmit");
const $logginForm = document.getElementById("logginForm");

const $logginSesion_li = document.getElementById('logginSesion_li')
const $sesionContainer = document.getElementById('sesionContainer')

const OPEN_BURGER = () => {
  $burgerContainer.classList.toggle("navContainerActive");
};

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


const OPEN_LOGGIN = (e) => {
  if (e.target.classList.contains("openLoggin")) {
    $logginSecition.classList.toggle("showLoggin");
  }
};


const CLOSE_LOGGIN = () => {
  $logginSecition.classList.toggle("showLoggin");
};
const CLOSE_LOGGIN_IF_OUTSIDE = (e) => {
  if (e.target.classList.contains("loggin")) {
    $logginSecition.classList.toggle("showLoggin");
  }
};
const LOGGOUT = (e)=> {
  if (e.target.classList.contains("loggOut")) {

if (window.confirm('Estas seguro que deseas salir?')) {
  setTimeout(() => {
    sessionStorage.removeItem('activeUser');
    location.reload();
  }, 1000);
} else{
  return
}
 
  }
}

const CHECK_IF_LOGGIN_EMPTY = (input) => {
  return !input.value.trim().length;
};

const CHECK_EXISTING_LOGGIN_USERNAME = (input) => {
  return users.some((user) => user.userName === input.value.trim());
};
const CHECK_IS_MATCHING_PASSWORD = (input) => {
  const user = users.find((user) => user.userName === $logginUsername.value.trim()
  );
   return user.password === input.value.trim();
};

const SHOW_LOGGIN_ERROR = (input, message, inputSmall) => {
  inputSmall.innerHTML = "";
  input.classList.remove("formFieldsuccess");
  input.classList.add("formFieldError");
  inputSmall.innerHTML = message;
};

const SHOW_LOGGIN_SUCCES = (input, inputSmall) => {
  input.classList.remove("formFieldError");
  input.classList.add("formFieldsuccess");
  inputSmall.innerHTML = "";
};
const RESET_FORM = (input, inputSmall) => {
  inputSmall.innerHTML = "";
  input.classList.remove("formFieldsuccess");
  input.classList.remove("formFieldError");
};
const IS_VALID_ACCOUNT = (input) => {
  let valid = false;
  const formFieldSmall = input.nextElementSibling;
  if (CHECK_IF_LOGGIN_EMPTY(input)) {
    SHOW_LOGGIN_ERROR(input, "Este campo no debe estar vacio", formFieldSmall);
    return;
  }
  if (!CHECK_EXISTING_LOGGIN_USERNAME(input)) {
    SHOW_LOGGIN_ERROR(
      input,
      "El Usuario ingresado no existe =S",
      formFieldSmall
    );
    return;
  }
  SHOW_LOGGIN_SUCCES(input, formFieldSmall);

  valid = true;
  return valid;
};

const IS_VALID_PASSWORD = (input) => {
  let valid = false;
  const formFieldSmall = input.nextElementSibling;
  if (CHECK_IF_LOGGIN_EMPTY(input)) {
    SHOW_LOGGIN_ERROR(input, "Este campo no debe estar vacio", formFieldSmall);
    return;
  }
  if (!CHECK_IS_MATCHING_PASSWORD(input)) {
    SHOW_LOGGIN_ERROR(input, "La contraseña ingresada no es valida", formFieldSmall);
    return;
  }

  SHOW_LOGGIN_SUCCES(input, formFieldSmall);

  valid = true;
  return valid;
};

const LOGGIN = (e) => {
  e.preventDefault();
  let validUsername = IS_VALID_ACCOUNT($logginUsername);
  let validPassword = IS_VALID_PASSWORD($logginPassword);

if (validUsername && validPassword) {
  const user = users.find((user) => user.userName === $logginUsername.value.trim())
   sessionStorage.setItem('activeUser', JSON.stringify(user))
  alert('Has iniciado sesion correctamente =)')
  setTimeout(() => {
    location.reload();
  }, 1000);
    return
}
/*   RESET_FORM($logginPassword, formFieldSmall);
  $logginForm.reset(); */
};
 const activeUser = sessionStorage.activeUser ? JSON.parse(sessionStorage.activeUser) : false;


 const IS_ACTIVE_USER = () => {

if (activeUser) { 
$logginSesion_li.innerHTML = `<h3>${activeUser.userName}  <span class="loggOut" > Salir <i class="fa fa-sign-out" aria-hidden="true"></i></span></h3> `
$sesionContainer.innerHTML = `<h3>${activeUser.userName}  <span class="loggOut" > Salir <i class="fa fa-sign-out" aria-hidden="true"></i></span></h3>`

}else {
   $logginSesion_li.innerHTML = `<a href="#" class="openLoggin" id="openLogginBurger">¡INICIAR SESION!</a>`
   $sesionContainer.innerHTML = `
   <div data-tooltip="¡INICIAR SESION!" data-flow="bottom" class="loggin-register openLoggin" id="openLoggin">
   <img  src="/assets/headerAssets/logginIcon.svg" class="openLoggin" alt="" />
   </div>


   `
}
 }
const INIT = () => {
  $openBurger.addEventListener("click", OPEN_BURGER);
  $closeBurger.addEventListener("click", OPEN_BURGER);

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

  $closeLoggin.addEventListener("click", CLOSE_LOGGIN);

  $sesionContainer.addEventListener("click", OPEN_LOGGIN);
  $logginSesion_li.addEventListener("click", OPEN_LOGGIN);
 
  $sesionContainer.addEventListener("click", LOGGOUT);
  $logginSesion_li.addEventListener("click", LOGGOUT);

  $logginSecition.addEventListener("click", CLOSE_LOGGIN_IF_OUTSIDE);

  $logginForm.addEventListener("submit", LOGGIN);
  IS_ACTIVE_USER()
};

INIT();
