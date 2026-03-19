document.getElementById("formulario").addEventListener("submit", function(e) {
    e.preventDefault();

    // Referencias y limpieza inicial
    const campos = {
        nombre: document.getElementById("nombre"),
        correo: document.getElementById("correo"),
        telefono: document.getElementById("telefono"),
        mensaje: document.getElementById("mensaje-texto")
    };

    function limpiarErrores() {
        Object.keys(campos).forEach(id => {
            const spanError = document.getElementById("error-" + (id === "mensaje" ? "mensaje" : id));
            if (spanError) spanError.innerText = "";
            campos[id].classList.remove("is-invalid");
        });
    }

    limpiarErrores();
    let esValido = true;

    // --- FUNCION AUXILIAR PARA MOSTRAR ERROR ---
    const setError = (id, msg) => {
        const targetId = id === "mensaje" ? "error-mensaje" : "error-" + id;
        document.getElementById(targetId).innerText = msg;
        campos[id].classList.add("is-invalid");
        esValido = false;
    };

    // ✅ VALIDACIÓN NOMBRE
    const valorNombre = campos.nombre.value.trim();
    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (valorNombre.length < 3) {
        setError("nombre", "Mínimo 3 caracteres.");
    } else if (!regexNombre.test(valorNombre)) {
        setError("nombre", "Solo se permiten letras.");
    }

    // ✅ VALIDACIÓN CORREO
    const valorCorreo = campos.correo.value.trim();
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(valorCorreo)) {
        setError("correo", "Ingresa un correo válido (ej: usuario@correo.com).");
    }

    // ✅ VALIDACIÓN TELÉFONO 
    const valorTelefono = campos.telefono.value.trim();
    const soloNumeros = valorTelefono.replace(/\D/g, "");
    const regexTelCompleto = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    if (!regexTelCompleto.test(valorTelefono)) {
        setError("telefono", "Formato inválido (ej: +52 331 123 4567).");
    } else if (soloNumeros.length < 10) {
        setError("telefono", "El número debe tener al menos 10 dígitos.");
    } else if (soloNumeros.startsWith("0")) {
        setError("telefono", "No puede empezar con 0.");
    } else if (new Set(soloNumeros).size === 1) {
        setError("telefono", "No se permiten números repetidos (ej: 111...).");
    } else if (soloNumeros.match(/0{5,}/)) {
        setError("telefono", "Ingresa un número de teléfono real.");
    } else if (soloNumeros === "1234567890" || soloNumeros === "1234567891") {
        setError("telefono", "No uses secuencias numéricas.");
    }

    // ✅ VALIDACIÓN MENSAJE 
    const valorMensaje = campos.mensaje.value.trim();
    const regexRepeticion = /(.)\1{3,}/;
    const palabras = valorMensaje.split(/\s+/).filter(p => p.length > 0);

    if (valorMensaje.length < 10) {
        setError("mensaje", "Mínimo 10 caracteres.");
    } else if (regexRepeticion.test(valorMensaje)) {
        setError("mensaje", "Demasiados caracteres repetidos.");
    } else if (palabras.length < 3) {
        setError("mensaje", "Escribe una frase completa (mínimo 3 palabras).");
    } else if (!/[a-zA-ZñÑáéíóúÁÉÍÓÚ]/.test(valorMensaje)) {
        setError("mensaje", "El mensaje debe contener texto legible.");
    }

    // --- ENVIAR SI TODO ESTÁ BIEN ---
    if (esValido) {
        const formData = new FormData(this);

    fetch(this.action, {
        method: this.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            Swal.fire({
                title: "¡Formulario enviado con éxito!",
                text: "📩",
                icon: "success"
            });
            this.reset();
        } else {
            throw new Error("Error en el envío");
        }
    })
    .catch(error => {
        Swal.fire({
            title: "Error",
            text: "No se pudo enviar el formulario 😢",
            icon: "error"
    });
    });
    }
    });