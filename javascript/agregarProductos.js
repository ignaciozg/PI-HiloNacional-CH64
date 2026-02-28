document.getElementById("btnAgregar").addEventListener("click", function() {
    
    const campos = {
        nombre: document.getElementById("nombre"),
        categoria: document.getElementById("categoria"),
        descripcion: document.getElementById("descripcion"),
        material: document.getElementById("material"),
        precio: document.getElementById("precio"),
        stock: document.getElementById("stock"),
        etiqueta: document.getElementById("etiqueta")
    };

    function limpiarErrores() {
        Object.keys(campos).forEach(id => {
            const spanError = document.getElementById("error-" + id);
            if (spanError) spanError.innerText = "";
            campos[id].classList.remove("is-invalid");
        });
        document.getElementById("error-tallas").innerText = "";
    }

    limpiarErrores();
    let esValido = true;

    const setError = (id, msg) => {
        const spanError = document.getElementById("error-" + id);
        if (spanError) spanError.innerText = msg;
        campos[id].classList.add("is-invalid");
        esValido = false;
    };

    // --- VALIDACIONES ---
    if (campos.nombre.value.trim().length < 3) setError("nombre", "Mínimo 3 caracteres.");
    if (!campos.categoria.value || campos.categoria.value.includes("Selecciona")) setError("categoria", "Selecciona una categoría.");
    if (campos.descripcion.value.trim().length < 15) setError("descripcion", "Mínimo 15 caracteres.");
    if (campos.material.value.trim().length < 4) setError("material", "Especifica el material.");
    if (campos.precio.value === "" || parseFloat(campos.precio.value) <= 0) setError("precio", "Precio mayor a 0.");
    if (campos.stock.value === "" || parseInt(campos.stock.value) < 0) setError("stock", "Stock no negativo.");

    // Validación Etiqueta
    const valorEtiqueta = campos.etiqueta.value.trim();
    if (valorEtiqueta.length > 0 && valorEtiqueta.length < 3) {
        setError("etiqueta", "La etiqueta es muy corta (mínimo 3 letras).");
    }

    const tallasChecked = document.querySelectorAll('.btn-check:checked');
    if (tallasChecked.length === 0) {
        document.getElementById("error-tallas").innerText = "Selecciona al menos una talla.";
        esValido = false;
    }

    // --- LÓGICA DE SCROLL Y ENVÍO ---
    if (esValido) {
        const nuevoProducto = {
            nombre: campos.nombre.value.trim(),
            etiqueta: valorEtiqueta || "Sin etiqueta",
            tallas: Array.from(tallasChecked).map(cb => cb.id),
            fecha: new Date().toISOString()
        };

        console.log("JSON:", nuevoProducto);

        Swal.fire({
            title: "¡Producto registrado!",
            text: "Datos de Hilo Nacional guardados correctamente.",
            icon: "success",
            confirmButtonColor: "#7c3aed"
        });

        document.getElementById("formProducto").reset();
        document.querySelectorAll('.btn-check').forEach(cb => cb.checked = false);
    } else {
        // BUSCAR EL PRIMER ERROR Y HACER SCROLL
        const primerError = document.querySelector(".is-invalid") || document.querySelector(".error-text:not(:empty)");
        if (primerError) {
            primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});