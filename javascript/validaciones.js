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

    // ✅ TELÉFONO (FORMATO FLEXIBLE)
const valorTelefono = telefono.value.trim();

// Expresion de ihateregex
const regexTelCompleto = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

if (!regexTelCompleto.test(valorTelefono)) {
    telefono.setCustomValidity("Ingresa un formato válido (ej: +52 (331) 123-4567 o 10 dígitos)");
    telefono.reportValidity();
    return;
} else {
    // Limpiar la validación si el número es correcto
    telefono.setCustomValidity("");
}

    // ✅ MENSAJE
  mensaje.setCustomValidity(""); // Limpiamos errores previos

const valorMensaje = mensaje.value.trim();

// 1. Regex para detectar letras repetidas (más de 3 veces seguidas)
// Ejemplo: bloquear "holaaaaaa" o ".......", pero permitir "acción"
const regexRepeticion = /(.)\1{3,}/;

// 2. Contar palabras (dividimos por espacios y filtramos los vacíos)
const palabras = valorMensaje.split(/\s+/).filter(p => p.length > 0);

// --- EMPIEZAN LAS VALIDACIONES REALES ---

// A. Validar longitud básica
if (valorMensaje.length < 20) {
    mensaje.setCustomValidity("❌ El mensaje es muy corto (mínimo 20 caracteres).");
} 
// B. Validar si hay letras/símbolos repetidos sin sentido (ej: "aaaaa" o ".....")
else if (regexRepeticion.test(valorMensaje)) {
    mensaje.setCustomValidity("❌ El mensaje tiene demasiados caracteres repetidos.");
}
// C. Validar que tenga al menos 3 palabras (un mensaje real tiene estructura)
else if (palabras.length < 3) {
    mensaje.setCustomValidity("❌ Por favor, escribe una frase completa (mínimo 3 palabras).");
}
// D. Validar que no sea solo "basura" numérica o de símbolos
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