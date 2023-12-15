//   __^__                                      __^__
//  ( ___ )------------------------------------( ___ )
//   | / |                                      | \ |
//   | / |          VARIABLES DEL DOM           | \ |
//   |___|                                      |___|
//  (_____)------------------------------------(_____)

//variables pertenecientes al menu hamburguesa
const $burgerContainer = document.querySelector(".navContainer");
const $closeBurger = document.getElementById("exitBurger");
const $openBurger = document.getElementById("burgerOpener");

//variables pertenecientes al carrito de compras
const $cartContainer = document.getElementById("cartMainContainer");
const $cart = document.querySelector(".cartCards__Container");

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

 

//   __^__                                      __^__
//  ( ___ )------------------------------------( ___ )
//   | / |                                      | \ |
//   | / |    FETCH AL OBJETO DE PRODUCTOS      | \ |
//   |___|                                      |___|
//  (_____)------------------------------------(_____)

const fetchProducts = async () => {
  const url = "/productos.json";
  try {
    let response = await fetch(url);
    let data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

const products = await fetchProducts();

//   __^__                                      __^__
//  ( ___ )------------------------------------( ___ )
//   | / |      APERTURA Y CIERRE DEL MENU      | \ |
//   |   |           HAMBURGUESA                |   |
//   |___|                                      |___|
//  (_____)------------------------------------(_____)

const OPEN_BURGER = () => {
  $burgerContainer.classList.toggle("navContainerActive");
};

const CLOSE_BURGER = () => {
  $burgerContainer.classList.toggle("navContainerActive");
};
 

//   __^__                                      __^__
//  ( ___ )------------------------------------( ___ )
//   | / |                                      | \ |
//   |   |     --RENDERIZADO DE PRODUCTOS--     |   |
//   |___|                                      |___|
//  (_____)------------------------------------(_____)

const RENDER_PRODUCTS = async (data) => {
  let ropaHombre = await data;

  if (ropaHombre.length === 0) {
    return ($cardContainer.innerHTML = `
    <h3>No se encontro ropa con dichas caracteristicas</h3>
     `);
  }

  $cardContainer.innerHTML = ropaHombre
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
     <a href="#" class="clothingCards__button"> 
      VER MAS 
      </a>    
           
         </span>
       </div>
     </div>
   
   `;
    })
    .join("");
};

//   __^__                                      __^__
//  ( ___ )------------------------------------( ___ )
//   | / |                                      | \ |
//   |   |             -- PAGINADO--            |   |
//   |___|                                      |___|
//  (_____)------------------------------------(_____)

// funcion que divide los productos de hombre una vez traidos para paginar
const DIVIDE_PRODUCTS_PAGINATION = async (size, data) => {
  const ropa = await data;
  let productsArray = [];

  for (let i = 0; i < ropa.length; i += size) {
    productsArray.push(ropa.slice(i, i + size));
  }
  return productsArray;
};

//   __^__                                      __^__
//  ( ___ )------------------------------------( ___ )
//   | / |                                      | \ |
//   |   |             -- APPSTATE--            |   |
//   |___|                                      |___|
//  (_____)------------------------------------(_____)
 
//el objeto appstate controla variables centrales de la aplicacion, por ejemplo el numero de productos por array de paginacion,
// la posicion actual en la paginacion, en la que esta el usuario, etc
const appState = {
  products: await DIVIDE_PRODUCTS_PAGINATION(6, products[0].man),
  currentProductsIndex: 0,
  productsLength: await DIVIDE_PRODUCTS_PAGINATION(6, products[0].man).length,
};


//   __^__                                      __^__
//  ( ___ )------------------------------------( ___ )
//   | / |                                      | \ |
//   |   | -- RENDERIZADO DE FILTROS DE ROPA--  |   |
//   |___|                                      |___|
//  (_____)------------------------------------(_____)


//funcion que toma los productos del appstate aplanando los arrays paginados y filtra los tipos de ropa disponibles
const AVAIBLE_TYPES = async () => {
  let mapedTypes = appState.products.flatMap((arrayDeObjetos) =>
    arrayDeObjetos.map((objeto) => objeto.type)
  );
  const uniqueTypes = [...new Set(mapedTypes)];
  return uniqueTypes;
};

//funcion que renderiza los filtros de tipos de prenda
const RENDER_TYPES_FILTER = async () => {
  let arrayDeTipos = await AVAIBLE_TYPES();
  return arrayDeTipos.forEach((type) => {
    $typeSelectInput.innerHTML += `
    <option value="${type}">${type}</option>
    `;
  });
};

//funcion que renderiza los filtros de colores
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
//funcion que itera los productos aplanando los array de colores y agregando un unico color de cada auno al tipo de dato set
const AVAIBLE_COLORS = () => {
  let allColors = appState.products.flatMap((arrayDeColores) =>
    arrayDeColores.flatMap((obj) => obj.color)
  );
  //set es una estructura de datos que solo admite datos unicos
  const uniqueColors = [...new Set(allColors)];

  RENDER_COLOR_FILTERS(uniqueColors);
};


//   __^__                                      __^__
//  ( ___ )------------------------------------( ___ )
//   | / |                                      | \ |
//   |   |        --FILTROS DE ROPA--           |   |
//   |___|                                      |___|
//  (_____)------------------------------------(_____)


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

//funcion que filtra los colores disponibles cada vez que se cambia el valor del filtro de tipo,
//para que no esten disponibles todos y no haya error en el renderizado
const UPDATE_COLOR_FILTERS = () => {
  let productsToFilter = appState.products.flat();
  let typeValue = $typeSelectInput.value;

  if (typeValue !== "all") {
    let filteredProducts = FILTER_BY_TYPE(productsToFilter);
    console.log(filteredProducts);
    let allColors = filteredProducts.flatMap((obj) => obj.color);
    //set es una estructura de datos que solo admite datos unicos
    const colors = [...new Set(allColors)];
    RENDER_COLOR_FILTERS(colors);
    console.log(VideoColorSpace);
    return;
  } else {
    AVAIBLE_COLORS();
  }
};

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
  RENDER_PRODUCTS(filteredProducts);
};

const SHOW_LESS_PRODUCTS = () => {
  if (appState.currentProductsIndex !== 0) {
    appState.currentProductsIndex -= 1;
    $paginationNext.classList.remove("paginationButtonDissabled");
  } else {
    $paginationNext.classList.remove("paginationButtonDissabled");
    $paginationPrev.classList.add("paginationButtonDissabled");
    return;
  }

  const { products, currentProductsIndex } = appState;

  if (currentProductsIndex >= 0) {
    RENDER_PRODUCTS(products[currentProductsIndex]);
  }
};

const SHOW_MORE_PRODUCTS = () => {
  const { products, currentProductsIndex } = appState;

  if (appState.currentProductsIndex === products.length) {
    $paginationNext.classList.add("paginationButtonDissabled");
  } else if (appState.currentProductsIndex !== products.length) {
    appState.currentProductsIndex += 1;
    $paginationPrev.classList.remove("paginationButtonDissabled");
    RENDER_PRODUCTS(products[currentProductsIndex]);
  }
};

//FUNCIONES QUE MANEJAN LA APERTURA Y CIERRE DEL CARRITO
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

let cart = [];

const ADD_PRODUCT_CART = (e) => {
  if (!e.target.classList.contains("clothingCards__button")) {
    return;
  }
  RENDER_CART();
  const product = e.target.dataset;
  if (IS_EXISTING_PRODUCT(product)) {
    cart = cart.map((cartProduct) =>
      cartProduct.id === product.id
        ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
        : cartProduct
    );
  } else {
    CREATE_CART_PRODUCT(product);
  }
};
const IS_EXISTING_PRODUCT = (product) => {
  return cart.find((item) => item.id === product.id);
};

const CREATE_CART_PRODUCT = (product) => {
  return (cart = [...cart, { ...product, quantity: 1 }]);
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
        <span class="quantity-handler down">-</span>
        <span class="item-quantity">${quantity}</span>
        <span class="quantity-handler up">+</span>
        <div class="trashIcon">
          <i class="fa-solid fa-trash"></i>
        </div>
      </div>

    </div>
  </div>
    `;
};

const RENDER_CART = () => {
  if (!cart.length) {
    return ($cart.innerHTML = `<p>No hay ningun producto en el carrito</p>`);
  } else {
    $cart.innerHTML = cart.map(createProductTemplate).join("");
  }
};









const init = () => {
  //funcion que renderiza los productos al cargar la pagina inicialmente, sin filtros aplicados con la paginacion en 0
  RENDER_PRODUCTS(appState.products[0]);

  // funcion que renderiza los select de colores en los filtros del dom
  AVAIBLE_COLORS();
  RENDER_TYPES_FILTER();

  $applyFilters.addEventListener("click", APPLY_FILTERS);

  $typeSelectInput.addEventListener("change", UPDATE_COLOR_FILTERS);

  //botones de paginacion
  $paginationNext.addEventListener("click", SHOW_MORE_PRODUCTS);
  $paginationPrev.addEventListener("click", SHOW_LESS_PRODUCTS);

  //deshabilito el boton de pag prev al renderizar la pagina
  $paginationPrev.classList.add("paginationButtonDissabled");

  //menu hamburguesa
  $openBurger.addEventListener("click", OPEN_BURGER);
  $closeBurger.addEventListener("click", CLOSE_BURGER);

  document.addEventListener("DOMContentLoaded", RENDER_CART);
  $cartContainer.addEventListener("click", CLOSE_BURGER_IF_OUTSIDE);
  $cartOpener.addEventListener("click", OPEN_CART);
  $cartFocus.addEventListener("click", CLOSE_CART_IF_OUTSIDE);

  $cardContainer.addEventListener("click", ADD_PRODUCT_CART);
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMContentLoaded se ha disparado");
  });
};

init();
