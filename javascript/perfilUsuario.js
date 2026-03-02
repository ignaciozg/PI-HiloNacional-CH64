/**
 * perfilUsuario.js - Gestión de Perfil y Componentes Dinámicos
 * Corregido para manejar dos archivos de logo distintos con tamaño constante.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. CARGA DE COMPONENTES DINÁMICOS
    cargarNavbar();
    cargarFooter();
});

// --- FUNCIONES DE CARGA ---

async function cargarNavbar() {
    const container = document.getElementById("navbar-container");
    if (!container) return;

    try {
        const response = await fetch("./componentes/navbar.html");
        const html = await response.text();
        container.innerHTML = html;

        // --- ARREGLO DEL LOGO ---
        // Buscamos el logo y anulamos el error de los 500px inmediatamente
        const logo = document.getElementById('nav-logo');
        if (logo) {
            logo.style.height = "45px"; // Forzamos altura de 45px (estándar de tu web)
            logo.style.width = "auto";  // Mantenemos la proporción
            logo.removeAttribute('height'); // Quitamos el height="500px" del HTML
        }

        // Inicializamos la lógica del tema después de cargar el HTML
        initTheme(); 
        initNavbarScroll();
        
        // Inicializar otros componentes (carrito, etc.) si están definidos
        if (typeof inicializarUI === 'function') inicializarUI();
        
    } catch (err) {
        console.error("Error cargando el navbar:", err);
    }
}

async function cargarFooter() {
    const container = document.getElementById("footer-container");
    if (!container) return;

    try {
        const response = await fetch("./componentes/footer.html");
        const html = await response.text();
        container.innerHTML = html;
    } catch (err) {
        console.error("Error cargando el footer:", err);
    }
}

// --- LÓGICA DEL TEMA (CAMBIO DE LOGO CLARO/OSCURO) ---

function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;

    const htmlElement = document.documentElement;
    const logoImg = document.getElementById('nav-logo');
    
    const applyVisuals = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        const themeIcon = themeToggleBtn.querySelector('i');
        
        if (theme === 'dark') {
            // MODO OSCURO
            if (themeIcon) {
                themeIcon.className = 'bi bi-sun-fill';
                themeIcon.style.color = '#fbbf24';
            }
            if (logoImg) {
                // ARCHIVO PARA MODO OSCURO
                logoImg.src = './assets/logo22.png'; 
                logoImg.style.height = "45px"; // Re-forzamos el tamaño
            }
        } else {
            // MODO CLARO
            if (themeIcon) {
                themeIcon.className = 'bi bi-moon-fill';
                themeIcon.style.color = '';
            }
            if (logoImg) {
                // ARCHIVO PARA MODO CLARO
                logoImg.src = './assets/hilo_nacional.svg'; 
                logoImg.style.height = "45px"; // Re-forzamos el tamaño
            }
        }
    };

    // Detectar tema guardado o preferencia del sistema
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    applyVisuals(initialTheme);

    // Evento de clic para alternar
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        applyVisuals(currentTheme === 'dark' ? 'light' : 'dark');
    });
}

// --- EFECTO SCROLL ---

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm');
            navbar.style.padding = "8px 0";
        } else {
            navbar.classList.remove('shadow-sm');
            navbar.style.padding = "15px 0";
        }
    });
}