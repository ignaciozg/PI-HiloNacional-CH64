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

// --- BUSCADOR ---
window.setupSearch = () => {
  const input = document.getElementById("input-buscar");
  if (!input) return;
  input.oninput = (e) => {
    const val = e.target.value.toLowerCase();
    mostrarProductos(
      productosBase.filter(
        (p) =>
          p.titulo.toLowerCase().includes(val) ||
          p.categoria.toLowerCase().includes(val),
      ),
    );
  };
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
                            <p class="mb-0 small text-muted">${p.cantidad} x $${p.precio}</p>
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
  const idx = carrito.findIndex((p) => p.id === id);
  if (idx > -1) carrito[idx].cantidad++;
  else carrito.push({ ...productosBase.find((p) => p.id === id), cantidad: 1 });
  localStorage.setItem("carrito_hilo", JSON.stringify(carrito));
  inicializarUI();
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
