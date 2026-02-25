// --- DATOS COMPLETOS (Sin resumir) ---
const productosBase = [
    { id: 1, titulo: "Camisa blanca con bordado", categoria: "Hombre", precio: 2100, imagen: "./assets/Productos/camisaHombre1.png", descripcion: "Camisa blanca con bordado artesanal en algodón 100%, ideal para eventos formales.", fabric: "Algodón 100%", region: "Sierra Norte, Puebla", cuidados: "Lavar a mano, secar a la sombra", tallas: ["S", "M", "L", "XL"] },
    { id: 2, titulo: "Camisa beige bordado", categoria: "Hombre", precio: 2400, imagen: "./assets/Productos/camisaHombre2.png", descripcion: "Camisa beige con bordado artesanal. Textura ligera ideal para climas cálidos.", fabric: "Lino con bordado", region: "Yucatán", cuidados: "Lavado en seco preferentemente", tallas: ["M", "L", "XL"] },
    { id: 3, titulo: "Blusa pintada a mano", categoria: "Mujer", precio: 1200, imagen: "./assets/Productos/CamisaMujer1.png", descripcion: "Blusa pintada a mano con detalles únicos y diseño floral elaborado con tintes naturales.", fabric: "Algodón pintado a mano", region: "Oaxaca", cuidados: "Lavar con agua fría, no usar blanqueador", tallas: ["S", "M", "L"] },
    { id: 4, titulo: "Set de joyería Onix", categoria: "Accesorios", precio: 590, imagen: "./assets/Productos/collarAretes1.png", descripcion: "Set de collar y aretes con piedra ónix volcánica, pulida a mano.", fabric: "Ónix y Plata .925", region: "Guerrero", cuidados: "Limpiar con paño seco y suave" },
    { id: 5, titulo: "Guayabera negra", categoria: "Hombre", precio: 933, imagen: "./assets/Productos/GuayaberaHombre.png", descripcion: "Guayabera negra clásica con bordado y alforzas tradicionales.", fabric: "Mezcla Algodón y Lino", region: "Veracruz", cuidados: "Planchado a vapor a temperatura media", tallas: ["S", "M", "L", "XL"] },
    { id: 6, titulo: "Sudadera técnicas mixtas", categoria: "Hombre", precio: 980, imagen: "./assets/Productos/HoodieHombre.png", descripcion: "Sudadera con técnicas mixtas: pintura textil y bordado de alta durabilidad.", fabric: "Felpa de Algodón", region: "Estado de México", cuidados: "Lavar al revés, no planchar sobre el estampado", tallas: ["M", "L", "XL"] },
    { id: 7, titulo: "Pantalón natural essence", categoria: "Mujer", precio: 1600, imagen: "./assets/Productos/PantalonesMujer1.png", descripcion: "Pantalón verde con aplicaciones de crochet lateral y corte relajado.", fabric: "Manta pre-lavada", region: "Chiapas", cuidados: "Secar a la sombra, no usar secadora", tallas: ["28", "30", "32"] },
    { id: 8, titulo: "Set de pulseras Swarovski", categoria: "Accesorios", precio: 3323, imagen: "./assets/Productos/Setpulseras1.png", descripcion: "Set de pulseras con cristales Swarovski premium y baño de oro.", fabric: "Cristal Swarovski y Oro 14k laminado", region: "Jalisco", cuidados: "Evitar contacto directo con perfumes y humedad" },
    { id: 9, titulo: "Top Brocade Carmin", categoria: "Mujer", precio: 750, imagen: "./assets/Productos/TopMujer1.png", descripcion: "Top estilizado estilo brocade con tejido en relieve color rojo carmín.", fabric: "Seda Brocada y Poliéster", region: "Tlaxcala", cuidados: "Lavar a mano con jabón neutro", tallas: ["S", "M", "L"] },
    { id: 10, titulo: "Top Brocade Azul", categoria: "Mujer", precio: 750, imagen: "./assets/Productos/TopMujer2.png", descripcion: "Top estilo brocade con tejido firme en azul cobalto profundo.", fabric: "Seda Brocada y Poliéster", region: "Tlaxcala", cuidados: "Lavar a mano con jabón neutro", tallas: ["S", "M", "L"] },
    { id: 11, titulo: "Vestido mesh", categoria: "Mujer", precio: 650, imagen: "./assets/Productos/VestidoMujer1.png", descripcion: "Vestido mesh ligero con transparencias modernas, ideal para playa.", fabric: "Malla de Poliéster expandible", region: "Morelos", cuidados: "Usar ciclo delicado o red de lavado", tallas: ["S", "M", "L"] },
    { id: 12, titulo: "Vestido de gala Florencia", categoria: "Mujer", precio: 7500, imagen: "./assets/Productos/vestidoMujer2.png", descripcion: "Obra maestra de alta costura con aplicaciones de encaje sobre seda pura.", fabric: "Seda cruda y Encaje francés", region: "Hidalgo", cuidados: "Exclusivo limpieza profesional en tintorería", tallas: ["S", "M", "L"] }
];

let carrito = JSON.parse(localStorage.getItem("carrito_hilo")) || [];
let favoritos = JSON.parse(localStorage.getItem("favs_hilo")) || [];

// --- MOSTRAR PRODUCTOS ---
function mostrarProductos(lista) {
    const contenedor = document.getElementById("contenedor-productos");
    if (!contenedor) return;
    contenedor.innerHTML = "";

    lista.forEach(p => {
        const esFav = favoritos.some(f => f.id === p.id);
        const col = document.createElement("div");
        col.className = "col-6 col-md-4 col-lg-3";
        
        // Agregada la clase "card" para heredar el fondo del Modo Oscuro del main.css
        col.innerHTML = `
            <div class="product-card card border-0" data-description="${p.descripcion}" data-fabric="${p.fabric || ''}" onclick="abrirDetalle(${p.id})">
                <div class="product-img-wrapper">
                    <img src="${p.imagen}" alt="${p.titulo}">
                    <button class="btn-wishlist ${esFav ? 'text-danger' : ''}" onclick="event.stopPropagation(); toggleFav(${p.id})">
                        <i class="bi ${esFav ? 'bi-heart-fill' : 'bi-heart'}"></i>
                    </button>
                </div>
                <div class="card-body p-2">
                    <div class="product-category small mb-1">${p.categoria}</div>
                    <div class="product-title fw-bold mb-1">${p.titulo}</div>
                    <div class="product-price fw-bold" style="color: var(--primary-color);">$${p.precio}</div>
                </div>
            </div>`;
        contenedor.appendChild(col);
    });
}

// --- FAVORITOS ---
window.toggleFav = (id) => {
    const index = favoritos.findIndex(f => f.id === id);
    if (index > -1) {
        favoritos.splice(index, 1);
    } else {
        favoritos.push(productosBase.find(p => p.id === id));
    }
    localStorage.setItem("favs_hilo", JSON.stringify(favoritos));
    inicializarUI();
    
    // Refrescar galería manteniendo el filtro actual
    const filtroActivo = document.querySelector(".filter-btn.active");
    const categoria = filtroActivo ? filtroActivo.innerText : "Todos";
    mostrarProductos(categoria === "Todos" ? productosBase : productosBase.filter(p => p.categoria === categoria));
};

// --- CARRITO ---
window.agregarAlCarrito = (id) => {
    const index = carrito.findIndex(item => item.id === id);
    if (index > -1) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push({ ...productosBase.find(p => p.id === id), cantidad: 1 });
    }
    localStorage.setItem("carrito_hilo", JSON.stringify(carrito));
    inicializarUI();
    new bootstrap.Offcanvas(document.getElementById('offcanvasCarrito')).show();
};

window.eliminarDelCarrito = (id) => {
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem("carrito_hilo", JSON.stringify(carrito));
    inicializarUI();
};

// --- ACTUALIZAR INTERFAZ GLOBAL ---
window.inicializarUI = () => {
    const contadorFav = document.getElementById("contador-favoritos");
    const contadorCar = document.getElementById("contador-carrito");
    const listaFav = document.getElementById("lista-favoritos");
    const listaCar = document.getElementById("lista-carrito");
    const totalCar = document.getElementById("total-carrito");

    // Actualizar contadores
    if (contadorFav) {
        contadorFav.innerText = favoritos.length;
        contadorFav.style.display = favoritos.length > 0 ? "block" : "none";
    }
    
    if (contadorCar) {
        const totalItems = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
        contadorCar.innerText = totalItems;
        contadorCar.style.display = totalItems > 0 ? "block" : "none";
    }

    // Renderizar Offcanvas de Favoritos
    if (listaFav) {
        listaFav.innerHTML = favoritos.length === 0 ? '<p class="text-center py-5 small">No tienes favoritos aún.</p>' : "";
        favoritos.forEach(p => {
            listaFav.innerHTML += `
                <div class="d-flex align-items-center mb-3 border-bottom border-secondary pb-2">
                    <img src="${p.imagen}" width="40" class="me-3 rounded shadow-sm">
                    <div class="flex-grow-1">
                        <small class="d-block fw-bold">${p.titulo}</small>
                        <small style="color: var(--primary-color);">$${p.precio}</small>
                    </div>
                    <button class="btn btn-sm text-danger" onclick="toggleFav(${p.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>`;
        });
    }

    // Renderizar Offcanvas de Carrito
    if (listaCar) {
        let total = 0;
        listaCar.innerHTML = carrito.length === 0 ? '<p class="text-center py-5 small">El carrito está vacío.</p>' : "";
        carrito.forEach(p => {
            total += p.precio * p.cantidad;
            listaCar.innerHTML += `
                <div class="d-flex align-items-center mb-3 border-bottom border-secondary pb-2">
                    <img src="${p.imagen}" width="45" class="me-3 rounded">
                    <div class="flex-grow-1">
                        <small class="d-block fw-bold">${p.titulo}</small>
                        <small>Cant: ${p.cantidad}</small> — <small>$${p.precio * p.cantidad}</small>
                    </div>
                    <button class="btn btn-sm text-danger" onclick="eliminarDelCarrito(${p.id})">
                        <i class="bi bi-x-circle"></i>
                    </button>
                </div>`;
        });
        
        if (totalCar) {
            totalCar.innerText = `$${total.toFixed(2)}`;
        }
    }
};

// --- MODAL DE DETALLES ---
window.abrirDetalle = (id) => {
    const producto = productosBase.find(x => x.id === id);
    if (!producto) return;

    document.getElementById("productModalLabel").innerText = producto.titulo;
    document.getElementById("productModalImg").src = producto.imagen;
    document.getElementById("productModalDesc").innerText = producto.descripcion;
    document.getElementById("productFabric").innerText = producto.fabric;
    document.getElementById("productRegion").innerText = producto.region;
    document.getElementById("productCare").innerText = producto.cuidados;
    document.getElementById("productModalPrice").innerText = `$${producto.precio}`;
    
    // Gestión de tallas
    const seccionTallas = document.getElementById("sizeSection");
    if (producto.tallas) {
        seccionTallas.classList.remove("d-none");
        document.getElementById("productSize").innerHTML = producto.tallas.map(t => `<option value="${t}">${t}</option>`).join("");
    } else {
        seccionTallas.classList.add("d-none");
    }

    // Configurar acción del botón comprar
    document.getElementById("btn-modal-carrito").onclick = () => {
        agregarAlCarrito(producto.id);
        bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
    };

    new bootstrap.Modal(document.getElementById('productModal')).show();
};

// --- TOGGLE DE TEMA MODO OSCURO ---
window.setupTheme = () => {
    const themeToggleBtn = document.getElementById("theme-toggle");
    if (!themeToggleBtn) return;
    
    themeToggleBtn.addEventListener("click", () => {
        const temaActual = document.documentElement.getAttribute("data-theme");
        const nuevoTema = temaActual === "dark" ? "light" : "dark";
        
        document.documentElement.setAttribute("data-theme", nuevoTema);
        localStorage.setItem("theme", nuevoTema);
        
        const icono = themeToggleBtn.querySelector("i");
        icono.className = nuevoTema === "dark" ? "bi bi-sun-fill" : "bi bi-moon-fill";
    });

    // Sincronizar icono inicial
    if (localStorage.getItem("theme") === "dark") {
        themeToggleBtn.querySelector("i").className = "bi bi-sun-fill";
    }
};

// --- BUSCADOR EN TIEMPO REAL ---
window.setupSearch = () => {
    const inputBuscar = document.getElementById("input-buscar");
    if (!inputBuscar) return;

    inputBuscar.addEventListener("input", (evento) => {
        const textoBusqueda = evento.target.value.toLowerCase();
        const productosFiltrados = productosBase.filter(producto => 
            producto.titulo.toLowerCase().includes(textoBusqueda) || 
            producto.categoria.toLowerCase().includes(textoBusqueda)
        );
        mostrarProductos(productosFiltrados);
        
        // Limpiar botones de categoría
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        document.querySelector(".filter-btn:first-child").classList.add("active"); // "Todos"
    });
};

// --- BOTONES DE CATEGORÍA ---
document.querySelectorAll(".filter-btn").forEach(boton => {
    boton.addEventListener("click", (evento) => {
        // Estilos de botones
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        evento.target.classList.add("active");
        
        // Lógica de filtrado
        const categoria = evento.target.innerText;
        const productosFiltrados = categoria === "Todos" ? productosBase : productosBase.filter(p => p.categoria === categoria);
        mostrarProductos(productosFiltrados);
        
        // Limpiar input de búsqueda
        const inputBuscar = document.getElementById("input-buscar");
        if(inputBuscar) inputBuscar.value = "";
    });
});

// --- INICIALIZACIÓN GLOBAL AL CARGAR EL DOM ---
document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos(productosBase);
    // El navbar se encarga de llamar a inicializarUI(), setupTheme() y setupSearch()
});