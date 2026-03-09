const productosBase = [
  {
    id: 1,
    titulo: "Camisa blanca con bordado",
    categoria: "Hombre",
    precio: 2100,
    imagen: "./assets/Productos/camisaHombre1.png",
    descripcion: "Algodón 100% con bordado artesanal de la Sierra Norte.",
    fabric: "Algodón 100%",
    region: "Puebla",
    cuidados: "Lavar a mano",
    tallas: ["S", "M", "L"],
  },
  {
    id: 2,
    titulo: "Camisa beige bordado",
    categoria: "Hombre",
    precio: 2400,
    imagen: "./assets/Productos/camisaHombre2.png",
    descripcion: "Lino ligero con bordados yucatecos tradicionales.",
    fabric: "Lino",
    region: "Yucatán",
    cuidados: "Lavado en seco",
    tallas: ["M", "L", "XL"],
  },
  {
    id: 3,
    titulo: "Blusa pintada a mano",
    categoria: "Mujer",
    precio: 1200,
    imagen: "./assets/Productos/CamisaMujer1.png",
    descripcion: "Diseño floral único pintado con tintes naturales.",
    fabric: "Algodón",
    region: "Oaxaca",
    cuidados: "Agua fría",
    tallas: ["S", "M"],
  },
  {
    id: 4,
    titulo: "Set de joyería Onix",
    categoria: "Accesorios",
    precio: 590,
    imagen: "./assets/Productos/collarAretes1.png",
    descripcion: "Ónix volcánico pulido con aplicaciones de plata.",
    fabric: "Ónix y Plata",
    region: "Guerrero",
    cuidados: "Paño seco",
  },
  {
    id: 5,
    titulo: "Guayabera negra",
    categoria: "Hombre",
    precio: 933,
    imagen: "./assets/Productos/GuayaberaHombre.png",
    descripcion: "Clásica guayabera con alforzas tradicionales.",
    fabric: "Lino",
    region: "Veracruz",
    cuidados: "Plancha tibia",
    tallas: ["M", "L", "XL"],
  },
  {
    id: 6,
    titulo: "Sudadera técnicas mixtas",
    categoria: "Hombre",
    precio: 980,
    imagen: "./assets/Productos/HoodieHombre.png",
    descripcion: "Arte textil contemporáneo sobre felpa de alta calidad.",
    fabric: "Algodón",
    region: "Edomex",
    cuidados: "Lavar al revés",
    tallas: ["S", "M", "L"],
  },
  {
    id: 7,
    titulo: "Pantalón natural essence",
    categoria: "Mujer",
    precio: 1600,
    imagen: "./assets/Productos/PantalonesMujer1.png",
    descripcion: "Manta prelavada con detalles en crochet.",
    fabric: "Manta",
    region: "Chiapas",
    cuidados: "No usar secadora",
    tallas: ["28", "30", "32"],
  },
  {
    id: 8,
    titulo: "Set pulseras Swarovski",
    categoria: "Accesorios",
    precio: 3323,
    imagen: "./assets/Productos/Setpulseras1.png",
    descripcion: "Cristales premium con baño de oro de 14k.",
    fabric: "Oro y Cristal",
    region: "Jalisco",
    cuidados: "Evitar perfumes",
  },
  {
    id: 9,
    titulo: "Top Brocade Carmin",
    categoria: "Mujer",
    precio: 750,
    imagen: "./assets/Productos/TopMujer1.png",
    descripcion: "Tejido en relieve color carmín profundo.",
    fabric: "Seda",
    region: "Tlaxcala",
    cuidados: "Lavar a mano",
    tallas: ["S", "M"],
  },
  {
    id: 10,
    titulo: "Top Brocade Azul",
    categoria: "Mujer",
    precio: 750,
    imagen: "./assets/Productos/TopMujer2.png",
    descripcion: "Tejido brocado en azul cobalto.",
    fabric: "Seda",
    region: "Tlaxcala",
    cuidados: "Lavar a mano",
    tallas: ["S", "M"],
  },
  {
    id: 11,
    titulo: "Vestido mesh",
    categoria: "Mujer",
    precio: 650,
    imagen: "./assets/Productos/VestidoMujer1.png",
    descripcion: "Transparencias modernas con bordado sutil.",
    fabric: "Malla",
    region: "Morelos",
    cuidados: "Ciclo delicado",
    tallas: ["S", "M", "L"],
  },
  {
    id: 12,
    titulo: "Vestido gala Florencia",
    categoria: "Mujer",
    precio: 7500,
    imagen: "./assets/Productos/vestidoMujer2.png",
    descripcion: "Alta costura artesanal en seda pura.",
    fabric: "Seda y Encaje",
    region: "Hidalgo",
    cuidados: "Tintorería",
    tallas: ["S", "M"],
  },
];

let carrito = JSON.parse(localStorage.getItem("carrito_hilo")) || [];
let favoritos = JSON.parse(localStorage.getItem("favs_hilo")) || [];

// --- MOSTRAR PRODUCTOS ---
window.mostrarProductos = (lista) => {
  const contenedor = document.getElementById("contenedor-productos");
  if (!contenedor) return;
  contenedor.innerHTML = lista
    .map((p) => {
      const esFav = favoritos.some((f) => f.id === p.id);
      return `
            <div class="col-6 col-md-4 col-lg-3">
                <div class="product-card" data-description="${p.descripcion}" onclick="abrirDetalle(${p.id})">
                    <div class="product-img-wrapper">
                        <img src="${p.imagen}" alt="${p.titulo}">
                        <button class="btn-wishlist ${esFav ? "text-danger" : ""}" onclick="event.stopPropagation(); toggleFav(${p.id})">
                            <i class="bi ${esFav ? "bi-heart-fill" : "bi-heart"}"></i>
                        </button>
                    </div>
                    <div class="p-2">
                        <div class="product-category">${p.categoria}</div>
                        <div class="product-title">${p.titulo}</div>
                        <div class="product-price">$${p.precio.toLocaleString()}</div>
                    </div>
                </div>
            </div>`;
    })
    .join("");
};

// --- FILTROS ---
window.inicializarFiltros = () => {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.onclick = (e) => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");
      const cat = e.target.innerText;
      mostrarProductos(
        cat === "Todos"
          ? productosBase
          : productosBase.filter((p) => p.categoria === cat),
      );
    };
  });
};

// --- BUSCADOR CON SUGERENCIAS E IMÁGENES (Y CLIC AL MODAL) ---
window.setupSearch = () => {
  const input = document.getElementById("input-buscar");
  if (!input) return;

  // 1. Crear el contenedor de sugerencias
  let cajaSugerencias = document.getElementById("caja-sugerencias");
  if (!cajaSugerencias) {
    cajaSugerencias = document.createElement("div");
    cajaSugerencias.id = "caja-sugerencias";
    cajaSugerencias.className = "dropdown-menu w-100 shadow-sm mt-1 p-0";
    cajaSugerencias.style.position = "absolute";
    cajaSugerencias.style.top = "100%";
    cajaSugerencias.style.left = "0";
    cajaSugerencias.style.zIndex = "1050";
    cajaSugerencias.style.maxHeight = "350px";
    cajaSugerencias.style.overflowY = "auto";

    const form = input.closest("form");
    if (form) {
      form.style.position = "relative";
      form.appendChild(cajaSugerencias);
    }
  }

  const esPaginaProductos = typeof mostrarProductos !== "undefined";

  // 2. Evento al escribir
  input.addEventListener("input", (e) => {
    const val = e.target.value.trim().toLowerCase();

    if (val === "") {
      cajaSugerencias.classList.remove("show");
      if (esPaginaProductos && typeof productosBase !== "undefined") {
        mostrarProductos(productosBase);
      }
      return;
    }

    if (typeof productosBase !== "undefined") {
      const coincidencias = productosBase.filter(
        (p) =>
          p.titulo.toLowerCase().includes(val) ||
          p.categoria.toLowerCase().includes(val),
      );

      if (esPaginaProductos) {
        mostrarProductos(coincidencias);
      }

      // AQUÍ ES DONDE ESTÁ EL ENLACE CON EL ONCLICK
      if (coincidencias.length > 0) {
        cajaSugerencias.innerHTML = coincidencias
          .slice(0, 6)
          .map(
            (p) => `
          <a href="#" onclick="abrirDetallesProducto(${p.id}); return false;" class="dropdown-item py-2 border-bottom d-flex align-items-center gap-3" style="white-space: normal;">
            <div style="width: 45px; height: 45px; flex-shrink: 0;">
              <img src="${p.imagen}" alt="${p.titulo}" class="img-fluid rounded" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="flex-grow-1 min-w-0">
              <div class="fw-bold text-dark text-truncate">${p.titulo}</div>
              <small class="text-muted d-block text-truncate">${p.categoria}</small>
            </div>
          </a>
        `,
          )
          .join("");
      } else {
        cajaSugerencias.innerHTML = `
          <div class="dropdown-item text-muted py-3 text-center">
            <i class="bi bi-search d-block fs-4 mb-2"></i>
            No se encontraron artesanías...
          </div>`;
      }

      cajaSugerencias.classList.add("show");
    }
  });

  // 3. Ocultar al hacer clic afuera
  document.addEventListener("click", (e) => {
    if (!input.contains(e.target) && !cajaSugerencias.contains(e.target)) {
      cajaSugerencias.classList.remove("show");
    }
  });

  // 4. Presionar "Enter"
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = e.target.value.trim();
      if (val !== "" && !esPaginaProductos) {
        window.location.href = `index.html?buscar=${encodeURIComponent(val)}`;
      }
    }
  });
};

// --- FUNCIÓN PARA LLENAR Y ABRIR TU MODAL (FUNCIONA EN CUALQUIER PÁGINA) ---
window.abrirDetallesProducto = (idProducto) => {
  // 1. Ocultamos la caja de sugerencias
  const cajaSugerencias = document.getElementById("caja-sugerencias");
  if (cajaSugerencias) cajaSugerencias.classList.remove("show");

  if (typeof productosBase === "undefined") return;
  const producto = productosBase.find((p) => p.id === idProducto);

  if (producto) {
    // 2. Buscamos el modal en la página actual
    let modalElement = document.getElementById("productModal");

    // 3. SI EL MODAL NO EXISTE EN ESTA PÁGINA, LO CREAMOS AL VUELO
    if (!modalElement) {
      const modalContainer = document.createElement("div");
      modalContainer.innerHTML = `
        <div class="modal fade" id="productModal" tabindex="-1">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content card border-0 shadow-lg">
              <div class="modal-header border-0 pb-0">
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body p-4">
                <div class="row g-4">
                  <div class="col-md-6 text-center">
                    <img id="productModalImg" src="" class="img-fluid rounded shadow-sm" />
                  </div>
                  <div class="col-md-6">
                    <h4 id="productModalLabel" class="fw-bold mb-3"></h4>
                    <p id="productModalDesc" class="small text-muted"></p>
                    <div class="small border-top pt-3 border-secondary">
                      <p class="mb-1"><strong>Material:</strong> <span id="productFabric"></span></p>
                      <p class="mb-1"><strong>Región:</strong> <span id="productRegion"></span></p>
                      <p class="mb-1"><strong>Cuidado:</strong> <span id="productCare"></span></p>
                    </div>
                    <div id="sizeSection" class="my-3 d-none">
                      <label class="fw-bold small d-block mb-1">Talla:</label>
                      <select id="productSize" class="form-select form-select-sm"></select>
                    </div>
                    <h3 id="productModalPrice" class="fw-bold mt-4" style="color: var(--primary-color)"></h3>
                    <button id="btn-modal-carrito" class="btn w-100 rounded-pill mt-3 py-2 text-white fw-bold shadow-sm" style="background-color: var(--primary-color)">
                      Añadir al Carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      // Lo inyectamos al final del documento
      document.body.appendChild(modalContainer.firstElementChild);

      // Ahora sí, lo seleccionamos
      modalElement = document.getElementById("productModal");
    }

    // 4. Llenamos los datos (igual que antes)
    document.getElementById("productModalImg").src = producto.imagen;
    document.getElementById("productModalImg").alt = producto.titulo;
    document.getElementById("productModalLabel").textContent = producto.titulo;
    document.getElementById("productModalDesc").textContent =
      producto.descripcion;
    document.getElementById("productFabric").textContent = producto.fabric;
    document.getElementById("productRegion").textContent = producto.region;
    document.getElementById("productCare").textContent = producto.cuidados;
    document.getElementById("productModalPrice").textContent =
      `$${producto.precio} MXN`;

    const sizeSection = document.getElementById("sizeSection");
    const productSize = document.getElementById("productSize");

    if (producto.tallas && producto.tallas.length > 0) {
      sizeSection.classList.remove("d-none");
      productSize.innerHTML = producto.tallas
        .map((talla) => `<option value="${talla}">${talla}</option>`)
        .join("");
    } else {
      sizeSection.classList.add("d-none");
      productSize.innerHTML = "";
    }

    // 5. Abrimos el modal
    const modalBootstrap =
      bootstrap.Modal.getInstance(modalElement) ||
      new bootstrap.Modal(modalElement);
    modalBootstrap.show();
  }
};

// --- CARRITO Y FAVS (DROPDOWN COMPATIBLE) ---
// --- RENDERIZADO DE INTERFAZ (CARRITO Y FAVORITOS) ---
window.inicializarUI = () => {
  // Referencias a los contenedores de la Navbar
  const contFav = document.getElementById("contador-favoritos");
  const contCar = document.getElementById("contador-carrito");
  const listFav = document.getElementById("lista-favoritos-dropdown"); // <-- El dropdown de favoritos
  const listCar = document.getElementById("lista-carrito-dropdown");
  const totalCar = document.getElementById("total-carrito-dropdown");

  // Actualizar Contadores
  if (contFav) {
    contFav.innerText = favoritos.length;
    contFav.style.display = favoritos.length > 0 ? "block" : "none";
  }
  if (contCar) {
    const num = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    contCar.innerText = num;
    contCar.style.display = num > 0 ? "block" : "none";
  }

  // Renderizar Lista de Favoritos en el Dropdown
  if (listFav) {
    listFav.innerHTML =
      favoritos.length === 0
        ? '<p class="text-center py-3 small text-muted">No tienes favoritos aún</p>'
        : favoritos
            .map(
              (p) => `
                <div class="d-flex align-items-center mb-2 pb-2 border-bottom">
                    <img src="${p.imagen}" width="40" height="40" class="me-2 rounded object-fit-cover">
                    <div class="flex-grow-1 overflow-hidden">
                        <p class="mb-0 fw-bold small text-truncate" style="color: var(--text-main);">${p.titulo}</p>
                        <p class="mb-0 small" style="color: var(--primary-color);">$${p.precio}</p>
                    </div>
                    <button class="btn btn-sm text-danger" onclick="event.stopPropagation(); toggleFav(${p.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>`,
            )
            .join("");
  }

  // Renderizar Lista de Carrito en el Dropdown
  if (listCar) {
    let total = 0;
    listCar.innerHTML =
      carrito.length === 0
        ? '<p class="text-center py-3 small text-muted">Tu carrito está vacío</p>'
        : carrito
            .map((p) => {
              total += p.precio * p.cantidad;
              return `
              <div class="d-flex align-items-center mb-2 pb-2 border-bottom">
                <img src="${p.imagen}" width="40" height="40" class="me-2 rounded object-fit-cover">
                <div class="flex-grow-1 overflow-hidden">
                  <p class="mb-0 fw-bold small text-truncate" style="color: var(--text-main);">${p.titulo}</p>
                  <p class="mb-0 small text-muted">Talla: ${p.talla || "-"}</p>
                  <div class="d-flex align-items-center mt-1">
                    <button class="btn btn-sm btn-outline-secondary" onclick="event.stopPropagation(); cambiarCantidad(${p.id}, '${p.talla}', 'restar')">-</button>
                    <span class="mx-2">${p.cantidad}</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="event.stopPropagation(); cambiarCantidad(${p.id}, '${p.talla}', 'sumar')">+</button>
                  </div>
                  <p class="mb-0 small text-muted">$${p.precio} c/u</p>
                </div>
                <button class="btn btn-sm text-danger" onclick="event.stopPropagation(); eliminarDelCarrito(${p.id})">
                  <i class="bi bi-x-circle"></i>
                </button>
              </div>`;
            })
            .join("");
    if (totalCar) totalCar.innerText = `$${total.toFixed(2)}`;
  }
};

// Modificamos eliminar para que refresque la UI
window.eliminarDelCarrito = (id) => {
  carrito = carrito.filter((p) => p.id !== id);
  localStorage.setItem("carrito_hilo", JSON.stringify(carrito));
  inicializarUI(); // Refresca el dropdown sin cerrarlo
};

window.toggleFav = (id) => {
  const idx = favoritos.findIndex((f) => f.id === id);
  if (idx > -1) favoritos.splice(idx, 1);
  else favoritos.push(productosBase.find((p) => p.id === id));
  localStorage.setItem("favs_hilo", JSON.stringify(favoritos));
  inicializarUI();
  mostrarProductos(productosBase);
};

window.agregarAlCarrito = (id) => {
  const producto = productosBase.find((p) => p.id === id);
  const tallaSelect = document.getElementById("productSize");
  const tallaElegida = tallaSelect ? tallaSelect.value : null;

  const idx = carrito.findIndex((p) => p.id === id && p.talla === tallaElegida);
  if (idx > -1) {
    carrito[idx].cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1, talla: tallaElegida });
  }

  localStorage.setItem("carrito_hilo", JSON.stringify(carrito));
  inicializarUI();
};

window.cambiarCantidad = (id, talla, accion) => {
  const idx = carrito.findIndex((p) => p.id === id && p.talla === talla);
  if (idx > -1) {
    if (accion === "sumar") carrito[idx].cantidad++;
    else if (accion === "restar") carrito[idx].cantidad--;

    if (carrito[idx].cantidad <= 0) carrito.splice(idx, 1);
    localStorage.setItem("carrito_hilo", JSON.stringify(carrito));
    inicializarUI();
  }
};

window.eliminarDelCarrito = (id) => {
  carrito = carrito.filter((p) => p.id !== id);
  localStorage.setItem("carrito_hilo", JSON.stringify(carrito));
  inicializarUI();
};

window.abrirDetalle = (id) => {
  const p = productosBase.find((x) => x.id === id);
  if (!p) return;
  document.getElementById("productModalLabel").innerText = p.titulo;
  document.getElementById("productModalImg").src = p.imagen;
  document.getElementById("productModalDesc").innerText = p.descripcion;
  document.getElementById("productFabric").innerText = p.fabric;
  document.getElementById("productRegion").innerText = p.region;
  document.getElementById("productCare").innerText = p.cuidados;
  document.getElementById("productModalPrice").innerText = `$${p.precio}`;

  const sec = document.getElementById("sizeSection");
  if (p.tallas) {
    sec.classList.remove("d-none");
    document.getElementById("productSize").innerHTML = p.tallas
      .map((t) => `<option value="${t}">${t}</option>`)
      .join("");
  } else sec.classList.add("d-none");

  document.getElementById("btn-modal-carrito").onclick = () => {
    agregarAlCarrito(p.id);
    bootstrap.Modal.getInstance(document.getElementById("productModal")).hide();
  };
  new bootstrap.Modal(document.getElementById("productModal")).show();
};

window.setupTheme = () => {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  btn.onclick = () => {
    const t =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("theme", t);
  };
};

document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos(productosBase);
});

// --- CARRUSEL DE NOVEDADES (PÁGINA DE INICIO) ---
window.renderizarCarruselNovedades = () => {
  const contenedor = document.getElementById("carrusel-novedades");
  if (!contenedor) return; // Si no estamos en el inicio, no hace nada

  // Vamos a tomar los primeros 6 productos para destacarlos (puedes cambiar esto)
  const productosDestacados = productosBase.slice(0, 6);

  contenedor.innerHTML = productosDestacados
    .map((p) => {
      const esFav = favoritos.some((f) => f.id === p.id);
      return `
            <div class="carousel-item-card flex-shrink-0" style="width: 260px;">
                <div class="card h-100 border-0 shadow-sm product-card" style="cursor: pointer;" onclick="abrirDetalle(${p.id})">
                    <div class="position-relative bg-light" style="height: 220px;">
                        <img src="${p.imagen}" class="w-100 h-100 object-fit-cover rounded-top" alt="${p.titulo}">
                        <button class="btn btn-light rounded-circle position-absolute top-0 end-0 m-2 p-1 lh-1 text-muted btn-wishlist shadow-sm ${esFav ? "text-danger" : ""}" onclick="event.stopPropagation(); toggleFav(${p.id})">
                            <i class="bi ${esFav ? "bi-heart-fill" : "bi-heart"} fs-6 m-1"></i>
                        </button>
                    </div>
                    <div class="card-body p-3">
                        <span class="text-muted text-uppercase fw-bold" style="font-size: 0.65rem; letter-spacing: 0.5px;">${p.categoria}</span>
                        <h6 class="card-title fw-bold font-poppins mt-1 mb-1 text-truncate">${p.titulo}</h6>
                        <p class="card-text fw-bold mb-0 font-inter">$${p.precio.toLocaleString()}</p>
                    </div>
                </div>
            </div>`;
    })
    .join("");

  // --- Lógica de Movimiento del Carrusel ---
  const track = document.getElementById("carrusel-novedades");
  const btnPrev = document.getElementById("btn-prev-novedades");
  const btnNext = document.getElementById("btn-next-novedades");

  // Ancho de la tarjeta + el gap (aprox 280px)
  const scrollAmount = 280;

  if (btnPrev && btnNext) {
    btnNext.onclick = () => {
      track.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };
    btnPrev.onclick = () => {
      track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    };
  }
};

// --- ACTUALIZAR EL DOMContentLoaded ---
// Busca tu evento DOMContentLoaded al final de tu JS y actualízalo para que llame a ambas funciones
document.addEventListener("DOMContentLoaded", () => {
  // Esto es para la página de productos (si no encuentra el contenedor, se detiene sola)
  if (typeof mostrarProductos === "function") {
    mostrarProductos(productosBase);
  }

  // Esto es para cargar el carrusel en el index
  if (typeof renderizarCarruselNovedades === "function") {
    renderizarCarruselNovedades();
  }

  // Esto es para cargar los numeritos del carrito/favoritos
  if (typeof inicializarUI === "function") {
    inicializarUI();
  }
});

/**
 * Lógica para activar filtros mediante el hash de la URL (#)
 */
const manejarFiltroRemoto = () => {
  const hash = window.location.hash;

  if (hash) {
    const targetId = hash.substring(1);
    const elementoDestino = document.getElementById(targetId);

    if (elementoDestino) {
      setTimeout(() => {
        elementoDestino.click();
        elementoDestino.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }
};
document.addEventListener("DOMContentLoaded", manejarFiltroRemoto);
