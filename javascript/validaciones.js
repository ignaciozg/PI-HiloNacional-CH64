document.getElementById("formulario").addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const telefono = document.getElementById("telefono");
    const mensaje = document.getElementById("mensaje-texto");

    // Limpiar mensajes previos
    [nombre, correo, telefono, mensaje].forEach(campo => campo.setCustomValidity(""));

    // ✅ NOMBRE
    const valorNombre = nombre.value.trim();
    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if (valorNombre.length < 3) {
        nombre.setCustomValidity("El nombre debe tener al menos 3 caracteres");
        nombre.reportValidity();
        return;
    }

    if (!regexNombre.test(valorNombre)) {
        nombre.setCustomValidity("El nombre solo debe contener letras");
        nombre.reportValidity();
        return;
    }

    // ✅ CORREO
    const valorCorreo = correo.value.trim();
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexCorreo.test(valorCorreo)) {
        correo.setCustomValidity("Ingresa un correo válido (ej: usuario@correo.com)");
        correo.reportValidity();
        return;
    }

    // ✅ TELÉFONO
    const valorTelefono = telefono.value.trim();

    if (!/^\d{10}$/.test(valorTelefono)) {
        telefono.setCustomValidity("El teléfono debe contener exactamente 10 números");
        telefono.reportValidity();
        return;
    }

    // ✅ MENSAJE
    const valorMensaje = mensaje.value.trim();

    if (valorMensaje.length < 20) {
        mensaje.setCustomValidity("El mensaje debe tener al menos 20 caracteres");
        mensaje.reportValidity();
        return;
    }

    // ✅ TODO OK
    alert("Formulario enviado correctamente 🎉");
    document.getElementById("formulario").reset();
});