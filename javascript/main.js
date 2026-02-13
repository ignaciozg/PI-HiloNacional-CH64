/**
 * main.js - Optimizado para Hilo Nacional
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Gestión de Navbar al hacer Scroll
    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm');
            navbar.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
            navbar.style.padding = "10px 0";
        } else {
            navbar.classList.remove('shadow-sm');
            navbar.style.backgroundColor = "#ffffff";
            navbar.style.padding = "15px 0";
        }
    };
    window.addEventListener('scroll', handleScroll);

    // 2. Animación de Contadores con Intersection Observer
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

    // Activar animación cuando la sección sea visible
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.disconnect(); // Se ejecuta una sola vez
            }
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }

    // 3. Feedback visual dinámico para el equipo
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = "#9913F2";
        });
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = "#f0f0f0";
        });
    });
});



