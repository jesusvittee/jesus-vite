const menu = document.querySelector('.menu');
const deskMenu = document.querySelector('.DeskMen');

const mobileMenu = document.querySelector('.sidebar-menu');
const sideDesk = document.querySelector('.desktop-menu');

const main = document.querySelector('.main');

console.log('hola');

// Solo agrega listener si el elemento existe
if(menu){
    menu.addEventListener('click', menuMobile);
}

if(deskMenu){
    deskMenu.addEventListener('click', desktopMenu);
}

// Theme toggle seguro
const themeButton = document.getElementById("theme-toggle");
if(themeButton){
    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
    });
}

function menuMobile(){

    const isMainClose = main.classList.contains('inactive');
    const isDeskMenClose = sideDesk.classList.contains('inactive');

    if(!isDeskMenClose){
        sideDesk.classList.add('inactive');
    }

    if(!isMainClose){
        main.classList.add('inactive');
    } else {
        main.classList.remove('inactive');
    }

    if(mobileMenu) mobileMenu.classList.toggle('inactive');
}

function desktopMenu(){

    const isMainClose = main.classList.contains('inactive');

    if(isMainClose){
        main.classList.remove('inactive');
    }

    if(sideDesk) sideDesk.classList.toggle('inactive');
}

// Scroll suave para los links del header
document.querySelectorAll('.nav-header a').forEach(link => {
    link.addEventListener('click', function(e){
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        if(targetSection){
            window.scrollTo({
                top: targetSection.offsetTop - 80, // ajusta para header fijo
                behavior: 'smooth'
            });
        }
    });
});