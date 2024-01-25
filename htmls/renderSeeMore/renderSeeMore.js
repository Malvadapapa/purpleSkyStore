//importacion de la data desde el objeto de productos
import { productsData } from "../../products.js";

//variables pertenecientes al menu hamburguesa
const $burgerContainer = document.querySelector(".navContainer");
const $closeBurger = document.getElementById("exitBurger");
const $openBurger = document.getElementById("burgerOpener");

//variables pertenecientes al carrito de compras
const $cartContainer = document.getElementById("cartMainContainer");
const $cart = document.querySelector(".cartCards__Container");
const $cartOpener = document.querySelector(".CartBtn");
const $cartFocus = document.querySelector(".cartFocus");
const $showCartPrice = document.getElementById("showCartTotal");
const $cartTotalCuantity = document.getElementById("cartLength");
const $updateBubleQuantity = document.getElementById("cuantityCartBuble");
const $carAnimatedIcon = document.querySelector(".IconContainer");
const $emptyCartBtn = document.getElementById("emptyCart");
const $finishPurchase = document.getElementById("completePurchase");

//variables pertenecientes al renderizado del producto seleccionado
const $renderSelectedProductContainer = document.getElementById(
  "productRenderContainer"
);
const $suggestedProductContainer = document.getElementById(
  "suggestedProductsContainer"
);
//variables del loggin
const $closeLoggin = document.getElementById("closeLoggin");
const $logginSecition = document.getElementById("logginSection");
const $logginUsername = document.getElementById("logginUsername");
const $logginPassword = document.getElementById("logginPassword");
const $logginForm = document.getElementById("logginForm");
const $burgerRegister = document.getElementById("burgerRegister");
const $logginSesion_li = document.getElementById("logginSesion_li");
const $sesionContainer = document.getElementById("sesionContainer");

//variables del modal de resumen de compra
const $productsDialogSumary = document.getElementById("productsDialogSumary");
const $sumarydialogContainer = document.getElementById("sumarydialogContainer");
const $TotalDialogPrice = document.getElementById("TotalDialogPrice");
const $cancelPurchase = document.getElementById("cancelPurchase");
const $yesFinishPurchase = document.getElementById("yesFinishPurchase");
//---------------------------------------------------------------------------

// --------------Menu Hamburguesa--------------
const OPEN_BURGER = () => {
  $burgerContainer.classList.toggle("navContainerActive");
};

const CLOSE_BURGER = () => {
  $burgerContainer.classList.toggle("navContainerActive");
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

const DISABLE_CART_BUTTON = (btn) => {
  if (!cart.length) {
    btn.classList.add("btnCartDisable");
  } else {
    btn.classList.remove("btnCartDisable");
  }
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
  if (!e.target.classList.contains("addToCart")) {
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
  console.log(existingProduct);
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

const CANCEL_PURCHASE = () => {
  if (window.confirm("¿Quieres eliminar tu carrito de compras tambien? ๏̯͡๏﴿ ")) {
    CLEAN_CART();
    $productsDialogSumary.close();
    return;
  } else {
    $productsDialogSumary.close();
    return;
  }
};
const FINISH_PURCHASE = () => {
  $productsDialogSumary.close();

  alert(
    "¡Estamos muy felices por tu compra!  (っ◕‿◕)っ  te llevaremos nuevamente al inicio"
  );
  CLEAN_CART();

  setTimeout(() => {
    window.location.href = "/index.html";
  }, 1000);
};

const BUY_CART = () => {
  if (!cart.length) {
    return;
  }
  OPEN_CART();
  $sumarydialogContainer.innerHTML = cart
    .map((product) => {
      let { description, price, quantity } = product;
      return `
    <span>
  ${quantity}u de ${description}----- $ ${price * quantity}
    </span>
    `;
    })
    .join(" ");

  $productsDialogSumary.showModal();
  $TotalDialogPrice.innerHTML = `$ ${CART_TOTAL_PRICE()}`;
};

const ON_LOAD_PAGE = () => {
  DISABLE_CART_BUTTON($emptyCartBtn);
  DISABLE_CART_BUTTON($finishPurchase);
};

// -------------- Renderizado del Producto Seleccionado --------------
const selectedProductURL = new URLSearchParams(window.location.search);
const selectedProductId = selectedProductURL.get("id");
const selectedProductCategory = selectedProductURL.get("category");

const FIND_SELECTED_PRODUCT = (productsArray) => {
  const selectedProduct = productsArray.find(
    (objeto) => objeto.id === selectedProductId
  );
  return selectedProduct;
};
const FIND_SELECTED_PRODUCT_INCART = (cartProducts) => {
  const selectedProduct =
    cartProducts.find((objeto) => objeto.id === selectedProductId) || undefined;
  return selectedProduct;
};

const selectedProductState = {
  selectedProduct: FIND_SELECTED_PRODUCT(productsData[selectedProductCategory]),
  selectedProductInCart: FIND_SELECTED_PRODUCT_INCART(cart),
  currentQuantityLimit: 0,
};

const RENDER_SELECTED_PRODUCT = (selectedProduct) => {
  const { description, price, discountType, img, color, size, id } =
    selectedProduct;

  return ($renderSelectedProductContainer.innerHTML = `

<div class="productSlider">
<div style="--swiper-navigation-color: #fff; --swiper-pagination-color: #fff" class="swiper mySwiper2">
    <div class="swiper-wrapper">
${img.map((img) => {
  return `
<div class="swiper-slide">
<img src="${img}" />
</div>

`;
})}
    </div>

  </div>
  <hr class="sliderDivisor">
  <div thumbsSlider="" class="swiper mySwiper swiperInferiorCards">
      <div class="swiper-wrapper wraper2 ">
  ${img.map((img) => {
    return `
  <div class="swiper-slide ">
  <img src="${img}" /> </div>`;
  })}
 
      </div>
    </div>

</div>

<div class="productDescription">
<h2>${description}</h2>
<h3 class="descriptionPrice">$ ${price}</h3>
<h3 class="discountDescription">${discountType}</h3>
<img src="../../assets/creditCards.png" alt="" class="creditCards">
<select name="" id="">
${color.map((color) => {
  return `<option value="${color}">${color}</option>`;
})}

</select>

<select name="" id="sizeQuantity">
  ${Object.entries(size[0])
    .map(
      ([key, value]) =>
        `<option value="${value}">Talle "${key}" ${value} unidades Disponibles</option>`
    )
    .join("")}
</select>

<div class="buttonDescriptionContainer">
<button class="clothingCards__button descriptionButton addToCart" 
data-id="${id}" data-description="${description}" data-price="${price}" data-img="${
    img[0]
  }"
>AGREGAR AL CARRITO</button>
<button class="clothingCards__button descriptionButton buyCurrentProduct" >COMPRAR AHORA</button>
</div>
<span>**CONSULTAR MEDIOS DE ENVIO EN EL LOCAL O EN NUESTRAS REDES</span>
</div>
`);
};

// -------------- Configuracion Swipper --------------

const INIT_SWIPPER = () => {
  let swiper = new Swiper(".mySwiper", {
    spaceBetween: 5,
    slidesPerView: 2,
    freeMode: true,
    watchSlidesProgress: true,
  });
  let swiper2 = new Swiper(".mySwiper2", {
    loop: true,
    spaceBetween: 10,
    zoom: true,
    thumbs: {
      swiper: swiper,
    },
  });
};

// -------------- Btn Comprar Ahora --------------

const BUY_PRODUCT = (e) => {
  
  if (!e.target.classList.contains("buyCurrentProduct")) {
    return;
  }
  $sumarydialogContainer.innerHTML = `1u de ${selectedProductState.selectedProduct.description}----- $ ${selectedProductState.selectedProduct.price}`
  $TotalDialogPrice.innerHTML = `$ ${selectedProductState.selectedProduct.price}`;
  $productsDialogSumary.showModal();



/*   if (
    window.confirm(
      `Esta seguro que desea comprar  por $ , se vaciara tu carrito de compras`
    )
  ) {
    CLEAN_CART();
    alert(
      "¡Compra realizada con exito!, te llevaremos nuevamente al inicio =)"
    );
    setTimeout(() => {
      window.location.href = "/index.html";
    }, 1000);
  } */
};

// -------------- Renderizado de productos Sugeridos --------------

const SELECT_RANDOM_ITEMS = (products, quantityOfElements) => {
  const copy = [...products];
  copy.sort(() => Math.random() - 0.5);
  const elementosSeleccionados = copy.slice(0, quantityOfElements);
  return elementosSeleccionados;
};

const randomCardsState = {
  randomCardstoRender: SELECT_RANDOM_ITEMS(
    productsData[selectedProductCategory]
  ),
  quantityOfCards: 4,
};
const selectedRandomItems = SELECT_RANDOM_ITEMS(
  randomCardsState.randomCardstoRender,
  randomCardsState.quantityOfCards
);

const RENDER_SELECTED_CATEGORY = (word) => {
  switch (word.toLowerCase()) {
    case "man":
      return "HOMBRE";
    case "woman":
      return "MUJER";
    case "skateboarding":
      return "SKATEBOARDING";
    case "shoes":
      return "ZAPAS";
    default:
      return "Undefined";
  }
};
const RENDER_SUGGESTED = (arrayProducts) => {
  return ($suggestedProductContainer.innerHTML = `
<hr>
<h3>PRODUCTOS SUGERIDOS PARA ${RENDER_SELECTED_CATEGORY(
    selectedProductCategory
  )}:</h3>
<hr>
<div class="suggestedProducts-cardContainer">
${arrayProducts
  .map((product) => {
    const { id, img, description, price, discountType } = product;
    return ` 
    <div class="clothingCards">
       <img src="${img[0]}" alt="${description}">
       <div class="clothingCards_div">
        <p>${description}</p>
        <p>$${price}</p>
        <p>${discountType}</p>
        <span>
          <button class="clothingCards__button addToCart" 
          data-id="${id}"
       data-description="${description}" data-price="${price}" data-img="${img[0]}">AGREGAR AL CARRITO</button>
    <a href="../renderSeeMore/renderSeeMore.html?id=${id}&category=${selectedProductCategory}" class="seeMore_btn"> 
     VER MAS 
     </a>    
          
        </span>
      </div>
    </div>
  
  `;
  })
  .join("")}
</div>`);
};

// -------------- Inicio de Sesion --------------
const users = JSON.parse(localStorage.getItem("users")) || [];

const OPEN_LOGGIN = (e) => {
  console.log(e.target);
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
  // -------------- Menu Hamburgesa --------------
  $openBurger.addEventListener("click", OPEN_BURGER);
  $closeBurger.addEventListener("click", CLOSE_BURGER);
  // -------------- Renderizado producto seleccionado y cards--------------
  RENDER_SELECTED_PRODUCT(selectedProductState.selectedProduct);
  RENDER_SUGGESTED(selectedRandomItems);
  $suggestedProductContainer.addEventListener("click", ADD_PRODUCT_CART);
  // -------------- Swiper =) --------------
  INIT_SWIPPER();
  // -------------- Carrito de Compras --------------
  $cartContainer.addEventListener("click", CLOSE_BURGER_IF_OUTSIDE);
  $cartOpener.addEventListener("click", OPEN_CART);
  $cartFocus.addEventListener("click", CLOSE_CART_IF_OUTSIDE);
  document.addEventListener("DOMContentLoaded", ON_LOAD_PAGE);
  document.addEventListener("DOMContentLoaded", RENDER_CART);
  $renderSelectedProductContainer.addEventListener("click", ADD_PRODUCT_CART);
  $renderSelectedProductContainer.addEventListener("click", BUY_PRODUCT);
  $cart.addEventListener("click", CART_HANDLE_CUANTITY);
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
  // -------------- Listeners del modal de resumen de compra --------------
  $cancelPurchase.addEventListener("click", CANCEL_PURCHASE);
  $yesFinishPurchase.addEventListener("click", FINISH_PURCHASE);
};
init();
