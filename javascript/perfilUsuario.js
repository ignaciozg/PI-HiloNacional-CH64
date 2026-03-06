/**
 * perfilUsuario.js - Gestión de Perfil y Componentes Dinámicos
 * Corregido para manejar dos archivos de logo distintos con tamaño constante.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. CARGA DE COMPONENTES DINÁMICOS
  cargarNavbar();
  cargarFooter();
});
document.addEventListener("DOMContentLoaded", () => {
  // 1. CARGA DE COMPONENTES DINÁMICOS
  cargarNavbar();
  cargarFooter();

  // --- NUEVO: GESTIÓN DE SESIÓN ---
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (!usuario) {
    // Si intentan entrar al perfil sin registrarse, los mandamos fuera
    window.location.href = "login.html"; 
    return;
  }

  // Pintamos los datos en la Sidebar automáticamente
  const sidebarNombre = document.getElementById("sidebar-nombre");
  const sidebarEmail = document.getElementById("sidebar-email");
  const sidebarAvatar = document.getElementById("sidebar-avatar");

  if (sidebarNombre) sidebarNombre.textContent = usuario.nombre;
  if (sidebarEmail) sidebarEmail.textContent = usuario.email;
  if (sidebarAvatar) sidebarAvatar.textContent = usuario.nombre.charAt(0).toUpperCase();
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

 //configuracion modo oscuro 
const applyVisuals = (theme) => {
    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    const themeIcon = themeToggleBtn.querySelector("i");

    if (theme === "dark") {
      // MODO OSCURO
      if (themeIcon) {
        // CAMBIO: Mantenemos bi-moon-fill en lugar de bi-sun-fill
        themeIcon.className = "bi bi-moon-fill"; 
        themeIcon.style.color = "#fbbf24"; // Mantenemos el color amarillo para resaltar
      }
      if (logoImg) {
        logoImg.src = "./assets/logo22.png";
        logoImg.style.height = "45px";
      }
    } else {
      // MODO CLARO
      if (themeIcon) {
        themeIcon.className = "bi bi-moon-fill"; // Se queda igual
        themeIcon.style.color = ""; // Color original
      }
      if (logoImg) {
        logoImg.src = "./assets/hilo_nacional.svg";
        logoImg.style.height = "45px";
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

// ================== API DE PAISES ==================
document.addEventListener("DOMContentLoaded", function() {

    const selectPais = document.getElementById("pais");
    if (!selectPais) return;

    fetch("https://restcountries.com/v3.1/all?fields=name")
        .then(res => {
            if (!res.ok) {
                throw new Error("Error en la API");
            }
            return res.json();
        })
        .then(data => {

            // ahora sí data es array
            data.sort((a, b) =>
                a.name.common.localeCompare(b.name.common)
            );

            data.forEach(pais => {
                const option = document.createElement("option");
                option.value = pais.name.common;
                option.textContent = pais.name.common;
                selectPais.appendChild(option);
            });

            new TomSelect("#pais", {
                create: false,
                sortField: {
                    field: "text",
                    direction: "asc"
                }
            });

        })
        .catch(error => {
            console.error("Error cargando países:", error);
        });

});
// Funcion para que funcione cerrar sesion
function cerrarSesion() {
    // Eliminamos la sesión activa
    localStorage.removeItem("usuarioActivo");

    // Redirigimos al index o login
    window.location.href = "index.html"; 
}

// Llenar los campos de configuración automáticamente al cargar
document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    
    if (usuario) {
        // Llenamos los inputs de la pestaña Configuración
        const inputNombre = document.getElementById("config-nombre");
        const inputEmail = document.getElementById("config-email");

        if (inputNombre) inputNombre.value = usuario.nombre;
        if (inputEmail) inputEmail.value = usuario.email;
    }
});

/**
 * perfil.js - Gestión de pestañas Comprador/Vendedor
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== TOGGLE PRINCIPAL: COMPRADOR / VENDEDOR ==========
    const btnComprador = document.getElementById('btn-comprador');
    const btnVendedor = document.getElementById('btn-vendedor');
    const seccionComprador = document.getElementById('seccion-comprador');
    const seccionVendedor = document.getElementById('seccion-vendedor');

    // Función para cambiar a modo Comprador
    btnComprador.addEventListener('click', function() {
        // Activar botón Comprador
        btnComprador.classList.add('active');
        btnVendedor.classList.remove('active');
        
        // Mostrar sección Comprador y ocultar Vendedor
        seccionComprador.classList.remove('content-hidden');
        seccionVendedor.classList.add('content-hidden');
    });

    // Función para cambiar a modo Vendedor
    btnVendedor.addEventListener('click', function() {
        // Activar botón Vendedor
        btnVendedor.classList.add('active');
        btnComprador.classList.remove('active');
        
        // Mostrar sección Vendedor y ocultar Comprador
        seccionVendedor.classList.remove('content-hidden');
        seccionComprador.classList.add('content-hidden');
    });

    // ========== TABS SECUNDARIAS: COMPRADOR ==========
    const tabPedidos = document.getElementById('tab-pedidos');
    const tabDirecciones = document.getElementById('tab-direcciones');
    const tabConfiguracion = document.getElementById('tab-configuracion');
    
    const contenidoPedidos = document.getElementById('contenido-pedidos');
    const contenidoDirecciones = document.getElementById('contenido-direcciones');
    const contenidoConfiguracion = document.getElementById('contenido-configuracion');

    // Función para cambiar tabs del Comprador
    tabPedidos.addEventListener('click', function() {
        activarTabComprador('pedidos');
    });

    tabDirecciones.addEventListener('click', function() {
        activarTabComprador('direcciones');
    });

    tabConfiguracion.addEventListener('click', function() {
        activarTabComprador('configuracion');
    });

    function activarTabComprador(tab) {
        // Remover clase active de todos los tabs
        tabPedidos.classList.remove('active');
        tabDirecciones.classList.remove('active');
        tabConfiguracion.classList.remove('active');
        
        // Ocultar todo el contenido
        contenidoPedidos.classList.add('content-hidden');
        contenidoDirecciones.classList.add('content-hidden');
        contenidoConfiguracion.classList.add('content-hidden');
        
        // Activar el tab seleccionado
        switch(tab) {
            case 'pedidos':
                tabPedidos.classList.add('active');
                contenidoPedidos.classList.remove('content-hidden');
                break;
            case 'direcciones':
                tabDirecciones.classList.add('active');
                contenidoDirecciones.classList.remove('content-hidden');
                break;
            case 'configuracion':
                tabConfiguracion.classList.add('active');
                contenidoConfiguracion.classList.remove('content-hidden');
                break;
        }
    }

    // ========== TABS SECUNDARIAS: VENDEDOR ==========
    const tabInfoTienda = document.getElementById('tab-info-tienda');
    const tabAgregarProducto = document.getElementById('tab-agregar-producto');
    
    const contenidoInfoTienda = document.getElementById('contenido-info-tienda');
    const contenidoAgregarProducto = document.getElementById('contenido-agregar-producto');

    // Función para cambiar tabs del Vendedor
    tabInfoTienda.addEventListener('click', function() {
        activarTabVendedor('info-tienda');
    });

    tabAgregarProducto.addEventListener('click', function() {
        activarTabVendedor('agregar-producto');
    });

    function activarTabVendedor(tab) {
        // Remover clase active de todos los tabs
        tabInfoTienda.classList.remove('active');
        tabAgregarProducto.classList.remove('active');
        
        // Ocultar todo el contenido
        contenidoInfoTienda.classList.add('content-hidden');
        contenidoAgregarProducto.classList.add('content-hidden');
        
        // Activar el tab seleccionado
        switch(tab) {
            case 'info-tienda':
                tabInfoTienda.classList.add('active');
                contenidoInfoTienda.classList.remove('content-hidden');
                break;
            case 'agregar-producto':
                tabAgregarProducto.classList.add('active');
                contenidoAgregarProducto.classList.remove('content-hidden');
                break;
        }
    }

});