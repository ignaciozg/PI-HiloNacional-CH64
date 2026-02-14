/**
 * main.js - Optimizado para Hilo Nacional con Dark Mode
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. LÓGICA DE DARK MODE
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
    const htmlElement = document.documentElement;
    const logoImg = document.getElementById('nav-logo');

    
    // Función para aplicar el tema
    const applyTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Cambiar icono del botón
        if (theme === 'dark') {
            // Icono
        themeIcon.classList.remove('bi-moon-fill');
        themeIcon.classList.add('bi-sun-fill');
        themeIcon.style.color = '#fbbf24';

        // Logo modo oscuro
        logoImg.src = './assets/hilo_nacional_white.png';
        } else {
             // Icono
            themeIcon.classList.remove('bi-moon-fill');
            themeIcon.classList.add('bi-sun-fill');
            themeIcon.style.color = '#fbbf24';

        // Logo modo claro
        logoImg.src = './assets/hilo_nacional.svg';
        }
    };



    // Verificar preferencia guardada o del sistema
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (systemPrefersDark) {
        applyTheme('dark');
    }

    // Event Listener del botón
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    // ==========================================
    // 2. GESTIÓN DE NAVBAR AL SCROLL
    // ==========================================
    const navbar = document.querySelector('.navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm');
            navbar.style.padding = "10px 0";
        } else {
            navbar.classList.remove('shadow-sm');
            navbar.style.padding = "15px 0";
        }
    };
    window.addEventListener('scroll', handleScroll);


    // ==========================================
    // 3. ANIMACIÓN DE CONTADORES
    // ==========================================
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter');
        const speed = 100;

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
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

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }

    // ==========================================
    // 4. FEEDBACK VISUAL EQUIPO
    // ==========================================
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = "#9913F2";
        });
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = ""; 
        });
    });



}); // <--- CIERRE FINAL DEL DOMContentLoaded