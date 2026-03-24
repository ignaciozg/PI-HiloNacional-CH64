/**
 * main.js - Versión Final Optimizada
 */
window.addEventListener("load", () => {
  document.body.classList.add("theme-ready");
});

document.addEventListener("DOMContentLoaded", () => {
  // 0. CARGAR FOOTER
  const footerContainer = document.getElementById("footer");
  if (footerContainer) {
    fetch("../componentes/footer.html")
      .then((res) => res.text())
      .then((html) => footerContainer.insertAdjacentHTML("beforeend", html));
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
      .then((response) => response.text())
      .then((data) => {
        navbarContainer.innerHTML = data;
        runAppLogic();
      })
      .catch((err) => console.error("Error cargando navbar:", err));
  } else {
    // Carga estática (acerca-de, contactenos)
    runAppLogic();
  }
});

// --- FUNCIONES ---

// 1. TEMA OSCURO
function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  if (!themeToggleBtn) {
    console.error("No se encontró el botón con ID 'theme-toggle'");
    return;
  }

  const newBtn = themeToggleBtn.cloneNode(true);
  themeToggleBtn.parentNode.replaceChild(newBtn, themeToggleBtn);

  const themeIcon = newBtn.querySelector("i");
  const htmlElement = document.documentElement;
  const logoImg = document.getElementById("nav-logo");

  //Modo oscuro navbar

  const applyVisuals = (theme) => {
    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      if (logoImg) logoImg.src = "../assets/logo22.png";
    } else {
      if (logoImg) logoImg.src = "../assets/logo23.png";
    }
  };

  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  applyVisuals(savedTheme || (systemPrefersDark ? "dark" : "light"));

  newBtn.addEventListener("click", () => {
    const newTheme =
      htmlElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyVisuals(newTheme);
  });
}

// ESTO ES LO QUE HACE QUE FUNCIONE:
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTheme);
} else {
  initTheme();
}

// 2. NAVBAR SCROLL
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("shadow-sm");
      navbar.style.padding = "10px 0";
    } else {
      navbar.classList.remove("shadow-sm");
      navbar.style.padding = "15px 0";
    }
  });
}

// 3. CONTADORES
function initCounters() {
  const statsSection = document.querySelector(".stats");
  if (!statsSection) return;

  const animate = () => {
    const counters = document.querySelectorAll(".counter");
    const speed = 100;
    counters.forEach((counter) => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText.replace(/\D/g, "");
        const increment = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target + (target === 100 ? "%" : "+");
        }
      };
      updateCount();
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animate();
        observer.disconnect();
      }
    },
    { threshold: 0.5 },
  );
  observer.observe(statsSection);
}

// 4. TEAM EFFECTS
function initTeamEffects() {
  const teamCards = document.querySelectorAll(".team-card");
  teamCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.borderColor = "#9913F2";
    });
    card.addEventListener("mouseleave", () => {
      card.style.borderColor = "";
    });
  });
}

// 5. VER MÁS (HOVER + CLICK UNIFICADO)
function initVerMas() {
  const botones = document.querySelectorAll(".btn-ver-mas");
  if (botones.length === 0) return;

  botones.forEach((boton) => {
    const nuevoBoton = boton.cloneNode(true);
    boton.parentNode.replaceChild(nuevoBoton, boton);

    const tarjeta =
      nuevoBoton.closest(".card") || nuevoBoton.closest(".value-card");
    if (!tarjeta) return;
    const parrafo = tarjeta.querySelector("p");
    if (!parrafo) return;

    let hoverActivo = true;

    // Clic: Interrumpe y fuerza cierre o apertura
    nuevoBoton.addEventListener("click", (e) => {
      e.preventDefault();
      const estaVisible = parrafo.classList.contains("mostrar");

      if (estaVisible) {
        parrafo.classList.remove("mostrar");
        nuevoBoton.innerText = "Ver más...";
        hoverActivo = false; // Bloquear hover temporalmente
      } else {
        parrafo.classList.add("mostrar");
        nuevoBoton.innerText = "Ver menos...";
        hoverActivo = true;
      }
    });

    // Hover: Solo funciona si no ha sido cerrado manualmente
    tarjeta.addEventListener("mouseenter", () => {
      if (hoverActivo) {
        parrafo.classList.add("mostrar");
        nuevoBoton.innerText = "Ver menos...";
      }
    });

    tarjeta.addEventListener("mouseleave", () => {
      parrafo.classList.remove("mostrar");
      nuevoBoton.innerText = "Ver más...";
      hoverActivo = true; // Reiniciar estado
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    card.addEventListener("click", () => {
      const title = card.querySelector(".product-title").textContent;
      const category = card.querySelector(".product-category").textContent;
      const price = card.querySelector(".product-price").textContent;
      const imgSrc = card.querySelector("img").getAttribute("src");
      const description =
        card.dataset.description || "Sin descripción disponible";

      const fabric = card.dataset.fabric || null;
      const material = card.dataset.material || null;
      const care = card.dataset.care || null;

      document.getElementById("productModalLabel").textContent = title;
      document.getElementById("productModalDesc").textContent = description;
      document.getElementById("productModalPrice").textContent = price;
      document.getElementById("productModalImg").setAttribute("src", imgSrc);

      document
        .getElementById("sizeSection")
        .classList.toggle(
          "d-none",
          category !== "Hombre" && category !== "Mujer",
        );
      document
        .getElementById("fabricSection")
        .classList.toggle("d-none", !fabric);
      document
        .getElementById("materialSection")
        .classList.toggle("d-none", !material);
      document.getElementById("careSection").classList.toggle("d-none", !care);

      if (fabric) document.getElementById("productFabric").textContent = fabric;
      if (material)
        document.getElementById("productMaterial").textContent = material;
      if (care) document.getElementById("productCare").textContent = care;

      const modal = new bootstrap.Modal(
        document.getElementById("productModal"),
      );
      modal.show();
    });
  });
});

//----mostrar favoritos y carrito en todas las paginas
async function cargarComponentes() {
  try {
    // 1. Cargar Navbar
    const navRes = await fetch("./componentes/navbar.html");
    if (navRes.ok) {
      const navHtml = await navRes.text();
      const container = document.getElementById("navbar-container");
      if (container) {
        container.innerHTML = navHtml;

        // Una vez inyectado, activamos la lógica que vive en productos.js
        // Usamos window para asegurar que detecte las funciones globales
        if (typeof window.inicializarUI === "function") window.inicializarUI();
        if (typeof window.setupTheme === "function") window.setupTheme();
        if (typeof window.setupSearch === "function") window.setupSearch();
      }
    }

    // 2. Cargar Footer (Opcional, si tienes el archivo)
    const footRes = await fetch("./componentes/footer.html");
    if (footRes.ok) {
      const footHtml = await footRes.text();
      const footContainer = document.getElementById("footer-container");
      if (footContainer) footContainer.innerHTML = footHtml;
    }
  } catch (error) {
    console.error("Error cargando componentes globales:", error);
  }
}

// Se ejecuta automáticamente al cargar cualquier página que lo incluya
document.addEventListener("DOMContentLoaded", cargarComponentes);

// dropdown perfil
document.addEventListener("DOMContentLoaded", () => {
  const nombreGuardado = localStorage.getItem("usuarioNombre");
  const linkPerfil = document.querySelector("#userDropdown");

  if (nombreGuardado && linkPerfil) {
    // Opcional: Podrías poner el nombre al lado del icono
    // linkPerfil.innerHTML += `<span class="ms-2 small">${nombreGuardado}</span>`;
  }
});

// iniciar sesion

document.addEventListener("DOMContentLoaded", () => {
  const authButton = document.getElementById("authButton");
  const authText = document.getElementById("authText");
  const authIcon = document.getElementById("authIcon");

  // Función para actualizar el estado del botón
  function actualizarEstadoAuth() {
    const usuarioLogueado = localStorage.getItem("usuarioNombre");

    if (usuarioLogueado) {
      // ESTADO: SESIÓN INICIADA
      authText.textContent = "Cerrar Sesión";
      authButton.classList.add("text-danger");
      authButton.href = "#"; // Evitamos que navegue
      authIcon.className = "bi bi-box-arrow-right me-2";
    } else {
      // ESTADO: NO LOGUEADO
      authText.textContent = "Iniciar Sesión";
      authButton.classList.remove("text-danger");
      authButton.href = "login.html"; // Redirige al login
      authIcon.className = "bi bi-box-arrow-in-right me-2";
    }
  }

  // Ejecutar al cargar
  actualizarEstadoAuth();

  // Manejar el clic en el botón
  authButton.addEventListener("click", (e) => {
    const usuarioLogueado = localStorage.getItem("usuarioNombre");

    if (usuarioLogueado) {
      e.preventDefault(); // Detener el enlace

      // 1. Borrar datos del almacenamiento
      localStorage.removeItem("usuarioNombre");
      localStorage.removeItem("usuarioApellido");
      localStorage.removeItem("usuarioEmail");

      // 2. Actualizar la interfaz
      actualizarEstadoAuth();

      // 3. Opcional: Redirigir al inicio o recargar
      window.location.reload();
    }
  });
});

// ==================== AUTENTICACIÓN - INICIAR/CERRAR SESIÓN ====================
document.addEventListener("DOMContentLoaded", () => {
  // Esperamos 500ms para asegurar que el navbar dinámico se haya cargado en el HTML
  setTimeout(() => {
    const authButton = document.getElementById("authButton");
    const authText = document.getElementById("authText");
    const authIcon = document.getElementById("authIcon");
    const registroLink = document.getElementById("registroLink"); // Enlace de "Crea tu cuenta"

    // Verificamos que los elementos existan antes de continuar
    if (!authButton || !authText || !authIcon) return;

    // Función para actualizar el estado visual de la autenticación
    function actualizarEstadoAuth() {
      const usuarioActivo = localStorage.getItem("usuarioActivo");

      if (usuarioActivo) {
        // --- ESTADO: SESIÓN INICIADA ---
        authText.textContent = "Cerrar Sesión";
        authButton.classList.add("text-danger");
        authButton.href = "#";
        authIcon.className = "bi bi-box-arrow-right me-2";

        // OCULTAMOS el enlace de "Crea tu cuenta"
        if (registroLink) registroLink.style.display = "none";
      } else {
        // --- ESTADO: NO LOGUEADO ---
        authText.textContent = "Iniciar Sesión";
        authButton.classList.remove("text-danger");
        authButton.href = "login.html";
        authIcon.className = "bi bi-box-arrow-in-right me-2";

        // MOSTRAMOS el enlace de "Crea tu cuenta"
        if (registroLink) registroLink.style.display = "block";
      }
    }

    // Ejecutar la validación al cargar la página
    actualizarEstadoAuth();

    // Manejar el evento de clic para Cerrar Sesión
    authButton.addEventListener("click", (e) => {
      const usuarioActivo = localStorage.getItem("usuarioActivo");

      if (usuarioActivo) {
        e.preventDefault();

        // 1. Borrar la sesión del almacenamiento local
        localStorage.removeItem("usuarioActivo");

        // 2. Mostrar mensaje de éxito (con SweetAlert2 o Alert normal)
        if (typeof Swal !== "undefined") {
          Swal.fire({
            icon: "success",
            title: "Sesión cerrada",
            text: "Has cerrado sesión correctamente",
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            window.location.href = "index.html";
          });
        } else {
          alert("Sesión cerrada correctamente");
          window.location.href = "index.html";
        }
      }
    });
  }, 500);
});
