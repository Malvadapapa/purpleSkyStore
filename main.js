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

/* //variable del contenedor del renderizado de productos
const $cardContainer = document.getElementById("cardRenderContainer");
 */
////////////////APERTURA Y CIERRE DEL MENU////////////////
////////////////HAMBURGUESA////////////////

const OPEN_BURGER = () => {
  $burgerContainer.classList.toggle("navContainerActive");
};

const CLOSE_BURGER = () => {
  $burgerContainer.classList.toggle("navContainerActive");
};

const OPEN_CART = () => {
  console.log("holi");
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
/* 
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
 */
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


let swiper = new Swiper(".mySwiper", {
    spaceBetween: 0,
    centeredSlides: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    }
  });

const init = () => {
  //menu hamburguesa
  $openBurger.addEventListener("click", OPEN_BURGER);
  $closeBurger.addEventListener("click", CLOSE_BURGER);
  //variables del carrito
  $cartContainer.addEventListener("click", CLOSE_BURGER_IF_OUTSIDE);
  $cartOpener.addEventListener("click", OPEN_CART);
  $cartFocus.addEventListener("click", CLOSE_CART_IF_OUTSIDE);
  document.addEventListener("DOMContentLoaded", RENDER_CART);
  /*     $cardContainer.addEventListener("click", ADD_PRODUCT_CART); */
  $cart.addEventListener("click", CART_HANDLE_CUANTITY);

  document.addEventListener("DOMContentLoaded", ON_LOAD_PAGE);

  $emptyCartBtn.addEventListener("click", EMPTY_CART);
  $finishPurchase.addEventListener("click", BUY_CART);
};

init();
