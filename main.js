import { OPEN_CART, CLOSE_CART_IF_OUTSIDE, $cartOpener, $cartContainer, $cartFocus } from "./assets/JS_modules/cart.js";
import { $closeBurger, $openBurger, OPEN_BURGER, CLOSE_BURGER, CLOSE_BURGER_IF_OUTSIDE } from "./assets/JS_modules/burgerMenu.js"








const init = () => {
    //menu hamburguesa
    $openBurger.addEventListener('click', OPEN_BURGER)
    $closeBurger.addEventListener('click', CLOSE_BURGER)
    //variables del carrito
    $cartContainer.addEventListener('click', CLOSE_BURGER_IF_OUTSIDE)
    $cartOpener.addEventListener('click', OPEN_CART)
    $cartFocus.addEventListener('click', CLOSE_CART_IF_OUTSIDE)


}

init()