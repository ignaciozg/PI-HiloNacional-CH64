document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById("formulario");
    
    if(!formulario) return; // Evitar errores si no existe el form

    formulario.addEventListener("submit", function(e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre");
        const correo = document.getElementById("correo");
        const telefono = document.getElementById("telefono");
        const mensaje = document.getElementById("mensaje-texto");

        // Limpiar mensajes previos
        [nombre, correo, telefono, mensaje].forEach(campo => campo.setCustomValidity(""));

        // ✅ VALIDACIÓN NOMBRE
        const valorNombre = nombre.value.trim();
        const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

        if (valorNombre.length < 3) {
            nombre.setCustomValidity("El nombre debe tener al menos 3 caracteres");
        } else if (!regexNombre.test(valorNombre)) {
            nombre.setCustomValidity("El nombre solo debe contener letras");
        }

        if (!nombre.checkValidity()) {
            nombre.reportValidity();
            return;
        }

        // ✅ VALIDACIÓN CORREO
        const valorCorreo = correo.value.trim();
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexCorreo.test(valorCorreo)) {
            correo.setCustomValidity("Ingresa un correo válido (ej: usuario@correo.com)");
            correo.reportValidity();
            return;
        }

        // ✅ VALIDACIÓN TELÉFONO
        const valorTelefono = telefono.value.trim();
        const soloNumeros = valorTelefono.replace(/\D/g, ""); 
        const regexTelCompleto = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        
        if (!regexTelCompleto.test(valorTelefono)) {
            telefono.setCustomValidity("Ingresa un formato válido (ej: +52 (331) 123-4567)");
        } else if (soloNumeros.length < 10) {
            telefono.setCustomValidity("El número debe tener al menos 10 dígitos reales.");
        } else if (soloNumeros.startsWith("0")) {
            telefono.setCustomValidity("Un número de teléfono real no puede empezar con 0.");
        } else if (new Set(soloNumeros).size === 1) {
            telefono.setCustomValidity("No se permiten números repetidos (ej: 111...).");
        } else if (soloNumeros.match(/0{5,}/)) { 
            telefono.setCustomValidity("Por favor, ingresa un número de teléfono real.");
        } else if (soloNumeros === "1234567890" || soloNumeros === "1234567891") {
            telefono.setCustomValidity("Ingresa un número real, no una secuencia.");
        }

        if (!telefono.checkValidity()) {
            telefono.reportValidity();
            return;
        }

        // ✅ VALIDACIÓN MENSAJE
        const valorMensaje = mensaje.value.trim();
        const regexRepeticion = /(.)\1{3,}/;
        const palabras = valorMensaje.split(/\s+/).filter(p => p.length > 0);

        if (valorMensaje.length < 20) {
            mensaje.setCustomValidity("❌ El mensaje es muy corto (mínimo 20 caracteres).");
        } else if (regexRepeticion.test(valorMensaje)) {
            mensaje.setCustomValidity("❌ El mensaje tiene demasiados caracteres repetidos.");
        } else if (palabras.length < 3) {
            mensaje.setCustomValidity("❌ Por favor, escribe una frase completa (mínimo 3 palabras).");
        } else if (!/[a-zA-ZñÑáéíóúÁÉÍÓÚ]/.test(valorMensaje)) {
            mensaje.setCustomValidity("❌ El mensaje debe contener texto legible.");
        }

        if (!mensaje.checkValidity()) {
            mensaje.reportValidity();
            return;
        }

        // ✅ TODO OK
        alert("Formulario enviado correctamente 🎉");
        formulario.reset();
    });
});