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
/* Añadir proyectos nuevos */
const proyectos = [
{
    nombre: "Todo List",
    imagen: "./proyectos/img/todo.png",
    descripcion: "Aplicación web para crear, buscar, completar y eliminar tareas utilizando React.",
    github: "https://github.com/jesusvittee/todo-list-react",
    web: "https://jesusvittee.github.io/todo-list-react/",
    tecnologias: ["React", "JavaScript", "CSS", "HTML", "Local Storage"]
},

{
    nombre: "Platzi Travel",
    imagen: "./proyectos/img/travel.png",
    descripcion: "Página web de destinos turísticos creada utilizando TailwindCSS con diseño Mobile First.",
    github: "https://github.com/jesusvittee/platzi-travel",
    web: "https://jesusvittee.github.io/platzi-travel/public/",
    tecnologias: ["TailwindCSS", "JavaScript", "HTML", "CSS"]
},

{
    nombre: "Shopi",
    imagen: "./proyectos/img/shopi.png",
    descripcion: "Tienda online desarrollada con React, Vite y TailwindCSS.",
    github: "https://github.com/jesusvittee/shopi",
    web: "https://jesusvittee.github.io/shopi/",
    tecnologias: ["React", "Vite", "TailwindCSS", "React Router"]
}
];
const contenedor = document.getElementById("lista-proyectos");

proyectos.forEach(proyecto => {

    const tecnologias = proyecto.tecnologias
        .map(tec => `<li>${tec}</li>`)
        .join("");

    const html = `
    <div class="proyecto">

        <figure class="proyecto-contenedor__img">
            <img class="proyecto-img" src="${proyecto.imagen}" alt="${proyecto.nombre}">
        </figure>

        <div class="proyecto-informacion">

            <h4>${proyecto.nombre}</h4>

            <div class="proyecto-links">

                <a href="${proyecto.github}" class="link-proyecto" target="_blank">
                    Código
                </a>

                <a href="${proyecto.web}" class="link-proyecto" target="_blank">
                    Demo
                </a>

            </div>

            <p class="proyecto-texto">
                ${proyecto.descripcion}
            </p>

            <ul>
                ${tecnologias}
            </ul>

        </div>

    </div>
    `;

    contenedor.innerHTML += html;

});