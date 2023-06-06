const menu = document.querySelector('.menu');
const deskMenu = document.querySelector('.DeskMen');

const mobileMenu =document.querySelector('.sidebar-menu');
const sideDesk = document.querySelector ('.desktop-menu');

const main = document.querySelector('.main');

console.log('hola');

menu.addEventListener('click', menuMobile);
deskMenu.addEventListener('click', desktopMenu);

function menuMobile(){
    const isMainClose = main.classList.contains('inactive')
    const isDeskMenClose = sideDesk.classList.contains('inactive')
    if(!isDeskMenClose){
        sideDesk.classList.add('inactive')
    }
    if(!isMainClose){
       main.classList.add('inactive')
    } else {
        main.classList.remove('inactive')
    }
    mobileMenu.classList.toggle('inactive');
}
function desktopMenu (){
    const isMainClose = main.classList.contains('inactive')
    if(isMainClose){
        main.classList.remove('inactive')
    }
    sideDesk.classList.toggle('inactive');
}
