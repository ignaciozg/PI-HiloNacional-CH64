document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById("formulario");
    
    if(!formulario) return;

    formulario.addEventListener("submit", function(e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre");
        const correo = document.getElementById("correo");
        const telefono = document.getElementById("telefono");
        const mensaje = document.getElementById("mensaje-texto");

        // Limpiar
        [nombre, correo, telefono, mensaje].forEach(campo => campo.setCustomValidity(""));

        // Nombre
        const valorNombre = nombre.value.trim();
        const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (valorNombre.length < 3) {
            nombre.setCustomValidity("El nombre debe tener al menos 3 caracteres");
        } else if (!regexNombre.test(valorNombre)) {
            nombre.setCustomValidity("El nombre solo debe contener letras");
        }
        if (!nombre.checkValidity()) { nombre.reportValidity(); return; }

        // Correo
        const valorCorreo = correo.value.trim();
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexCorreo.test(valorCorreo)) {
            correo.setCustomValidity("Ingresa un correo válido (ej: usuario@correo.com)");
            correo.reportValidity(); return;
        }

        // Teléfono
        const valorTelefono = telefono.value.trim();
        const soloNumeros = valorTelefono.replace(/\D/g, ""); 
        if (soloNumeros.length < 10) {
            telefono.setCustomValidity("El número debe tener al menos 10 dígitos.");
        } else if (soloNumeros.match(/0{5,}/)) { 
            telefono.setCustomValidity("Número inválido.");
        }
        if (!telefono.checkValidity()) { telefono.reportValidity(); return; }

        // Mensaje
        const valorMensaje = mensaje.value.trim();
        const palabras = valorMensaje.split(/\s+/).filter(p => p.length > 0);
        if (valorMensaje.length < 20) {
            mensaje.setCustomValidity("El mensaje es muy corto (mínimo 20 caracteres).");
        } else if (palabras.length < 3) {
            mensaje.setCustomValidity("Por favor, escribe una frase completa.");
        }
        if (!mensaje.checkValidity()) { mensaje.reportValidity(); return; }

        alert("Formulario enviado correctamente 🎉");
        formulario.reset();
    });
});