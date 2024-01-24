//importacion de la data desde el objeto de productos
import { productsData } from "../../products.js";

//variables pertenecientes al menu hamburguesa
const $burgerContainer = document.querySelector(".navContainer");
const $closeBurger = document.getElementById("exitBurger");
const $openBurger = document.getElementById("burgerOpener");

//variables pertenecientes al carrito de compras
const $cartContainer = document.getElementById("cartMainContainer");
const $cart = document.querySelector(".cartCards__Container");
const $showCartPrice = document.getElementById("showCartTotal");
const $cartTotalCuantity = document.getElementById("cartLength");
const $updateBubleQuantity = document.getElementById("cuantityCartBuble");
const $carAnimatedIcon = document.querySelector(".IconContainer");
const $emptyCartBtn = document.getElementById("emptyCart");
const $finishPurchase = document.getElementById("completePurchase");

const $cartOpener = document.querySelector(".CartBtn");
const $cartFocus = document.querySelector(".cartFocus");

//variable del contenedor del renderizado de productos
const $cardContainer = document.getElementById("cardRenderContainer");

//variables de los botones del paginado
const $paginationNext = document.getElementById("nextPaginationButton");
const $paginationPrev = document.getElementById("prevPaginationButton");

//variables del filtro por precio
const $minPrice = document.getElementById("minPrice");
const $maxPrice = document.getElementById("maxPrice");

//variables del filtro por color
const $colorSelectInput = document.getElementById("colorFilter");
//variable del filtro por tipo
const $typeSelectInput = document.getElementById("typeFilter");
const $applyFilters = document.getElementById("applyFilters");
const $removeFilters = document.getElementById("removeFilters");

//variables del loggin
const $closeLoggin = document.getElementById("closeLoggin");
const $logginSecition = document.getElementById("logginSection");
const $logginUsername = document.getElementById("logginUsername");
const $logginPassword = document.getElementById("logginPassword");
const $logginForm = document.getElementById("logginForm");
const $burgerRegister = document.getElementById("burgerRegister");
const $logginSesion_li = document.getElementById("logginSesion_li");
const $sesionContainer = document.getElementById("sesionContainer");

//---------------------------------------------------------------------------

// --------------Menu Hamburguesa--------------

const OPEN_BURGER = () => {
  $burgerContainer.classList.toggle("navContainerActive");
};

const CLOSE_BURGER = () => {
  $burgerContainer.classList.toggle("navContainerActive");
};

// --------------Paginado--------------

const DIVIDE_PRODUCTS_PAGINATION = (size, data) => {
  let productsArray = [];

  for (let i = 0; i < data.length; i += size) {
    productsArray.push(data.slice(i, i + size));
  }
  return productsArray;
};

// --------------Appstate--------------

const productOrigin = "man";
const appState = {
  products: DIVIDE_PRODUCTS_PAGINATION(6, productsData[productOrigin]),
  currentProductsIndex: 0,
  productsLength: DIVIDE_PRODUCTS_PAGINATION(6, productsData[productOrigin])
    .length,
  isThereAnyFilter: false,
  filteredProducts: DIVIDE_PRODUCTS_PAGINATION(6, productsData[productOrigin]),
  currentFilteredProductsIndex: 0,
  filteredProductsLength: DIVIDE_PRODUCTS_PAGINATION(
    6,
    productsData[productOrigin]
  ).length,
};

const paginationLimit = appState.products.length;
let filteredPaginationLimit = appState.filteredProducts.length;

// --------------Renderizado de Productos--------------

const BEFORE_RENDERING = (data) => {
  let productsToRender = data ?? [];
  if (productsToRender.length === 0) {
    return ($cardContainer.innerHTML = `
    <h3>No se encontro ropa con dichas caracteristicas</h3>
     `);
  }
  if (appState.isThereAnyFilter) {
    if (appState.currentFilteredProductsIndex !== 0) {
      $paginationNext.classList.remove("paginationButtonDissabled");
      $paginationPrev.classList.remove("paginationButtonDissabled");
    } else {
      $paginationNext.classList.remove("paginationButtonDissabled");
      $paginationPrev.classList.add("paginationButtonDissabled");
    }

    if (appState.currentFilteredProductsIndex === filteredPaginationLimit - 1) {
      $paginationNext.classList.add("paginationButtonDissabled");
      return;
    }
  } else {
    if (appState.currentProductsIndex !== 0) {
      $paginationNext.classList.remove("paginationButtonDissabled");
      $paginationPrev.classList.remove("paginationButtonDissabled");
    } else {
      $paginationPrev.classList.add("paginationButtonDissabled");
      $paginationNext.classList.remove("paginationButtonDissabled");
    }

    if (appState.currentProductsIndex === paginationLimit - 1) {
      $paginationNext.classList.add("paginationButtonDissabled");
    }
  }
};
const RENDER_PRODUCTS = (data) => {
  let productsToRender = data ?? [];

  BEFORE_RENDERING(data);

  if (productsToRender.length === 0) {
    return;
  }
  $cardContainer.innerHTML = productsToRender
    .map((productData) => {
      const { id, img, description, price, discountType } = productData;

      return ` 
     <div class="clothingCards">
     
        <img src="${img[0]}" alt="${description}">
        <div class="clothingCards_div">
         <p>${description}</p>
         <p>$${price}</p>
         <p>${discountType}</p>
         <span>
           <button class="clothingCards__button" 
           data-id="${id}"
        data-description="${description}" data-price="${price}" data-img="${img[0]}">AGREGAR AL CARRITO</button>
     <a href="../renderSeeMore/renderSeeMore.html?id=${id}&category=${productOrigin}" class="seeMore_btn"> 
      VER MAS 
      </a>    
           
         </span>
       </div>
     </div>
   
   `;
    })
    .join("");
};

// --------------Renderizado de Filtros de Ropa--------------

const AVAIBLE_TYPES = () => {
  let mapedTypes = appState.products.flatMap((arrayDeObjetos) =>
    arrayDeObjetos.map((objeto) => objeto.type)
  );
  const uniqueTypes = [...new Set(mapedTypes)];
  return uniqueTypes;
};

const RENDER_TYPES_FILTER = () => {
  let arrayDeTipos = AVAIBLE_TYPES();
  return arrayDeTipos.forEach((type) => {
    $typeSelectInput.innerHTML += `
    <option value="${type}">${type}</option>
    `;
  });
};

const RENDER_COLOR_FILTERS = (arrayDeColores) => {
  $colorSelectInput.innerHTML = "";
  $colorSelectInput.innerHTML += `<option value="all">Todos los colores</option>`;
  return arrayDeColores.forEach((color) => {
    const colorEnMayuscula = color.toUpperCase();
    return ($colorSelectInput.innerHTML += `
        <option value="${color}">${colorEnMayuscula}</option>
        `);
  });
};

const AVAIBLE_COLORS = () => {
  let allColors = appState.products.flatMap((arrayDeColores) =>
    arrayDeColores.flatMap((obj) => obj.color)
  );
  //set es una estructura de datos que solo admite datos unicos
  const uniqueColors = [...new Set(allColors)];

  RENDER_COLOR_FILTERS(uniqueColors);
};

// -------------- Logica de filtros de Ropa --------------
const FILTER_BY_PRICE = (productsToFilter) => {
  let precioMinimo = $minPrice.value || 0;
  let precioMaximo = $maxPrice.value || 9999999;

  let filteredClothes = productsToFilter.filter((product) => {
    return product.price >= precioMinimo && product.price <= precioMaximo;
  });

  return filteredClothes;
};

const FILTER_BY_COLOR = (productsToFilter) => {
  let inputValue = $colorSelectInput.value;

  let filteredClothes = productsToFilter.filter((product) =>
    product.color.includes(inputValue)
  );
  return filteredClothes;
};

const FILTER_BY_TYPE = (productsToFilter) => {
  let inputValue = $typeSelectInput.value;

  let filteredClothes = productsToFilter.filter((product) =>
    product.type.includes(inputValue)
  );

  return filteredClothes;
};

const UPDATE_COLOR_FILTERS = () => {
  let productsToFilter = appState.products.flat();
  let typeValue = $typeSelectInput.value;

  if (typeValue !== "all") {
    let filteredProducts = FILTER_BY_TYPE(productsToFilter);

    let allColors = filteredProducts.flatMap((obj) => obj.color);
    //set es una estructura de datos que solo admite datos unicos
    const colors = [...new Set(allColors)];
    RENDER_COLOR_FILTERS(colors);
    return;
  } else {
    AVAIBLE_COLORS();
  }
};
// --------------Funcion que aplica los filtros una vez seleccionados --------------
const APPLY_FILTERS = () => {
  let productsToFilter = appState.products.flat();
  let filteredProducts;

  filteredProducts = FILTER_BY_PRICE(productsToFilter);

  if ($typeSelectInput.value !== "all") {
    filteredProducts = FILTER_BY_TYPE(filteredProducts);
  }

  if ($colorSelectInput.value !== "all") {
    filteredProducts = FILTER_BY_COLOR(filteredProducts);
  }

  appState.isThereAnyFilter = true;
  appState.filteredProducts = DIVIDE_PRODUCTS_PAGINATION(6, filteredProducts);
  appState.currentFilteredProductsIndex = 0;
  appState.filteredProductsLength = appState.filteredProducts.length;
  filteredPaginationLimit = appState.filteredProducts.length;
  RENDER_PRODUCTS(
    appState.filteredProducts[appState.currentFilteredProductsIndex]
  );
};

// --------------Funcion que quita los filtros --------------

const REMOVE_FILTERS = () => {
  $minPrice.value = "";
  $maxPrice.value = "";
  $typeSelectInput.innerHTML = "";
  $typeSelectInput.innerHTML += `<option value="all">Todas las prendas</option>`;
  RENDER_TYPES_FILTER();
  AVAIBLE_COLORS();
  appState.currentProductsIndex = 0;
  appState.isThereAnyFilter = false;
  RENDER_PRODUCTS(appState.products[appState.currentProductsIndex]);
};

// --------------Control del Paginado--------------

const SHOW_LESS_PRODUCTS = () => {
  if (appState.isThereAnyFilter) {
    if (appState.currentFilteredProductsIndex === 0) {
      return;
    }

    appState.currentFilteredProductsIndex -= 1;
    RENDER_PRODUCTS(
      appState.filteredProducts[appState.currentFilteredProductsIndex]
    );
    return;
  }

  if (appState.currentProductsIndex === 0) {
    return;
  }
  appState.currentProductsIndex -= 1;

  RENDER_PRODUCTS(appState.products[appState.currentProductsIndex]);
};

const SHOW_MORE_PRODUCTS = () => {
  if (appState.isThereAnyFilter) {
    if (appState.currentFilteredProductsIndex >= filteredPaginationLimit - 1) {
      return;
    }

    appState.currentFilteredProductsIndex += 1;
    RENDER_PRODUCTS(
      appState.filteredProducts[appState.currentFilteredProductsIndex]
    );
    return;
  }

  if (appState.currentProductsIndex >= paginationLimit - 1) {
    return;
  }
  appState.currentProductsIndex += 1;
  RENDER_PRODUCTS(appState.products[appState.currentProductsIndex]);
};

// -------------- Apertura y Cierre del Carrito de compras --------------

const OPEN_CART = () => {
  $cartContainer.classList.toggle("cartActive");
  $cartFocus.classList.toggle("cartFocusActive");
};
const CLOSE_CART_IF_OUTSIDE = () => {
  $cartContainer.classList.toggle("cartActive");
  $cartFocus.classList.toggle("cartFocusActive");
};
const CLOSE_BURGER_IF_OUTSIDE = (e) => {
  if (!e.target) {
    $burgerContainer.classList.toggle("navContainerActive");
  }
};

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const SAVE_CART = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const createProductTemplate = (cartProduct) => {
  const { price, id, img, description, quantity } = cartProduct;

  return `
    <div class="cartCard">

    <img src="${img}" alt="${img}">
    <div class="cartCard--text">
      <p>${description}</p>
      <p>$${price}</p>

      <div class="item-handler">
        <span class="quantity-handler down" data-id=${id}>-</span>
        <span class="item-quantity">${quantity}</span>
        <span class="quantity-handler up" data-id=${id}>+</span>
        <div class="trashIcon">
          <i class="fa-solid fa-trash" data-id=${id}></i>
        </div>
      </div>

    </div>
  </div>
    `;
};

const RENDER_CART = () => {
  if (!cart.length) {
    return ($cart.innerHTML = `<p>No hay productos en el carrito</p>`);
  } else {
    SHOW_CART_TOTAL();
    DISABLE_CART_BUTTON($emptyCartBtn);
    DISABLE_CART_BUTTON($finishPurchase);
    $updateBubleQuantity.classList.add("hasCartCuantity");
    $carAnimatedIcon.classList.add("replaceAnimatedIcon");
    CART_CUANTITY($updateBubleQuantity);
    CART_CUANTITY($cartTotalCuantity);
    $cart.innerHTML = cart.map(createProductTemplate).join("");
    SAVE_CART();
  }
};

const DISABLE_CART_BUTTON = (btn) => {
  if (!cart.length) {
    btn.classList.add("btnCartDisable");
  } else {
    btn.classList.remove("btnCartDisable");
  }
};

const CART_CUANTITY = (container) => {
  return (container.innerHTML = cart.reduce(
    (acc, cur) => acc + cur.quantity,
    0
  ));
};

const CART_TOTAL_PRICE = () => {
  return cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
};

const SHOW_CART_TOTAL = () => {
  $showCartPrice.innerHTML = `$ ${CART_TOTAL_PRICE()}`;
};

const ADD_PRODUCT_CUANTITY = (product) => {
  return (cart = cart.map((cartProduct) =>
    cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct
  ));
};

const CREATE_CART_PRODUCT = (product) => {
  return (cart = [...cart, { ...product, quantity: 1 }]);
};
const IS_EXISTING_PRODUCT = (product) => {
  return cart.find((item) => item.id === product.id);
};

const ADD_PRODUCT_CART = (e) => {
  if (!e.target.classList.contains("clothingCards__button")) {
    return;
  }

  const product = e.target.dataset;
  if (IS_EXISTING_PRODUCT(product)) {
    ADD_PRODUCT_CUANTITY(product);
    Toastify({
      text: "Se agrego una unidad del Producto al Carrito!",
      className: "info",
      gravity: "bottom",
      style: {
        color: "black",
        background: "rgb(255, 208, 0)",
      },
      duration: "1000",
    }).showToast();
  } else {
    Toastify({
      text: "Se agrego el Producto al Carrito!",
      className: "info",
      gravity: "bottom",
      style: {
        color: "black",
        background: "rgb(255, 208, 0)",
      },
      duration: "1000",
    }).showToast();
    CREATE_CART_PRODUCT(product);
  }

  RENDER_CART();
};

const HANDLE_PLUS_QUANTITY = (id) => {
  const existingProduct = cart.find((item) => item.id === id);
  ADD_PRODUCT_CUANTITY(existingProduct);
};
const HANDLE_MINUS_QUANTITY = (id) => {
  const existingProduct = cart.find((item) => item.id === id);
  if (existingProduct.quantity === 1) {
    if (
      window.confirm("¿Esta seguro que desea eliminar el producto del carrito?")
    ) {
      cart = cart.filter((product) => product.id !== existingProduct.id);
      DISABLE_CART_BUTTON($emptyCartBtn);
      DISABLE_CART_BUTTON($finishPurchase);
      $updateBubleQuantity.classList.remove("hasCartCuantity");
      $carAnimatedIcon.classList.remove("replaceAnimatedIcon");
      $cartTotalCuantity.innerHTML = `---`;
      $showCartPrice.innerHTML = `---`;

      RENDER_CART();
    } else {
      return;
    }

    return;
  }
  SUBSTRACT_PRODUCT(existingProduct);
};

const SUBSTRACT_PRODUCT = (existingProduct) => {
  cart = cart.map((product) => {
    return product.id === existingProduct.id
      ? { ...product, quantity: product.quantity - 1 }
      : product;
  });
};
const DELETE_PRODUCT = (id) => {
  const existingProduct = cart.find((item) => item.id === id);
  if (
    window.confirm("¿Esta seguro que desea eliminar el producto del carrito?")
  ) {
    cart = cart.filter((product) => product.id !== existingProduct.id);
    DISABLE_CART_BUTTON($emptyCartBtn);
    DISABLE_CART_BUTTON($finishPurchase);
    $updateBubleQuantity.classList.remove("hasCartCuantity");
    $carAnimatedIcon.classList.remove("replaceAnimatedIcon");
    $cartTotalCuantity.innerHTML = `---`;
    $showCartPrice.innerHTML = `---`;

    RENDER_CART();
  } else {
    return;
  }
};

const CART_HANDLE_CUANTITY = (e) => {
  if (e.target.classList.contains("up")) {
    HANDLE_PLUS_QUANTITY(e.target.dataset.id);
  } else if (e.target.classList.contains("down")) {
    HANDLE_MINUS_QUANTITY(e.target.dataset.id);
  }
  if (e.target.classList.contains("fa-trash")) {
    DELETE_PRODUCT(e.target.dataset.id);
  }
  RENDER_CART();
};

const CLEAN_CART = () => {
  cart = [];
  DISABLE_CART_BUTTON($emptyCartBtn);
  DISABLE_CART_BUTTON($finishPurchase);
  $updateBubleQuantity.classList.remove("hasCartCuantity");
  $carAnimatedIcon.classList.remove("replaceAnimatedIcon");
  $cartTotalCuantity.innerHTML = `---`;
  $showCartPrice.innerHTML = `---`;
  SAVE_CART();
  RENDER_CART();
};
const EMPTY_CART = () => {
  if (!cart.length) {
    return;
  }
  if (
    window.confirm("¿Estas seguro que deseas vaciar el carrito de compras?")
  ) {
    CLEAN_CART();
  } else {
    return;
  }
};

const BUY_CART = () => {
  if (!cart.length) {
    return;
  }
  if (window.confirm("¿Estas seguro que deseas realizar la compra?")) {
    CLEAN_CART();
    alert(
      "¡Compra realizada con exito!, te llevaremos nuevamente al inicio =)"
    );
    setTimeout(() => {
      window.location.href = "/index.html";
    }, 1000);
  } else {
    return;
  }
};

const ON_LOAD_PAGE = () => {
  DISABLE_CART_BUTTON($emptyCartBtn);
  DISABLE_CART_BUTTON($finishPurchase);
};

// -------------- Inicio de Sesion --------------

const users = JSON.parse(localStorage.getItem("users")) || [];

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
const LOGGOUT = (e) => {
  if (e.target.classList.contains("loggOut")) {
    if (window.confirm("Estas seguro que deseas salir?")) {
      setTimeout(() => {
        sessionStorage.removeItem("activeUser");
        location.reload();
      }, 1000);
    } else {
      return;
    }
  }
};

const CHECK_IF_LOGGIN_EMPTY = (input) => {
  return !input.value.trim().length;
};

const CHECK_EXISTING_LOGGIN_USERNAME = (input) => {
  return users.some((user) => user.userName === input.value.trim());
};
const CHECK_IS_MATCHING_PASSWORD = (input) => {
  const user = users.find(
    (user) => user.userName === $logginUsername.value.trim()
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
    SHOW_LOGGIN_ERROR(
      input,
      "La contraseña ingresada no es valida",
      formFieldSmall
    );
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
    const user = users.find(
      (user) => user.userName === $logginUsername.value.trim()
    );
    sessionStorage.setItem("activeUser", JSON.stringify(user));
    alert("Has iniciado sesion correctamente =)");
    setTimeout(() => {
      location.reload();
    }, 1000);
    return;
  }
};
const activeUser = sessionStorage.activeUser
  ? JSON.parse(sessionStorage.activeUser)
  : false;

const IS_ACTIVE_USER = () => {
  if (activeUser) {
    $burgerRegister.classList.toggle("isLoggedIn");
    $logginSesion_li.innerHTML = `<h3>${activeUser.userName}</h3>   <span class="loggOut" > Salir <i class="fa fa-sign-out" aria-hidden="true"></i></span>`;
    $sesionContainer.innerHTML = `<h3>${activeUser.userName}</h3>   <span class="loggOut" > Salir <i class="fa fa-sign-out" aria-hidden="true"></i></span>`;
    return;
  } else {
    $logginSesion_li.innerHTML = `<a href="#" class="openLoggin" id="openLogginBurger">¡INICIAR SESION!</a>`;
    $sesionContainer.innerHTML = `
   <div data-tooltip="¡INICIAR SESION!" data-flow="bottom" class="loggin-register openLoggin" id="openLoggin">
   <img  src="/assets/headerAssets/logginIcon.svg" class="openLoggin" alt="" />
   </div>

   <a href="/htmls/loggin/register.html">
   <div data-tooltip="No estas registrado? ¡Registrate!" data-flow="bottom" class="loggin-register">
     <img src="/assets/headerAssets/registerIcon.svg" alt="" />
   </div>
 </a>

   `;
  }
};

// -------------- Funcion Inicializadora --------------

const init = () => {
  // --------------Renderizado Inicial--------------
  RENDER_PRODUCTS(appState.products[0]);
  // --------------Renderizado de los filtros de colores--------------
  AVAIBLE_COLORS();
  RENDER_TYPES_FILTER();
  $typeSelectInput.addEventListener("change", UPDATE_COLOR_FILTERS);
  // --------------Aplicar filtros o quitarlos--------------
  $applyFilters.addEventListener("click", APPLY_FILTERS);
  $removeFilters.addEventListener("click", REMOVE_FILTERS);
  // -------------- Paginacion --------------
  $paginationNext.addEventListener("click", SHOW_MORE_PRODUCTS);
  $paginationPrev.addEventListener("click", SHOW_LESS_PRODUCTS);
  // -------------- Menu Hamburgesa --------------
  $openBurger.addEventListener("click", OPEN_BURGER);
  $closeBurger.addEventListener("click", CLOSE_BURGER);
  // -------------- Carrito de Compras --------------
  document.addEventListener("DOMContentLoaded", RENDER_CART);
  $cartContainer.addEventListener("click", CLOSE_BURGER_IF_OUTSIDE);
  $cartOpener.addEventListener("click", OPEN_CART);
  $cartFocus.addEventListener("click", CLOSE_CART_IF_OUTSIDE);
  $cardContainer.addEventListener("click", ADD_PRODUCT_CART);
  $cart.addEventListener("click", CART_HANDLE_CUANTITY);
  document.addEventListener("DOMContentLoaded", ON_LOAD_PAGE);
  $emptyCartBtn.addEventListener("click", EMPTY_CART);
  $finishPurchase.addEventListener("click", BUY_CART);
  // -------------- Inicio de sesion --------------
  $closeLoggin.addEventListener("click", CLOSE_LOGGIN);
  $sesionContainer.addEventListener("click", OPEN_LOGGIN);
  $logginSesion_li.addEventListener("click", OPEN_LOGGIN);
  $sesionContainer.addEventListener("click", LOGGOUT);
  $logginSesion_li.addEventListener("click", LOGGOUT);
  $logginSecition.addEventListener("click", CLOSE_LOGGIN_IF_OUTSIDE);
  $logginForm.addEventListener("submit", LOGGIN);
  IS_ACTIVE_USER();
};

init();
