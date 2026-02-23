/**
 * main.js - Versión Final Optimizada
 */
window.addEventListener("load", () => {
  document.body.classList.add("theme-ready");
});

document.addEventListener('DOMContentLoaded', () => {

    // 0. CARGAR FOOTER
    const footerContainer = document.getElementById("footer");
    if (footerContainer) {
        fetch("./footer.html")
            .then(res => res.text())
            .then(html => footerContainer.insertAdjacentHTML("beforeend", html));
    }

    // 1. LÓGICA DE LA APP
    const runAppLogic = () => {
        initTheme();
        initNavbarScroll();
        initCounters();
        initTeamEffects();
        initVerMas(); // Activar lógica Hover/Clic
    };

    // 2. GESTIÓN DEL NAVBAR
    const navbarContainer = document.getElementById("navbar-container");

    if (navbarContainer) {
        // Carga dinámica (index.html)
        fetch("componentes/navbar.html")
            .then(response => response.text())
            .then(data => {
                navbarContainer.innerHTML = data;
                runAppLogic();
            })
            .catch(err => console.error("Error cargando navbar:", err));
    } else {
        // Carga estática (acerca-de, contactenos)
        runAppLogic();
    }
});

// --- FUNCIONES ---

// 1. TEMA OSCURO
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;

    // Clonar para limpiar eventos
    const newBtn = themeToggleBtn.cloneNode(true);
    themeToggleBtn.parentNode.replaceChild(newBtn, themeToggleBtn);

    const themeIcon = newBtn.querySelector('i');
    const htmlElement = document.documentElement;
    const logoImg = document.getElementById('nav-logo');

    const applyVisuals = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        if (theme === 'dark') {
            if(themeIcon) {
                themeIcon.classList.remove('bi-moon-fill');
                themeIcon.classList.add('bi-sun-fill');
                themeIcon.style.color = '#fbbf24';
            }
            if (logoImg) logoImg.src = './assets/hilo_nacional_white.png';
        } else {
            if(themeIcon) {
                themeIcon.classList.remove('bi-sun-fill');
                themeIcon.classList.add('bi-moon-fill');
                themeIcon.style.color = '';
            }
            if (logoImg) logoImg.src = './assets/hilo_nacional.svg';
        }
    };

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyVisuals(savedTheme);
    } else if (systemPrefersDark) {
        applyVisuals('dark');
    }

    newBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyVisuals(newTheme);
    });
}

// 2. NAVBAR SCROLL
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

// 3. CONTADORES
function initCounters() {
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;

    const animate = () => {
        const counters = document.querySelectorAll('.counter');
        const speed = 100;
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace(/\D/g, '');
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

// 4. TEAM EFFECTS
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

// 5. VER MÁS (HOVER + CLICK UNIFICADO)
function initVerMas() {
    const botones = document.querySelectorAll('.btn-ver-mas');
    if (botones.length === 0) return;

    botones.forEach(boton => {
        const nuevoBoton = boton.cloneNode(true);
        boton.parentNode.replaceChild(nuevoBoton, boton);

        const tarjeta = nuevoBoton.closest('.card') || nuevoBoton.closest('.value-card');
        if (!tarjeta) return;
        const parrafo = tarjeta.querySelector('p');
        if (!parrafo) return;

        let hoverActivo = true;

        // Clic: Interrumpe y fuerza cierre o apertura
        nuevoBoton.addEventListener('click', (e) => {
            e.preventDefault();
            const estaVisible = parrafo.classList.contains('mostrar');

            if (estaVisible) {
                parrafo.classList.remove('mostrar');
                nuevoBoton.innerText = "Ver más...";
                hoverActivo = false; // Bloquear hover temporalmente
            } else {
                parrafo.classList.add('mostrar');
                nuevoBoton.innerText = "Ver menos...";
                hoverActivo = true;
            }
        });

        // Hover: Solo funciona si no ha sido cerrado manualmente
        tarjeta.addEventListener('mouseenter', () => {
            if (hoverActivo) {
                parrafo.classList.add('mostrar');
                nuevoBoton.innerText = "Ver menos...";
            }
        });

        tarjeta.addEventListener('mouseleave', () => {
            parrafo.classList.remove('mostrar');
            nuevoBoton.innerText = "Ver más...";
            hoverActivo = true; // Reiniciar estado
        });
    });
}