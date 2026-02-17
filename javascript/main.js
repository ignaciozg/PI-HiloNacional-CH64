/**
 * main.js - Optimizado para Hilo Nacional con Dark Mode
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 0. CARGAR FOOTER (Común en todas las páginas)
    // ==========================================
    const footerContainer = document.getElementById("footer");
    if (footerContainer) {
        fetch("./footer.html")
            .then(res => res.text())
            .then(html => footerContainer.insertAdjacentHTML("beforeend", html));
    }

    // ==========================================
    // 1. INICIALIZAR LÓGICA DE LA APP (Tema, Scroll, etc)
    // ==========================================
    const runAppLogic = () => {
        initTheme();
        initNavbarScroll();
        initCounters();
        initTeamEffects();
    };

    // ==========================================
    // 2. GESTIÓN DEL NAVBAR (Dinámico vs Estático)
    // ==========================================
    const navbarContainer = document.getElementById("navbar-container");

    if (navbarContainer) {
        // Caso A: index.html (Carga dinámica)
        fetch("componentes/navbar.html")
            .then(response => response.text())
            .then(data => {
                navbarContainer.innerHTML = data;
                runAppLogic(); // Iniciar lógica DESPUÉS de cargar el HTML
            })
            .catch(err => console.error("Error cargando navbar:", err));
    } else {
        // Caso B: acerca-de.html y contactenos.html (Navbar estático)
        runAppLogic(); // Iniciar lógica inmediatamente
    }
});

// ==========================================
// FUNCIONES AUXILIARES
// ==========================================

function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const logoImg = document.getElementById('nav-logo');
    
    // Si no encuentra el botón (ej. error de carga), sale para no romper el script
    if (!themeToggleBtn) return;

    const themeIcon = themeToggleBtn.querySelector('i');

    const applyTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        if (theme === 'dark') {
            themeIcon.classList.remove('bi-moon-fill');
            themeIcon.classList.add('bi-sun-fill');
            themeIcon.style.color = '#fbbf24';
            if (logoImg) logoImg.src = './assets/hilo_nacional_white.png';
        } else {
            themeIcon.classList.remove('bi-sun-fill');
            themeIcon.classList.add('bi-moon-fill');
            themeIcon.style.color = ''; // Color original (bootstrap o css)
            if (logoImg) logoImg.src = './assets/hilo_nacional.svg';
        }
    };

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (systemPrefersDark) {
        applyTheme('dark');
    }

    // Clonar el nodo para eliminar listeners previos si se ejecutó dos veces
    const newBtn = themeToggleBtn.cloneNode(true);
    themeToggleBtn.parentNode.replaceChild(newBtn, themeToggleBtn);

    newBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });
}

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm');
            navbar.style.padding = "10px 0";
        } else {
            navbar.classList.remove('shadow-sm');
            navbar.style.padding = "15px 0";
        }
    });
}

function initCounters() {
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;

    const animate = () => {
        const counters = document.querySelectorAll('.counter');
        const speed = 100;
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace(/\D/g, ''); // Limpiar caracteres no numéricos
                const increment = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target + (target === 100 ? '%' : '+');
                }
            };
            updateCount();
        });
    };

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animate();
            observer.disconnect();
        }
    }, { threshold: 0.5 });
    observer.observe(statsSection);
}

function initTeamEffects() {
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = "#9913F2";
        });
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = "";
        });
    });
}