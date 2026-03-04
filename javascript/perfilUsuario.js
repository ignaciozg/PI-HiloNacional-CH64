/**
 * perfilUsuario.js - Gestión de Perfil y Componentes Dinámicos
 * Corregido para manejar dos archivos de logo distintos con tamaño constante.
 */

document.addEventListener("DOMContentLoaded", () => {
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
    const logo = document.getElementById("nav-logo");
    if (logo) {
      logo.style.height = "45px"; // Forzamos altura de 45px (estándar de tu web)
      logo.style.width = "auto"; // Mantenemos la proporción
      logo.removeAttribute("height"); // Quitamos el height="500px" del HTML
    }

    // Inicializamos la lógica del tema después de cargar el HTML
    initTheme();
    initNavbarScroll();

    // Inicializar otros componentes (carrito, etc.) si están definidos
    if (typeof inicializarUI === "function") inicializarUI();
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

//-----------DIRECCIONES--------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valido = true;

    const nombre = document.getElementById("nombre");
    const apellidos = document.getElementById("apellidos");
    const cp = document.getElementById("cp");
    const pais = document.getElementById("pais");

    /* ===== VALIDAR NOMBRE ===== */
    if (nombre.value.trim().length < 2) {
      nombre.classList.add("is-invalid");
      valido = false;
    } else {
      nombre.classList.remove("is-invalid");
      nombre.classList.add("is-valid");
    }

    /* ===== VALIDAR APELLIDOS ===== */
    if (apellidos.value.trim().length < 2) {
      apellidos.classList.add("is-invalid");
      valido = false;
    } else {
      apellidos.classList.remove("is-invalid");
      apellidos.classList.add("is-valid");
    }

    /* ===== VALIDAR CODIGO POSTAL (México 5 dígitos) ===== */
    const cpRegex = /^[0-9]{5}$/;

    if (!cpRegex.test(cp.value)) {
      cp.classList.add("is-invalid");
      valido = false;
    } else {
      cp.classList.remove("is-invalid");
      cp.classList.add("is-valid");
    }

    /* ===== VALIDAR PAIS ===== */
    if (pais.value.trim().length < 2) {
      pais.classList.add("is-invalid");
      valido = false;
    } else {
      pais.classList.remove("is-invalid");
      pais.classList.add("is-valid");
    }

    /* ===== SI TODO ES VALIDO ===== */
    if (valido) {
      alert("Dirección guardada correctamente ✅");

      form.reset();

      // quitar clases visuales
      form.querySelectorAll(".is-valid").forEach((el) => {
        el.classList.remove("is-valid");
      });
    }
  });
});

// --- LÓGICA DEL TEMA (CAMBIO DE LOGO CLARO/OSCURO) ---

function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  if (!themeToggleBtn) return;

  const htmlElement = document.documentElement;
  const logoImg = document.getElementById("nav-logo");

  const applyVisuals = (theme) => {
    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    const themeIcon = themeToggleBtn.querySelector("i");

    if (theme === "dark") {
      // MODO OSCURO
      if (themeIcon) {
        themeIcon.className = "bi bi-sun-fill";
        themeIcon.style.color = "#fbbf24";
      }
      if (logoImg) {
        // ARCHIVO PARA MODO OSCURO
        logoImg.src = "./assets/logo22.png";
        logoImg.style.height = "45px"; // Re-forzamos el tamaño
      }
    } else {
      // MODO CLARO
      if (themeIcon) {
        themeIcon.className = "bi bi-moon-fill";
        themeIcon.style.color = "";
      }
      if (logoImg) {
        // ARCHIVO PARA MODO CLARO
        logoImg.src = "./assets/hilo_nacional.svg";
        logoImg.style.height = "45px"; // Re-forzamos el tamaño
      }
    }
  };

  // Detectar tema guardado o preferencia del sistema
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

  applyVisuals(initialTheme);

  // Evento de clic para alternar
  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme");
    applyVisuals(currentTheme === "dark" ? "light" : "dark");
  });
}

// --- EFECTO SCROLL ---

function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("shadow-sm");
      navbar.style.padding = "8px 0";
    } else {
      navbar.classList.remove("shadow-sm");
      navbar.style.padding = "15px 0";
    }
  });
}

// Limpiar formulario despues de guardar cambios en configuracion
document.addEventListener("DOMContentLoaded", () => {
  const formularioConfig = document.querySelector(".needs-validation");

  if (formularioConfig) {
    formularioConfig.addEventListener(
      "submit",
      (e) => {
        // Detener el envío real para manejarlo por JS
        e.preventDefault();

        // Validar el formulario usando la lógica de Bootstrap
        if (!formularioConfig.checkValidity()) {
          e.stopPropagation();
          formularioConfig.classList.add("was-validated");
        } else {
          // Si todo es válido:

          // 1. Aquí podrías enviar los datos a tu API/Backend
          console.log("Datos listos para guardar");

          // 2. Limpiar el formulario
          formularioConfig.reset();

          // 3. Quitar los estilos de validación (bordes verdes/rojos)
          formularioConfig.classList.remove("was-validated");

          // 4. Feedback visual (Opcional)
          // alert('Cambios guardados correctamente.');
        }
      },
      false,
    );
  }
});

// Funcionalidad de configuración de perfil: Actualización de datos y reflejo en la Sidebar
document.addEventListener("DOMContentLoaded", () => {
  const formConfig = document.getElementById("form-configuracion");
  const sidebarNombre = document.getElementById("sidebar-nombre");
  const sidebarEmail = document.getElementById("sidebar-email");
  const sidebarAvatar = document.getElementById("sidebar-avatar");

  // --- BLOQUE 1: Recuperar datos guardados al cargar la página ---
  const nombreGuardado = localStorage.getItem("usuarioNombre");
  const apellidoGuardado = localStorage.getItem("usuarioApellido");
  const emailGuardado = localStorage.getItem("usuarioEmail");

  if (nombreGuardado && sidebarNombre) {
    sidebarNombre.textContent = `${nombreGuardado} ${apellidoGuardado}`;
    sidebarAvatar.textContent = nombreGuardado.charAt(0).toUpperCase();
  }
  if (emailGuardado && sidebarEmail) {
    sidebarEmail.textContent = emailGuardado;
  }

  // --- BLOQUE 2: Guardar datos al enviar el formulario ---
  if (formConfig) {
    formConfig.addEventListener("submit", function (e) {
      e.preventDefault();

      if (this.checkValidity()) {
        const nombre = document.getElementById("config-nombre").value.trim();
        const apellidos = document
          .getElementById("config-apellidos")
          .value.trim();
        const email = document.getElementById("config-email").value.trim();

        // Guardar en la "mochila" del navegador (LocalStorage)
        localStorage.setItem("usuarioNombre", nombre);
        localStorage.setItem("usuarioApellido", apellidos);
        localStorage.setItem("usuarioEmail", email);

        // Actualizar la interfaz visualmente
        sidebarNombre.textContent = `${nombre} ${apellidos}`;
        sidebarEmail.textContent = email;
        sidebarAvatar.textContent = nombre.charAt(0).toUpperCase();

        alert("¡Cambios guardados permanentemente!");
      }
    });
  }
});
