// ============================================================
// main.js — Lógica principal del portafolio de Jesus Vite
// ============================================================


// ── SELECCIÓN DE ELEMENTOS ───────────────────────────────────

const menu     = document.querySelector('.menu');        // botón menú móvil
const deskMenu = document.querySelector('.DeskMen');     // botón menú desktop

const mobileMenu = document.querySelector('.sidebar-menu'); // panel menú móvil
const sideDesk   = document.querySelector('.desktop-menu'); // panel menú desktop

const main = document.querySelector('.main'); // contenedor principal

console.log('hola');


// ── LISTENERS DE MENÚ ────────────────────────────────────────

// Solo agrega el listener si el elemento existe en el DOM
if (menu) {
    menu.addEventListener('click', menuMobile);
}

if (deskMenu) {
    deskMenu.addEventListener('click', desktopMenu);
}


// ── TEMA CLARO / OSCURO ──────────────────────────────────────

const themeButton = document.getElementById("theme-toggle");

if (themeButton) {
    // Alterna la clase 'light-theme' en el body al hacer click
    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
    });
}


// ── FUNCIONES DE MENÚ ────────────────────────────────────────

/**
 * Abre o cierra el menú móvil (sidebar).
 * Simplemente togglea la clase 'inactive' en el sidebar-menu.
 */
function menuMobile() {
    if (mobileMenu) mobileMenu.classList.toggle('inactive');
}

/**
 * Abre o cierra el menú desktop (reservado para uso futuro).
 */
function desktopMenu() {
    if (sideDesk) sideDesk.classList.toggle('inactive');
}


// ── SCROLL SUAVE ─────────────────────────────────────────────

/**
 * Al hacer click en cualquier link del header de navegación,
 * hace scroll suave hasta la sección correspondiente,
 * descontando la altura del header fijo (80px).
 */
// Scroll suave para links del header y del menú móvil
document.querySelectorAll('.nav-header a, .sidebar-menu a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId      = this.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
        // Cierra el menú móvil si estaba abierto
        if (mobileMenu) mobileMenu.classList.add('inactive');
    });
});


// ── PROYECTOS ────────────────────────────────────────────────

/**
 * Lista de proyectos del portafolio.
 * Cada objeto tiene: nombre, imagen, descripción,
 * enlaces a GitHub y demo, y lista de tecnologías usadas.
 */
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

/**
 * Genera dinámicamente el HTML de cada proyecto
 * y lo inserta en el contenedor #lista-proyectos.
 */
proyectos.forEach(proyecto => {

    // Convierte el array de tecnologías en items de lista HTML
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
                <a href="${proyecto.github}" class="link-proyecto" target="_blank">Código</a>
                <a href="${proyecto.web}"    class="link-proyecto" target="_blank">Demo</a>
            </div>

            <p class="proyecto-texto">${proyecto.descripcion}</p>

            <ul>${tecnologias}</ul>

        </div>
    </div>
    `;

    contenedor.innerHTML += html;
});


// ── DIPLOMAS / CURSOS ─────────────────────────────────────────

/**
 * Clase que representa un curso con su diploma.
 * Genera un elemento <figure> con la imagen del diploma.
 */
class Curso {
    /**
     * @param {string} nombre - Nombre del curso
     * @param {string} imagen - Ruta a la imagen del diploma
     */
    constructor(nombre, imagen) {
        this.nombre = nombre;
        this.imagen = imagen;
    }

    /**
     * Crea y devuelve el elemento DOM del diploma.
     * @returns {HTMLElement} figure con la imagen del diploma
     */
    crearElemento() {
        const figure = document.createElement("figure");
        figure.classList.add("diploma");

        const img = document.createElement("img");
        img.src = this.imagen;
        img.alt = "Diploma " + this.nombre;

        figure.appendChild(img);
        return figure;
    }
}

/** Lista de cursos completados con sus diplomas */
const cursos = [
    new Curso("React",      "./diplomas/diplomas/react.png"),
    new Curso("Vite",       "./diplomas/diplomas/vite.png"),
    new Curso("JavaScript", "./diplomas/diplomas/javascript.png"),
    new Curso("HTML y CSS", "./diplomas/diplomas/htmlcss.png"),
    new Curso("Tailwind",   "./diplomas/diplomas/tailwind.png"),
    new Curso("GitHub",     "./diplomas/diplomas/github.png"),
    new Curso("ES6",        "./diplomas/diplomas/es6.png")
];

const diploma = document.getElementById("listaCursos");

// Inserta cada diploma en el contenedor #listaCursos
cursos.forEach(curso => {
    diploma.appendChild(curso.crearElemento());
});


// ============================================================
// FONDO DE ESTRELLAS GIRATORIAS — canvas
// Envuelto en IIFE para no contaminar el scope global
// ============================================================

(function () {

    const canvas = document.getElementById('starsCanvas');
    if (!canvas) return; // si no existe el canvas, no hace nada

    const ctx = canvas.getContext('2d');

    /**
     * Configuración central de la animación.
     * Modifica estos valores para ajustar el comportamiento.
     */
    const CONFIG = {
        totalStars  : 220,      // más estrellas para cubrir más espacio
        minRadius   : 2,        // radio mínimo de órbita (px)
        maxRadius   : 1.0,      // radio máximo = diagonal completa de la pantalla
        minSpeed    : 0.00002,  // velocidad angular mínima (rad/ms)
        maxSpeed    : 0.0001, // velocidad angular máxima (rad/ms)
        minSize     : 0.3,      // tamaño mínimo del punto (px)
        maxSize     : 1.6,      // tamaño máximo del punto (px)
        trailLength : 14,       // cantidad de posiciones que forma la estela
        glowLayers  : 2,        // capas de resplandor alrededor del punto
        pulseRange  : 0.18,     // variación de opacidad por efecto de pulso
    };

    // Variables de dimensión y centro de la pantalla
    let W, H, cx, cy, maxOrbit;
    const stars = [];

    /**
     * Recalcula las dimensiones del canvas y el centro
     * cuando la ventana cambia de tamaño.
     */
    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
        cx = W / 2;
        cy = H / 2;
        // Usamos la diagonal para que las órbitas lleguen a las esquinas
        maxOrbit = Math.sqrt(W * W + H * H) * 0.5 * CONFIG.maxRadius;
    }

    // Helpers de números aleatorios
    function rand(min, max)    { return Math.random() * (max - min) + min; }
    function randInt(min, max) { return Math.floor(rand(min, max + 1)); }

    /**
     * Clase que representa una estrella individual.
     * Cada estrella tiene su propia órbita, velocidad,
     * tamaño, color y estela de movimiento.
     */
    class Star {
        constructor() { this.reset(); }

        /**
         * Inicializa o reinicia todos los valores de la estrella.
         * Usa distribución no uniforme para que haya más estrellas
         * en las capas externas (más natural).
         */
        reset() {
            const t      = Math.pow(Math.random(), 0.6);
            this.orbit   = CONFIG.minRadius + t * (maxOrbit - CONFIG.minRadius);
            this.angle   = rand(0, Math.PI * 2);

            // Las estrellas externas giran más lento (efecto de perspectiva)
            const speedFactor = 1 - (this.orbit / maxOrbit) * 0.65;
            this.speed   = rand(CONFIG.minSpeed, CONFIG.maxSpeed) * speedFactor;
            this.speed  *= Math.random() < 0.5 ? 1 : -1; // giro CW o CCW

            this.size    = rand(CONFIG.minSize, CONFIG.maxSize);
            this.alpha   = rand(0.08, 0.25); // brillo base

            // Parámetros del pulso de brillo
            this.pulseOffset = rand(0, Math.PI * 2);
            this.pulseSpeed  = rand(0.0008, 0.003);

            // Color: tono blanco-azulado con variación sutil
            this.r = 255;
            this.g = randInt(190, 240);
            this.b = randInt(200, 255);

            // Historial de posiciones para dibujar la estela
            this.trail = [];
            for (let i = 0; i < CONFIG.trailLength; i++) {
                const a = this.angle - this.speed * i * 16;
                this.trail.unshift({
                    x: cx + Math.cos(a) * this.orbit,
                    y: cy + Math.sin(a) * this.orbit
                });
            }
        }

        /**
         * Avanza la posición de la estrella un paso de tiempo.
         * @param {number} dt - Delta de tiempo en ms desde el último frame
         */
        update(dt) {
            this.angle += this.speed * dt;
            const x = cx + Math.cos(this.angle) * this.orbit;
            const y = cy + Math.sin(this.angle) * this.orbit;
            this.trail.push({ x, y });
            if (this.trail.length > CONFIG.trailLength) this.trail.shift();
        }

        /**
         * Dibuja la estela y el núcleo brillante de la estrella.
         * @param {number} now - Timestamp actual en ms (para el pulso)
         */
        draw(now) {
            if (this.trail.length < 2) return;

            // Calcula opacidad pulsante
            const pulse = this.alpha
                + Math.sin(now * this.pulseSpeed + this.pulseOffset)
                * CONFIG.pulseRange * this.alpha;
            const a    = Math.min(1, Math.max(0, pulse));
            const head = this.trail[this.trail.length - 1];

            // Dibuja la estela segmento a segmento (más opaca al frente)
            const tLen = this.trail.length;
            for (let i = 1; i < tLen; i++) {
                const t  = i / tLen;
                const ta = t * t * a * 0.25; // opacidad cuadrática
                const tw = this.size * t * 0.7;
                ctx.beginPath();
                ctx.moveTo(this.trail[i - 1].x, this.trail[i - 1].y);
                ctx.lineTo(this.trail[i].x,     this.trail[i].y);
                ctx.strokeStyle = `rgba(${this.r},${this.g},${this.b},${ta})`;
                ctx.lineWidth   = tw;
                ctx.lineCap     = 'round';
                ctx.stroke();
            }

            // Dibuja el núcleo con capas de resplandor (de fuera hacia adentro)
            for (let g = CONFIG.glowLayers; g >= 0; g--) {
                const glowR = this.size * (1 + g * 1.6);
                const glowA = g === 0 ? a : (a * 0.07) / g;
                ctx.beginPath();
                ctx.arc(head.x, head.y, glowR, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${glowA})`;
                ctx.fill();
            }
        }
    }

    /** Crea todas las estrellas desde cero */
    function initStars() {
        stars.length = 0;
        for (let i = 0; i < CONFIG.totalStars; i++) stars.push(new Star());
    }

    /**
     * Bucle principal de animación.
     * Limpia el canvas con un fade suave (motion blur),
     * actualiza y dibuja cada estrella.
     * @param {number} ts - Timestamp del frame actual en ms
     */
    let last = 0;
    function loop(ts) {
        const dt = ts - last;
        last = ts;

        // Fondo semitransparente para crear efecto de persistencia (motion blur)
        ctx.fillStyle = 'rgba(4, 4, 36, 0.35)';
        ctx.fillRect(0, 0, W, H);

        for (const s of stars) {
            s.update(dt);
            s.draw(ts);
        }

        requestAnimationFrame(loop);
    }

    // Reinicia el canvas y las estrellas al redimensionar la ventana
    window.addEventListener('resize', () => { resize(); initStars(); });

    // Arranque inicial
    resize();
    initStars();
    requestAnimationFrame(loop);

})();