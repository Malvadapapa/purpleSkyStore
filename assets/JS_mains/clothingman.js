import { fetchProducts } from "../JS_modules/fetchProducts.js";
import { RENDER_PRODUCTS } from "../JS_modules/renderClothes.js";
import { $closeBurger, $openBurger, OPEN_BURGER, CLOSE_BURGER, CLOSE_BURGER_IF_OUTSIDE } from "/assets/JS_modules/burgerMenu.js"
import { $cartOpener, $cartContainer, $cartFocus, OPEN_CART, CLOSE_CART_IF_OUTSIDE } from "/assets/JS_modules/cart.js";

//funcion que trae los productos de hombre 
const manProducts = async () => {
   let data = await fetchProducts()
let manProducts = data[0].man
return  manProducts
}



const init = () => {
 
//funcion que renderiza las cards en el contenedor
RENDER_PRODUCTS(manProducts().then(res => console.log('holi')))

    //menu hamburguesa
    $openBurger.addEventListener('click', OPEN_BURGER)
    $closeBurger.addEventListener('click', CLOSE_BURGER)
    //variables del carrito
    $cartContainer.addEventListener('click', CLOSE_BURGER_IF_OUTSIDE)
    $cartOpener.addEventListener('click', OPEN_CART)
    $cartFocus.addEventListener('click', CLOSE_CART_IF_OUTSIDE)


}

init()