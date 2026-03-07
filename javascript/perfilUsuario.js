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
        
        // Cargar productos al mostrar la sección vendedor
        cargarProductos();
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
                cargarProductos(); // Recargar productos al volver a esta pestaña
                break;
            case 'agregar-producto':
                tabAgregarProducto.classList.add('active');
                contenidoAgregarProducto.classList.remove('content-hidden');
                break;
        }
    }

    // ========== GESTIÓN DE PRODUCTOS ==========
    
    // Cargar productos al iniciar
    cargarProductos();
    
    // Manejar el formulario de agregar producto
    const formAgregarProducto = document.querySelector('#contenido-agregar-producto form');
    if (formAgregarProducto) {
        formAgregarProducto.addEventListener('submit', function(e) {
            e.preventDefault();
            agregarProducto();
        });
    }

    // Botón limpiar formulario
    const btnLimpiar = document.querySelector('#contenido-agregar-producto .btn-outline-secondary');
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', limpiarFormulario);
    }

    // ========== VISTA PREVIA DE IMÁGENES ==========
    
    // Vista previa para formulario de agregar (URL)
    const inputUrlImagen = document.getElementById('input-url-imagen');
    if (inputUrlImagen) {
        inputUrlImagen.addEventListener('input', function() {
            actualizarVistaPrevia(this.value, 'preview-imagen-agregar');
        });
    }
    
    // Vista previa para formulario de agregar (Archivo)
    const inputFileImagen = document.getElementById('input-file-imagen');
    if (inputFileImagen) {
        inputFileImagen.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    actualizarVistaPrevia(event.target.result, 'preview-imagen-agregar');
                    // Limpiar el input de URL cuando se sube un archivo
                    document.getElementById('input-url-imagen').value = '';
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Vista previa para modal de editar
    const inputEditImagen = document.getElementById('edit-imagen');
    if (inputEditImagen) {
        inputEditImagen.addEventListener('input', function() {
            actualizarVistaPrevia(this.value, 'preview-imagen-editar');
        });
    }

});

// ========== FUNCIONES DE PRODUCTOS ==========

/**
 * Obtener productos del localStorage
 */
function obtenerProductos() {
    const productos = localStorage.getItem('productos');
    return productos ? JSON.parse(productos) : [];
}

/**
 * Guardar productos en localStorage
 */
function guardarProductos(productos) {
    localStorage.setItem('productos', JSON.stringify(productos));
}

/**
 * Agregar un nuevo producto
 */
function agregarProducto() {
    // Obtener valores del formulario
    const nombre = document.querySelector('#contenido-agregar-producto input[placeholder="Ej. Playera deportiva"]').value;
    const categoria = document.querySelector('#contenido-agregar-producto select').value;
    const descripcion = document.querySelector('#contenido-agregar-producto textarea').value;
    const material = document.querySelector('#contenido-agregar-producto input[placeholder="Ej. Algodón"]').value;
    const precio = document.querySelector('#contenido-agregar-producto input[placeholder="$0.00"]').value;
    const stock = document.querySelector('#contenido-agregar-producto input[placeholder="Cantidad"]').value;
    const etiqueta = document.querySelector('#contenido-agregar-producto input[placeholder="Ej. Nuevo, Oferta"]').value;
    
    // Obtener imagen (URL o Base64 de vista previa)
    let imagenFinal = null;
    const vistaPrevia = document.querySelector('#preview-imagen-agregar img');
    
    if (vistaPrevia) {
        // Si hay una imagen en la vista previa, usar esa
        imagenFinal = vistaPrevia.src;
    } else {
        // Si no, intentar obtener del input URL
        const urlImagen = document.getElementById('input-url-imagen');
        if (urlImagen && urlImagen.value.trim()) {
            imagenFinal = urlImagen.value.trim();
        }
    }

    // Obtener tallas seleccionadas
    const tallasSeleccionadas = [];
    const checkboxesTallas = document.querySelectorAll('#contenido-agregar-producto .form-check-input:checked');
    checkboxesTallas.forEach(checkbox => {
        tallasSeleccionadas.push(checkbox.nextElementSibling.textContent);
    });

    // Validaciones básicas
    if (!nombre || !categoria || !descripcion || !material || !precio || !stock) {
        alert('Por favor completa todos los campos obligatorios (*)');
        return;
    }

    if (tallasSeleccionadas.length === 0) {
        alert('Por favor selecciona al menos una talla');
        return;
    }

    // Crear objeto producto
    const producto = {
        id: Date.now(), // ID único basado en timestamp
        nombre: nombre,
        categoria: categoria,
        descripcion: descripcion,
        material: material,
        precio: parseFloat(precio),
        stock: parseInt(stock),
        etiqueta: etiqueta || 'Activo',
        tallas: tallasSeleccionadas.join(', '),
        imagen: imagenFinal,
        fechaCreacion: new Date().toISOString()
    };
    
    // Debug: Ver qué imagen se está guardando
    console.log('📦 Producto a guardar:', producto);
    console.log('🖼️ Imagen guardada:', imagenFinal);

    // Obtener productos existentes
    const productos = obtenerProductos();
    
    // Agregar nuevo producto
    productos.push(producto);
    
    // Guardar en localStorage
    guardarProductos(productos);
    
    // Limpiar formulario
    limpiarFormulario();
    
    // Mostrar mensaje de éxito
    alert('✅ Producto agregado exitosamente');
    
    // Cambiar a la pestaña de Info Tienda para ver el producto agregado
    document.getElementById('tab-info-tienda').click();
    
    // Recargar la lista de productos
    cargarProductos();
}

/**
 * Cargar y mostrar productos en la lista
 */
function cargarProductos() {
    const productos = obtenerProductos();
    const contenedorProductos = document.getElementById('lista-productos');
    
    if (!contenedorProductos) return;
    
    // Limpiar contenedor
    contenedorProductos.innerHTML = '';
    
    if (productos.length === 0) {
        contenedorProductos.innerHTML = `
            <div class="text-center py-4 text-muted">
                <i class="bi bi-inbox" style="font-size: 3rem;"></i>
                <p class="mt-2">No hay productos agregados aún</p>
                <p class="small">Agrega tu primer producto desde la pestaña "Agregar Producto"</p>
            </div>
        `;
        return;
    }
    
    // Renderizar cada producto
    productos.forEach(producto => {
        const productoHTML = crearProductoHTML(producto);
        contenedorProductos.insertAdjacentHTML('beforeend', productoHTML);
    });
    
    // Agregar eventos a los botones de eliminar
    document.querySelectorAll('.btn-eliminar-producto').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            eliminarProducto(id);
        });
    });
    
    // Agregar eventos a los botones de ver
    document.querySelectorAll('.btn-ver-producto').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            verProducto(id);
        });
    });
    
    // Agregar eventos a los botones de editar
    document.querySelectorAll('.btn-editar-producto').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            editarProducto(id);
        });
    });
}

/**
 * Crear HTML para un producto
 */
function crearProductoHTML(producto) {
    const badgeClass = producto.etiqueta === 'Nuevo' ? 'bg-dark' : 'bg-primary';
    const precioFormateado = `$${producto.precio.toFixed(2)}`;
    
    return `
        <div class="producto-item d-flex justify-content-between align-items-center">
            <div class="d-flex gap-3">
                <div class="producto-imagen-placeholder">
                    ${producto.imagen ? 
                        `<img src="${producto.imagen}" alt="${producto.nombre}" style="width:100%; height:100%; object-fit:cover; border-radius:8px;">` :
                        `<i class="bi bi-image"></i>`
                    }
                </div>
                <div>
                    <h6 class="mb-1">${producto.nombre}</h6>
                    <small class="text-muted">${producto.categoria}</small><br>
                    <small class="text-muted">Tallas: ${producto.tallas}</small><br>
                    <small class="text-muted">Stock: ${producto.stock} unidades</small>
                </div>
            </div>
            <div class="d-flex gap-3 align-items-center">
                <div>
                    <strong>${precioFormateado}</strong><br>
                    <span class="badge ${badgeClass} mt-1">${producto.etiqueta}</span>
                </div>
                <div class="d-flex flex-column gap-1">
                    <button class="btn btn-sm btn-outline-secondary btn-ver-producto" data-id="${producto.id}" title="Ver producto">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-secondary btn-editar-producto" data-id="${producto.id}" title="Editar producto">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger btn-eliminar-producto" data-id="${producto.id}" title="Eliminar producto">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Eliminar un producto
 */
function eliminarProducto(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        return;
    }
    
    let productos = obtenerProductos();
    productos = productos.filter(p => p.id !== id);
    guardarProductos(productos);
    
    alert('✅ Producto eliminado correctamente');
    cargarProductos();
}

/**
 * Ver un producto
 */
function verProducto(id) {
    const productos = obtenerProductos();
    const producto = productos.find(p => p.id === id);
    
    if (!producto) {
        alert('Producto no encontrado');
        return;
    }
    
    // Llenar el modal con los datos del producto
    document.getElementById('modal-producto-nombre').textContent = producto.nombre;
    document.getElementById('modal-producto-categoria').textContent = producto.categoria;
    document.getElementById('modal-producto-precio').textContent = `$${producto.precio.toFixed(2)}`;
    document.getElementById('modal-producto-stock').textContent = `${producto.stock} unidades`;
    document.getElementById('modal-producto-material').textContent = producto.material;
    document.getElementById('modal-producto-tallas').textContent = producto.tallas;
    document.getElementById('modal-producto-etiqueta').innerHTML = `<span class="badge ${producto.etiqueta === 'Nuevo' ? 'bg-dark' : 'bg-primary'}">${producto.etiqueta}</span>`;
    document.getElementById('modal-producto-descripcion').textContent = producto.descripcion;
    
    // Mostrar imagen o placeholder
    const imagenContainer = document.getElementById('modal-producto-imagen');
    if (producto.imagen) {
        imagenContainer.innerHTML = `<img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid rounded" style="width:100%; max-height:300px; object-fit:cover;">`;
    } else {
        imagenContainer.innerHTML = `<div class="producto-imagen-placeholder" style="height:300px; font-size:4rem;"><i class="bi bi-image"></i></div>`;
    }
    
    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('modalVerProducto'));
    modal.show();
}

/**
 * Editar un producto
 */
function editarProducto(id) {
    const productos = obtenerProductos();
    const producto = productos.find(p => p.id === id);
    
    if (!producto) {
        alert('Producto no encontrado');
        return;
    }
    
    // Llenar el formulario de edición con los datos del producto
    document.getElementById('edit-producto-id').value = producto.id;
    document.getElementById('edit-nombre').value = producto.nombre;
    document.getElementById('edit-categoria').value = producto.categoria;
    document.getElementById('edit-descripcion').value = producto.descripcion;
    document.getElementById('edit-material').value = producto.material;
    document.getElementById('edit-precio').value = producto.precio;
    document.getElementById('edit-stock').value = producto.stock;
    document.getElementById('edit-etiqueta').value = producto.etiqueta;
    document.getElementById('edit-imagen').value = producto.imagen || '';
    
    // Actualizar vista previa de imagen en el modal de editar
    if (producto.imagen) {
        actualizarVistaPrevia(producto.imagen, 'preview-imagen-editar');
    } else {
        actualizarVistaPrevia('', 'preview-imagen-editar');
    }
    
    // Marcar las tallas seleccionadas
    const tallasArray = producto.tallas.split(', ');
    document.querySelectorAll('.edit-talla').forEach(checkbox => {
        checkbox.checked = tallasArray.includes(checkbox.value);
    });
    
    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('modalEditarProducto'));
    modal.show();
}

/**
 * Guardar la edición de un producto
 */
function guardarEdicionProducto() {
    const id = parseInt(document.getElementById('edit-producto-id').value);
    const nombre = document.getElementById('edit-nombre').value;
    const categoria = document.getElementById('edit-categoria').value;
    const descripcion = document.getElementById('edit-descripcion').value;
    const material = document.getElementById('edit-material').value;
    const precio = parseFloat(document.getElementById('edit-precio').value);
    const stock = parseInt(document.getElementById('edit-stock').value);
    const etiqueta = document.getElementById('edit-etiqueta').value;
    const imagen = document.getElementById('edit-imagen').value;
    
    // Obtener tallas seleccionadas
    const tallasSeleccionadas = [];
    document.querySelectorAll('.edit-talla:checked').forEach(checkbox => {
        tallasSeleccionadas.push(checkbox.value);
    });
    
    // Validaciones
    if (!nombre || !categoria || !descripcion || !material || !precio || !stock) {
        alert('Por favor completa todos los campos obligatorios (*)');
        return;
    }
    
    if (tallasSeleccionadas.length === 0) {
        alert('Por favor selecciona al menos una talla');
        return;
    }
    
    // Obtener productos y actualizar el producto editado
    let productos = obtenerProductos();
    const index = productos.findIndex(p => p.id === id);
    
    if (index === -1) {
        alert('Error: Producto no encontrado');
        return;
    }
    
    // Actualizar el producto
    productos[index] = {
        ...productos[index],
        nombre: nombre,
        categoria: categoria,
        descripcion: descripcion,
        material: material,
        precio: precio,
        stock: stock,
        etiqueta: etiqueta || 'Activo',
        tallas: tallasSeleccionadas.join(', '),
        imagen: imagen || null
    };
    
    // Guardar cambios
    guardarProductos(productos);
    
    // Cerrar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditarProducto'));
    modal.hide();
    
    // Recargar productos
    cargarProductos();
    
    // Mensaje de éxito
    alert('✅ Producto actualizado correctamente');
}

/**
 * Limpiar el formulario de agregar producto
 */
function limpiarFormulario() {
    const form = document.querySelector('#contenido-agregar-producto form');
    if (form) {
        form.reset();
        
        // Desmarcar todos los checkboxes de tallas
        const checkboxes = document.querySelectorAll('#contenido-agregar-producto .form-check-input');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Limpiar la vista previa de imagen
        const previewContainer = document.getElementById('preview-imagen-agregar');
        if (previewContainer) {
            previewContainer.innerHTML = `
                <div class="text-muted">
                    <i class="bi bi-image" style="font-size: 3rem;"></i>
                    <p class="mt-2 mb-0">Vista previa de la imagen</p>
                </div>
            `;
        }
    }
}

/**
 * Actualizar la vista previa de la imagen
 */
function actualizarVistaPrevia(url, idContenedor) {
    const contenedor = document.getElementById(idContenedor);
    if (contenedor) {
        if (url) {
            contenedor.innerHTML = `<img src="${url}" alt="Vista previa" class="img-fluid rounded" style="width:100%; max-height:300px; object-fit:cover;">`;
        } else {
            contenedor.innerHTML = `<div class="producto-imagen-placeholder" style="height:300px; font-size:4rem;"><i class="bi bi-image"></i></div>`;
        }
    }
}