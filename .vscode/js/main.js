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

//Evitar que la pagina se recargue al hacer click en enviar:
document.getElementById("formulario").addEventListener("submit", function(event){event.preventDefault();
//declaramos las variables que van dentro del form(nombre,correo) y que nos regrese el valor que ingreso el usuarios(.vulue), luego quitamos espacios del final y el principio por si acaso(.trim)
let nombre = document.getElementById("nombre").value.trim();
let correo = document.getElementById("correo").value.trim();
//declaramos el mensaje vacio que despues llenaremos
let mensaje = document.getElementById("mensaje");
//Ahora vamos declaramos exppresiones regulares para despues declarar si el correo y el nombre si son validos
let regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
let regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//ahora hacemos un if para evitar que dejen campos vacios:
if(correo === "" || nombre === ""){
    mensaje.textContent= "Todos los campos son obligatorios"
    mensaje.style.color = "red"
    return;
}

//Ahora validamos el si el nombre NO(!) cumple el patron con el metodo .test() agregaremos un mensaje de error
if(!regexNombre.test(nombre)){
    mensaje.textContent = "Formato de nombre no valido";
    mensaje.style.color = "red";
    return;
}
//Hacemos lo mismo con correo
if(!regexCorreo.test(correo)){
    mensaje.textContent = "Formato de correo no valido";
    mensaje.style.color = "red";
    return;
}

mensaje.textContent = "formulario enviado correctamente ";
mensaje.style.color = "green";});






