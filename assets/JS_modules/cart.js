//variables pertenecientes al carrito de compras 
const $cartContainer = document.getElementById('cartMainContainer')
const $cartOpener = document.querySelector('.CartBtn')
const $cartFocus = document.querySelector('.cartFocus')


//FUNCIONES QUE MANEJAN LA APERTURA Y CIERRE DEL CARRITO 
const OPEN_CART = () => {
    $cartContainer.classList.toggle('cartActive')
    $cartFocus.classList.toggle('cartFocusActive')
}
const CLOSE_CART_IF_OUTSIDE = () => {
    $cartContainer.classList.toggle('cartActive')
    $cartFocus.classList.toggle('cartFocusActive')
}




export { $cartContainer, $cartOpener, $cartFocus, OPEN_CART, CLOSE_CART_IF_OUTSIDE }