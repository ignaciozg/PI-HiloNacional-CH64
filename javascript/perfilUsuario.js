/**
 * perfilUsuario.js - VERSIÓN FINAL CORREGIDA
 */

// ==================== INICIALIZACIÓN ====================
document.addEventListener("DOMContentLoaded", () => {
  // 1. CARGAR COMPONENTES DINÁMICOS
  cargarNavbar();
  cargarFooter();

  // 2. VERIFICAR SESIÓN ACTIVA
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (!usuario) {
    alert("Debes iniciar sesión para acceder a tu perfil");
    window.location.href = "login.html";
    return;
  }

  // 3. CARGAR DATOS DEL USUARIO EN SIDEBAR
  cargarDatosUsuario(usuario);

  // 4. INICIALIZAR SISTEMA DE PESTAÑAS
  inicializarPestanas();

  // 5. INICIALIZAR DIRECCIONES Y APIS
  iniciarAPIcp();
  iniciarAPIpaises();
  iniciarDirecciones();

  // 6. INICIALIZAR PRODUCTOS
  cargarProductos();

  // 7. CONFIGURAR FORMULARIO DE AGREGAR PRODUCTO
  configurarFormularioProducto();
});

// ==================== FUNCIONES DE CARGA ====================

async function cargarNavbar() {
  const container = document.getElementById("navbar-container");
  if (!container) return;

  try {
    const response = await fetch("./componentes/navbar.html");
    const html = await response.text();
    container.innerHTML = html;

    // Arreglar tamaño del logo
    const logo = document.getElementById("nav-logo");
    if (logo) {
      logo.style.height = "45px";
      logo.style.width = "auto";
      logo.removeAttribute("height");
    }

    // Inicializar tema y scroll
    initTheme();
    initNavbarScroll();
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

function cargarDatosUsuario(usuario) {
  const sidebarNombre = document.getElementById("sidebar-nombre");
  const sidebarEmail = document.getElementById("sidebar-email");
  const sidebarAvatar = document.getElementById("sidebar-avatar");

  if (sidebarNombre) sidebarNombre.textContent = usuario.nombre;
  if (sidebarEmail) sidebarEmail.textContent = usuario.email;
  if (sidebarAvatar) {
    const iniciales = usuario.nombre.charAt(0).toUpperCase();
    sidebarAvatar.textContent = iniciales;
  }

  // Llenar campos de configuración
  const inputNombre = document.getElementById("config-nombre");
  const inputEmail = document.getElementById("config-email");

  if (inputNombre) inputNombre.value = usuario.nombre;
  if (inputEmail) inputEmail.value = usuario.email;
}

// ==================== SISTEMA DE PESTAÑAS ====================

function inicializarPestanas() {
  // ========== TOGGLE PRINCIPAL: COMPRADOR / VENDEDOR ==========
  const btnComprador = document.getElementById("btn-comprador");
  const btnVendedor = document.getElementById("btn-vendedor");
  const seccionComprador = document.getElementById("seccion-comprador");
  const seccionVendedor = document.getElementById("seccion-vendedor");

  if (!btnComprador || !btnVendedor) {
    console.error("No se encontraron los botones principales");
    return;
  }

  btnComprador.addEventListener("click", () => {
    btnComprador.classList.add("active");
    btnVendedor.classList.remove("active");
    seccionComprador.classList.remove("content-hidden");
    seccionVendedor.classList.add("content-hidden");
  });

  btnVendedor.addEventListener("click", () => {
    btnVendedor.classList.add("active");
    btnComprador.classList.remove("active");
    seccionVendedor.classList.remove("content-hidden");
    seccionComprador.classList.add("content-hidden");
  });

  // ========== TABS SECUNDARIAS: COMPRADOR ==========
  const tabPedidos = document.getElementById("tab-pedidos");
  const tabDirecciones = document.getElementById("tab-direcciones");
  const tabConfiguracion = document.getElementById("tab-configuracion");

  const contenidoPedidos = document.getElementById("contenido-pedidos");
  const contenidoDirecciones = document.getElementById("contenido-direcciones");
  const contenidoConfiguracion = document.getElementById("contenido-configuracion");

  if (!tabPedidos || !tabDirecciones || !tabConfiguracion) {
    console.error("No se encontraron las tabs de comprador");
    return;
  }

  // Función para activar tab de comprador
  function activarTabComprador(tab) {
    // Remover active de todos los tabs
    tabPedidos.classList.remove("active");
    tabDirecciones.classList.remove("active");
    tabConfiguracion.classList.remove("active");

    // Ocultar todo el contenido
    contenidoPedidos.classList.add("content-hidden");
    contenidoDirecciones.classList.add("content-hidden");
    contenidoConfiguracion.classList.add("content-hidden");

    // Activar el tab seleccionado
    switch (tab) {
      case "pedidos":
        tabPedidos.classList.add("active");
        contenidoPedidos.classList.remove("content-hidden");
        break;
      case "direcciones":
        tabDirecciones.classList.add("active");
        contenidoDirecciones.classList.remove("content-hidden");
        break;
      case "configuracion":
        tabConfiguracion.classList.add("active");
        contenidoConfiguracion.classList.remove("content-hidden");
        break;
    }
  }

  // Eventos de clic
  tabPedidos.addEventListener("click", () => activarTabComprador("pedidos"));
  tabDirecciones.addEventListener("click", () => activarTabComprador("direcciones"));
  tabConfiguracion.addEventListener("click", () => activarTabComprador("configuracion"));

  // IMPORTANTE: Inicializar estado por defecto (solo Pedidos visible)
  activarTabComprador("pedidos");

  // ========== TABS SECUNDARIAS: VENDEDOR ==========
  const tabInfoTienda = document.getElementById("tab-info-tienda");
  const tabAgregarProducto = document.getElementById("tab-agregar-producto");

  const contenidoInfoTienda = document.getElementById("contenido-info-tienda");
  const contenidoAgregarProducto = document.getElementById("contenido-agregar-producto");

  if (!tabInfoTienda || !tabAgregarProducto) {
    console.error("No se encontraron las tabs de vendedor");
    return;
  }

  // Función para activar tab de vendedor
  function activarTabVendedor(tab) {
    // Remover active de todos los tabs
    tabInfoTienda.classList.remove("active");
    tabAgregarProducto.classList.remove("active");

    // Ocultar todo el contenido
    contenidoInfoTienda.classList.add("content-hidden");
    contenidoAgregarProducto.classList.add("content-hidden");

    // Activar el tab seleccionado
    switch (tab) {
      case "info-tienda":
        tabInfoTienda.classList.add("active");
        contenidoInfoTienda.classList.remove("content-hidden");
        break;
      case "agregar-producto":
        tabAgregarProducto.classList.add("active");
        contenidoAgregarProducto.classList.remove("content-hidden");
        break;
    }
  }

  // Eventos de clic
  tabInfoTienda.addEventListener("click", () => activarTabVendedor("info-tienda"));
  tabAgregarProducto.addEventListener("click", () => activarTabVendedor("agregar-producto"));

  // IMPORTANTE: Inicializar estado por defecto (solo Info Tienda visible)
  activarTabVendedor("info-tienda");

  // ========== CONFIGURAR FORMULARIO DE CONFIGURACIÓN ==========
  const formConfig = document.getElementById("form-configuracion");
  if (formConfig) {
    formConfig.addEventListener("submit", function (e) {
      e.preventDefault();

      const nombre = document.getElementById("config-nombre").value.trim();
      const email = document.getElementById("config-email").value.trim();

      if (!nombre || !email) {
        alert("Por favor completa todos los campos");
        return;
      }

      const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
      usuario.nombre = nombre;
      usuario.email = email;
      localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

      // Actualizar sidebar
      document.getElementById("sidebar-nombre").textContent = nombre;
      document.getElementById("sidebar-email").textContent = email;
      document.getElementById("sidebar-avatar").textContent = nombre.charAt(0).toUpperCase();

      alert("¡Cambios guardados correctamente!");
    });
  }
}

// ==================== TEMA OSCURO ====================

function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  if (!themeToggleBtn) return;

  const htmlElement = document.documentElement;
  const logoImg = document.getElementById("nav-logo");

  const applyVisuals = (theme) => {
  htmlElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  if (logoImg) {
    if (theme === "dark") {
      logoImg.src = "./assets/logo22.png";
    } else {
      logoImg.src = "./assets/hilo_nacional.svg";
    }
  }
};

  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

  applyVisuals(initialTheme);

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme");
    applyVisuals(currentTheme === "dark" ? "light" : "dark");
  });
}

// ==================== NAVBAR SCROLL ====================

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

// ==================== DIRECCIONES - API CÓDIGO POSTAL ====================

function iniciarAPIcp() {
  const cpInput = document.getElementById("cp");
  const estadoInput = document.getElementById("estado");
  const municipioInput = document.getElementById("municipio");
  const coloniaSelect = document.getElementById("colonia");

  if (!cpInput) return;

  cpInput.addEventListener("input", function () {
    const cp = this.value;

    if (cp.length < 5) {
      estadoInput.value = "";
      municipioInput.value = "";
      coloniaSelect.innerHTML = "<option value=''>Selecciona colonia</option>";
      return;
    }

    // API 1 → COLONIAS
    fetch(`https://api.zippopotam.us/mx/${cp}`)
      .then(res => res.json())
      .then(data => {
        estadoInput.value = data.places[0]["state"];
        coloniaSelect.innerHTML = "";

        data.places.forEach(place => {
          const option = document.createElement("option");
          option.value = place["place name"];
          option.textContent = place["place name"];
          coloniaSelect.appendChild(option);
        });
      })
      .catch(() => {
        estadoInput.value = "";
        coloniaSelect.innerHTML = "<option value=''>No se encontraron colonias</option>";
      });

    // API 2 → MUNICIPIO
    fetch(`https://sepomex.nitrostudio.com.mx/api/20241009/cp/${cp}.json`)
      .then(res => res.json())
      .then(data => {
        const info = data.data.postcodes[0];
        municipioInput.value = info.d_mnpio;
      })
      .catch(() => {
        municipioInput.value = "";
      });
  });
}

// ==================== DIRECCIONES - API PAÍSES ====================

function iniciarAPIpaises() {
  const selectPais = document.getElementById("pais");
  if (!selectPais) return;

  fetch("https://restcountries.com/v3.1/all?fields=name")
    .then(res => {
      if (!res.ok) throw new Error("Error en API");
      return res.json();
    })
    .then(data => {
      data.sort((a, b) => a.name.common.localeCompare(b.name.common));

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
}

// ==================== DIRECCIONES - VALIDACIÓN Y GUARDAR ====================

function iniciarDirecciones() {
  const formDireccion = document.getElementById("form-direccion");
  if (!formDireccion) return;

  formDireccion.addEventListener("submit", function (e) {
    e.preventDefault();

    let valido = true;
    const campos = {
      nombre: document.getElementById("nombre"),
      apellidos: document.getElementById("apellidos"),
      cp: document.getElementById("cp"),
      colonia: document.getElementById("colonia"),
      pais: document.getElementById("pais")
    };

    // Validar nombre
    if (campos.nombre.value.trim().length < 2) {
      campos.nombre.classList.add("is-invalid");
      valido = false;
    } else {
      campos.nombre.classList.remove("is-invalid");
      campos.nombre.classList.add("is-valid");
    }

    // Validar apellidos
    if (campos.apellidos.value.trim().length < 2) {
      campos.apellidos.classList.add("is-invalid");
      valido = false;
    } else {
      campos.apellidos.classList.remove("is-invalid");
      campos.apellidos.classList.add("is-valid");
    }

    // Validar CP
    const cpRegex = /^[0-9]{5}$/;
    if (!cpRegex.test(campos.cp.value)) {
      campos.cp.classList.add("is-invalid");
      valido = false;
    } else {
      campos.cp.classList.remove("is-invalid");
      campos.cp.classList.add("is-valid");
    }

    // Validar país
    if (!campos.pais.value || campos.pais.value.trim().length < 2) {
      valido = false;
    }

    // Si todo es válido
    if (valido) {
      const notificacion = document.getElementById("notificacion-direccion");
      notificacion.classList.add("mostrar");

      setTimeout(() => {
        notificacion.classList.remove("mostrar");
      }, 3000);

      formDireccion.reset();
      formDireccion.querySelectorAll(".is-valid").forEach(el => {
        el.classList.remove("is-valid");
      });
    }
  });
}

// ==================== PRODUCTOS - GESTIÓN COMPLETA ====================

function obtenerProductos() {
  const productos = localStorage.getItem("productos");
  return productos ? JSON.parse(productos) : [];
}

function guardarProductos(productos) {
  localStorage.setItem("productos", JSON.stringify(productos));
}

function cargarProductos() {
  const contenedorProductos = document.getElementById("lista-productos");
  if (!contenedorProductos) return;

  const productos = obtenerProductos();

  if (productos.length === 0) {
    contenedorProductos.innerHTML = `
      <div class="text-center py-4 text-muted">
        <i class="bi bi-box-seam" style="font-size: 3rem;"></i>
        <p class="mt-2">No tienes productos agregados aún</p>
      </div>
    `;
    return;
  }

  contenedorProductos.innerHTML = "";

  productos.forEach(producto => {
    const productoHTML = crearProductoHTML(producto);
    contenedorProductos.insertAdjacentHTML("beforeend", productoHTML);
  });

  // Agregar eventos a los botones
  document.querySelectorAll(".btn-eliminar-producto").forEach(btn => {
    btn.addEventListener("click", function () {
      const id = parseInt(this.dataset.id);
      eliminarProducto(id);
    });
  });

  document.querySelectorAll(".btn-editar-producto").forEach(btn => {
    btn.addEventListener("click", function () {
      const id = parseInt(this.dataset.id);
      editarProducto(id);
    });
  });
}

function crearProductoHTML(producto) {
  const badgeClass = producto.etiqueta === "Nuevo" ? "bg-dark" : "bg-primary";
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

function eliminarProducto(id) {
  if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) {
    return;
  }

  let productos = obtenerProductos();
  productos = productos.filter(p => p.id !== id);
  guardarProductos(productos);

  alert("✅ Producto eliminado correctamente");
  cargarProductos();
}

function editarProducto(id) {
  const productos = obtenerProductos();
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    alert("Producto no encontrado");
    return;
  }

  // Llenar el formulario de edición
  document.getElementById("edit-producto-id").value = producto.id;
  document.getElementById("edit-nombre").value = producto.nombre;
  document.getElementById("edit-categoria").value = producto.categoria;
  document.getElementById("edit-descripcion").value = producto.descripcion;
  document.getElementById("edit-material").value = producto.material;
  document.getElementById("edit-precio").value = producto.precio;
  document.getElementById("edit-stock").value = producto.stock;
  document.getElementById("edit-etiqueta").value = producto.etiqueta;
  document.getElementById("edit-imagen").value = producto.imagen || "";

  // Marcar las tallas seleccionadas
  const tallasArray = producto.tallas.split(", ");
  document.querySelectorAll(".edit-talla").forEach(checkbox => {
    checkbox.checked = tallasArray.includes(checkbox.value);
  });

  // Mostrar el modal
  const modal = new bootstrap.Modal(document.getElementById("modalEditarProducto"));
  modal.show();
}

function guardarEdicionProducto() {
  const id = parseInt(document.getElementById("edit-producto-id").value);
  const nombre = document.getElementById("edit-nombre").value;
  const categoria = document.getElementById("edit-categoria").value;
  const descripcion = document.getElementById("edit-descripcion").value;
  const material = document.getElementById("edit-material").value;
  const precio = parseFloat(document.getElementById("edit-precio").value);
  const stock = parseInt(document.getElementById("edit-stock").value);
  const etiqueta = document.getElementById("edit-etiqueta").value;
  const imagen = document.getElementById("edit-imagen").value;

  // Obtener tallas seleccionadas
  const tallasSeleccionadas = [];
  document.querySelectorAll(".edit-talla:checked").forEach(checkbox => {
    tallasSeleccionadas.push(checkbox.value);
  });

  // Validaciones
  if (!nombre || !categoria || !descripcion || !material || !precio || !stock) {
    alert("Por favor completa todos los campos obligatorios (*)");
    return;
  }

  if (tallasSeleccionadas.length === 0) {
    alert("Por favor selecciona al menos una talla");
    return;
  }

  // Obtener productos y actualizar
  let productos = obtenerProductos();
  const index = productos.findIndex(p => p.id === id);

  if (index === -1) {
    alert("Error: Producto no encontrado");
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
    etiqueta: etiqueta || "Activo",
    tallas: tallasSeleccionadas.join(", "),
    imagen: imagen || null
  };

  // Guardar cambios
  guardarProductos(productos);

  // Cerrar modal
  const modal = bootstrap.Modal.getInstance(document.getElementById("modalEditarProducto"));
  modal.hide();

  // Recargar productos
  cargarProductos();

  // Mensaje de éxito
  alert("✅ Producto actualizado correctamente");
}

function configurarFormularioProducto() {
  const form = document.getElementById("form-agregar-producto");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // 1. Captura de valores (Asegúrate de que estos IDs existan en tu HTML)
    const nombre = document.getElementById("producto-nombre").value.trim();
    const categoria = document.getElementById("producto-categoria").value;
    const descripcion = document.getElementById("producto-descripcion").value.trim();
    const material = document.getElementById("producto-material").value.trim();
    const precioInput = document.getElementById("producto-precio").value;
    const stockInput = document.getElementById("producto-stock").value;
    const etiqueta = document.getElementById("producto-etiqueta")?.value.trim() || "Activo";
    
    // Captura de la URL de la imagen
    const imagen = document.getElementById("producto-imagen").value.trim();

    // 2. Obtener tallas seleccionadas
    const tallasSeleccionadas = [];
    document.querySelectorAll(".talla-checkbox:checked").forEach(checkbox => {
      tallasSeleccionadas.push(checkbox.value);
    });

    // 3. Validaciones robustas
    if (!nombre || !categoria || !descripcion || !material || !precioInput || !stockInput) {
      alert("⚠️ Por favor completa todos los campos obligatorios (*)");
      return;
    }

    if (tallasSeleccionadas.length === 0) {
      alert("⚠️ Por favor selecciona al menos una talla");
      return;
    }

    // 4. Crear objeto de producto
    const productos = obtenerProductos();
    const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;

    const nuevoProducto = {
      id: nuevoId,
      nombre: nombre,
      categoria: categoria,
      descripcion: descripcion,
      material: material,
      precio: parseFloat(precioInput),
      stock: parseInt(stockInput),
      etiqueta: etiqueta,
      tallas: tallasSeleccionadas.join(", "),
      imagen: imagen || null // Si está vacío, guarda null
    };

    // 5. Guardar y Actualizar
    productos.push(nuevoProducto);
    guardarProductos(productos);

    alert("✅ Producto agregado correctamente");

    // 6. LIMPIEZA TOTAL
    form.reset(); // Limpia inputs de texto y selects
    
    // Limpieza manual de checkboxes (form.reset() a veces no los desmarca todos)
    document.querySelectorAll(".talla-checkbox").forEach(cb => cb.checked = false);
    
    // Recargar la lista visual
    cargarProductos();
  });
}

function limpiarFormulario() {
  const form = document.getElementById("form-agregar-producto");
  if (form) {
    form.reset();
    document.querySelectorAll(".talla-checkbox").forEach(checkbox => {
      checkbox.checked = false;
    });
  }
}

// ==================== FUNCIÓN PARA CERRAR SESIÓN ====================

function cerrarSesion() {
  if (confirm("¿Estás seguro de que quieres cerrar sesión?")) {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "index.html";
  }
}

