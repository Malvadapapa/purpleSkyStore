import { productsData } from "../../products.js";

//variables pertenecientes al menu hamburguesa
const $burgerContainer = document.querySelector(".navContainer");
const $closeBurger = document.getElementById("exitBurger");
const $openBurger = document.getElementById("burgerOpener");

const $closeLoggin = document.getElementById("closeLoggin");
const $logginSecition = document.getElementById("logginSection");
const $logginUsername = document.getElementById("logginUsername");
const $logginPassword = document.getElementById("logginPassword");
const $logginForm = document.getElementById("logginForm");
const $burgerRegister = document.getElementById("burgerRegister");
const $logginSesion_li = document.getElementById("logginSesion_li");
const $sesionContainer = document.getElementById("sesionContainer");

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

const $skateRenderSection = document.getElementById("skateRenderSection");
const $newsSliderContainer = document.getElementById("newsSliderContainer");
//variables del modal de resumen de compra
const $productsDialogSumary = document.getElementById('productsDialogSumary')
const $sumarydialogContainer = document.getElementById('sumarydialogContainer')
const $TotalDialogPrice = document.getElementById('TotalDialogPrice')
const $cancelPurchase = document.getElementById('cancelPurchase')
const $yesFinishPurchase = document.getElementById('yesFinishPurchase')
////////////////APERTURA Y CIERRE DEL MENU////////////////
////////////////HAMBURGUESA////////////////

const OPEN_BURGER = () => {
  $burgerContainer.classList.toggle("navContainerActive");
};

const CLOSE_BURGER = () => {
  $burgerContainer.classList.toggle("navContainerActive");
};

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

const CANCEL_PURCHASE = ()=> {
  if (window.confirm('¿Quieres eliminar tu carrito de compras tambien? ๏̯͡๏﴿ ')) {
    CLEAN_CART();
    $productsDialogSumary.close();
    return
  } else {
    $productsDialogSumary.close();
    return
  }

}
const FINISH_PURCHASE = () => {
  $productsDialogSumary.close();
  CLEAN_CART();
  alert(
    "¡Estamos muy felices por tu compra!  (っ◕‿◕)っ  te llevaremos nuevamente al inicio"
  );
  setTimeout(() => {
    window.location.href = "/index.html";
  }, 1000);
}


const BUY_CART = () => {
  if (!cart.length) {
    return;
  }
  OPEN_CART()
  $sumarydialogContainer.innerHTML = cart.map( product => {
    let {description, price, quantity} = product;
    return`
    <span>
  ${quantity}u de ${description}----- $ ${price*quantity}
    </span>
    `}).join(' ')

  $productsDialogSumary.showModal();
  $TotalDialogPrice.innerHTML = `$ ${CART_TOTAL_PRICE()}`
};

const ON_LOAD_PAGE = () => {
  DISABLE_CART_BUTTON($emptyCartBtn);
  DISABLE_CART_BUTTON($finishPurchase);
  GET_RANDOM_SKATE_OBJETS(productsData["skateboarding"]);

  let swiper = new Swiper(".mySwiper", {
    spaceBetween: 0,
    centeredSlides: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  let swiper2 = new Swiper(".sliderSkate", {
    loop: true,
    centeredSlides: true,
    zoom: true,
    autoplay: {
      //autoplay
      delay: 3000,
    },
    pagination: {
      //pagination(dots)
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  let swiper3 = new Swiper(".indexCardsSwiper", {
    centeredSlides: true,
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      //autoplay
      delay: 3000,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      860: {
        slidesPerView: 3,
        spaceBetween: 35,
      },
      1224: {
        slidesPerView: 4,
        spaceBetween: 45,
      },
      1800: {
        slidesPerView: 5,
        spaceBetween: 50,
      },
    },
  });
};

//----------INICIO DE SESION ----------//
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
  /*   RESET_FORM($logginPassword, formFieldSmall);
  $logginForm.reset(); */
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
     <img src="assets/headerAssets/registerIcon.svg" alt="" />
   </div>
 </a>

   `;
  }
};

// -------------- Renderizado de objetos de Skate en el Index --------------

const RENDER_RANDOM_SKATE_ITEMS = (array) => {
  const selectedProductCategory = "skateboarding";
  return ($skateRenderSection.innerHTML = `
  ${array
    .map((product) => {
      const { id, img, description, price, discountType } = product;
      return `
    <div class="skateContainer">
    <div class="swiper sliderSkate">
      <div class="swiper-wrapper ">
        <div class="swiper-slide"><img src="${img[0]}"></div>
        <div class="swiper-slide"><img src="${img[1]}"></div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <div class="skateContainer_description">
      <span class="skateContainer_description__txtWrapper">
        <h4>${description}</h4>
        <p>$ ${price}</p>
        <img src="assets/indexClothing/creditCardsA.png" alt="" class="creditCards">
        <img src="assets/indexClothing/creditCardsB.png" alt="" class="creditCards">
      </span>

      <span class="skateContainer_description__btnWrapper">
        <button class="clothingCards__button addToCart" data-id="${id}" data-description="${description}"
          data-price="${price}" data-img="${img[0]}">AGREGAR AL CARRITO</button>

        <a href="./htmls/renderSeeMore/renderSeeMore.html?id=${id}&category=${selectedProductCategory}"
          class="seeMore_btn">
          VER MAS
        </a>


      </span>


    </div>
  </div>
    
    
    
    
    
    
    
    
    `;
    })
    .join("")}
  `);
};
const GET_RANDOM_SKATE_OBJETS = (array) => {
  const obtenerIndiceAleatorio = (max) => Math.floor(Math.random() * max);
  const [indice1, indice2] = [
    obtenerIndiceAleatorio(array.length),
    obtenerIndiceAleatorio(array.length - 1),
  ];
  const segundoIndiceAjustado = indice2 >= indice1 ? indice2 + 1 : indice2;
  let randomArray = [array[indice1], array[segundoIndiceAjustado]];

  return RENDER_RANDOM_SKATE_ITEMS(randomArray);
};

const GET_RANDOM_NUMBER = () => {
  return Math.random() - 0.5;
};

const RENDER_PRIORITY_ENTRIES = (products) => {
  return ($newsSliderContainer.innerHTML = products.map((objet) => {
    const { id, img, description, price, discountType, origin } = objet;

    return `
 <div class="swiper-slide">
 <div class="clothingCards">
   <img src="${img[0]}" alt="${description}">
   <div class="clothingCards_div">
    <p>${description}</p>
    <p>$${price}</p>
    <p>${discountType}</p>
    <span>
      <button class="clothingCards__button addToCart" data-id="${id}" data-description="${description}" data-price="${price}" data-img="${img[0]}">AGREGAR AL CARRITO</button>
<a href="/htmls/renderSeeMore/renderSeeMore.html?id=${id}&amp;category=${origin}" class="seeMore_btn"> 
 VER MAS 
 </a>    
      
    </span>
  </div>
</div>
</div>

  `;
  }));
};

const allProducts = Object.values(productsData).flat();

const priorityCards = allProducts.filter((objeto) => objeto.priority === true);

const randomEntries = priorityCards.sort(GET_RANDOM_NUMBER);

const firstEightEntries = randomEntries.slice(0, 12);

console.log(firstEightEntries);

const FIND_KEY_BY_ID = (id) => {
  for (const key in productsData) {
    const found = productsData[key].find((producto) => producto.id === id);
    if (found) {
      return key;
    }
  }
};

const PRODUCTS_WHIT_ORIGIN = firstEightEntries.map((product) => {
  const key = FIND_KEY_BY_ID(product.id);
  const origin = key ? key : "unkonwOrigin";
  return { ...product, origin };

});

console.log(PRODUCTS_WHIT_ORIGIN);

const init = () => {
  
 RENDER_PRIORITY_ENTRIES(PRODUCTS_WHIT_ORIGIN)
  //menu hamburguesa
  $openBurger.addEventListener("click", OPEN_BURGER);
  $closeBurger.addEventListener("click", CLOSE_BURGER);
  //variables del carrito
  $cartContainer.addEventListener("click", CLOSE_BURGER_IF_OUTSIDE);
  $cartOpener.addEventListener("click", OPEN_CART);
  $cartFocus.addEventListener("click", CLOSE_CART_IF_OUTSIDE);
  document.addEventListener("DOMContentLoaded", RENDER_CART);
  document.body.addEventListener('click', ADD_PRODUCT_CART);
  /*     $cardContainer.addEventListener("click", ADD_PRODUCT_CART); */
  $cart.addEventListener("click", CART_HANDLE_CUANTITY);

  document.addEventListener("DOMContentLoaded", ON_LOAD_PAGE);

  $emptyCartBtn.addEventListener("click", EMPTY_CART);
  $finishPurchase.addEventListener("click", BUY_CART);

  $closeLoggin.addEventListener("click", CLOSE_LOGGIN);

  $sesionContainer.addEventListener("click", OPEN_LOGGIN);
  $logginSesion_li.addEventListener("click", OPEN_LOGGIN);

  $sesionContainer.addEventListener("click", LOGGOUT);
  $logginSesion_li.addEventListener("click", LOGGOUT);

  $logginSecition.addEventListener("click", CLOSE_LOGGIN_IF_OUTSIDE);

  $logginForm.addEventListener("submit", LOGGIN);
  IS_ACTIVE_USER();
// -------------- Listeners del modal de resumen de compra --------------
  $cancelPurchase.addEventListener('click', CANCEL_PURCHASE)
  $yesFinishPurchase.addEventListener('click', FINISH_PURCHASE)
};

init();
