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

    // ✅ TELÉFONO (FORMATO PROFESIONAL)
    const valorTelefono = telefono.value.trim();
    const soloNumeros = valorTelefono.replace(/\D/g, ""); 
    
    const regexTelCompleto = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    
    // Formato
    if (!regexTelCompleto.test(valorTelefono)) {
        telefono.setCustomValidity("Ingresa un formato válido (ej: +52 (331) 123-4567)");
    } 
    // 10 numeros min
    else if (soloNumeros.length < 10) {
        telefono.setCustomValidity("El número debe tener al menos 10 dígitos reales.");
    }
    // No empezar con 0
    else if (soloNumeros.startsWith("0")) {
        telefono.setCustomValidity("Un número de teléfono real no puede empezar con 0.");
    }
    // No numeros repetidos
    else if (new Set(soloNumeros).size === 1) {
        telefono.setCustomValidity("No se permiten números repetidos (ej: 111...).");
    }
    else if (soloNumeros.match(/0{5,}/)) { 
        // No mas de 5 0
        telefono.setCustomValidity("Por favor, ingresa un número de teléfono real.");
    }
    else if (soloNumeros === "1234567890" || soloNumeros === "1234567891") {
        telefono.setCustomValidity("Ingresa un número real, no una secuencia.");
    }
    else {
        telefono.setCustomValidity("");
    }

    if (!telefono.checkValidity()) {
        telefono.reportValidity();
        return;
    }

    // ✅ MENSAJE
  mensaje.setCustomValidity(""); // Limpiamos errores previos

const valorMensaje = mensaje.value.trim();

// Regex para detectar letras repetidas 
const regexRepeticion = /(.)\1{3,}/;

// Contar palabras 
const palabras = valorMensaje.split(/\s+/).filter(p => p.length > 0);

// Validar longitud básica
if (valorMensaje.length < 20) {
    mensaje.setCustomValidity("❌ El mensaje es muy corto (mínimo 20 caracteres).");
} 
// Validar si hay letras o simbolos repetidos sin sentido
else if (regexRepeticion.test(valorMensaje)) {
    mensaje.setCustomValidity("❌ El mensaje tiene demasiados caracteres repetidos.");
}
// Validar que tenga al menos 3 palabras 
else if (palabras.length < 3) {
    mensaje.setCustomValidity("❌ Por favor, escribe una frase completa (mínimo 3 palabras).");
}
// Validar que no sea solo javabasura numérica 
else if (!/[a-zA-ZñÑáéíóúÁÉÍÓÚ]/.test(valorMensaje)) {
    mensaje.setCustomValidity("❌ El mensaje debe contener texto legible.");
}

// Mostrar el error si algo falló
if (!mensaje.checkValidity()) {
    mensaje.reportValidity();
    return;
}

    // ✅ TODO OK
    alert("Formulario enviado correctamente 🎉");
    document.getElementById("formulario").reset();
});