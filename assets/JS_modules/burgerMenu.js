//variables pertenecientes al menu hamburguesa
const $burgerContainer = document.querySelector('.navContainer')
const $closeBurger = document.getElementById('exitBurger')
const $openBurger = document.getElementById('burgerOpener')


const OPEN_BURGER = () => {
    $burgerContainer.classList.toggle('navContainerActive')
}

const CLOSE_BURGER = () => {
    $burgerContainer.classList.toggle('navContainerActive')
}


//TERMINAR, AVERIGUAR COMO LOGGEAR EL EVENTI.TARGET
const CLOSE_BURGER_IF_OUTSIDE = (e) => {
    if (!e.target) {
        $burgerContainer.classList.toggle('navContainerActive')
    }

}
export { $burgerContainer, $closeBurger, $openBurger, CLOSE_BURGER_IF_OUTSIDE, CLOSE_BURGER, OPEN_BURGER }