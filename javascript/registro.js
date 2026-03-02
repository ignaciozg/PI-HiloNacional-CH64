/**
 * registro_logica.js - Lógica de Registro Hilo Nacional
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("formulario-registro");
    const btnComprador = document.getElementById("btn-soy-comprador");
    const btnVendedor = document.getElementById("btn-soy-vendedor");
    const seccionVendedor = document.getElementById("seccion-vendedor");
    const rolInput = document.getElementById("rol-usuario");

    // --- 1. CAMBIO DE ROL (INTERACTIVIDAD) ---
    const cambiarRol = (esVendedor) => {
        if (esVendedor) {
            btnVendedor.classList.add('active');
            btnComprador.classList.remove('active');
            seccionVendedor.style.display = "block";
            rolInput.value = "vendedor";
        } else {
            btnComprador.classList.add('active');
            btnVendedor.classList.remove('active');
            seccionVendedor.style.display = "none";
            rolInput.value = "comprador";
        }
    };

    btnComprador.addEventListener('click', () => cambiarRol(false));
    btnVendedor.addEventListener('click', () => cambiarRol(true));

    // --- 2. VALIDACIÓN Y GUARDADO ---
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        // Referencias a campos
        const campos = {
            nombre: document.getElementById("nombre"),
            correo: document.getElementById("correo"),
            password: document.getElementById("password"),
            confirm: document.getElementById("confirm-password"),
            negocio: document.getElementById("nombre-negocio")
        };

        // Limpiar estados de error previos
        document.querySelectorAll(".error-text").forEach(el => el.innerText = "");
        document.querySelectorAll(".form-control").forEach(el => el.classList.remove("is-invalid"));

        let esValido = true;

        const setError = (id, msg) => {
            const errorSpan = document.getElementById("error-" + id);
            if (errorSpan) errorSpan.innerText = msg;
            campos[id].classList.add("is-invalid");
            esValido = false;
        };

        // ✅ VALIDACIÓN NOMBRE (Mínimo 3 letras)
        const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (campos.nombre.value.trim().length < 3) {
            setError("nombre", "Mínimo 3 caracteres.");
        } else if (!regexNombre.test(campos.nombre.value.trim())) {
            setError("nombre", "Solo se permiten letras.");
        }

        // ✅ VALIDACIÓN CORREO (Formato estándar)
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexCorreo.test(campos.correo.value.trim())) {
            setError("correo", "Ingresa un correo válido.");
        }

        // ✅ VALIDACIÓN NEGOCIO (Solo si es vendedor)
        if (rolInput.value === "vendedor" && campos.negocio.value.trim().length < 3) {
            setError("negocio", "El nombre de tu marca es obligatorio.");
        }

        // ✅ VALIDACIÓN PASSWORD (Seguridad)
        if (campos.password.value.length < 8) {
            setError("password", "Mínimo 8 caracteres.");
        }

        // ✅ VALIDACIÓN CONFIRMACIÓN
        if (campos.confirm.value !== campos.password.value) {
            setError("confirm", "Las contraseñas no coinciden.");
        }

        // --- PROCESAMIENTO FINAL ---
        if (esValido) {
            // Estructura del Documento NoSQL (JSON)
            const nuevoUsuario = {
        id: Date.now(),
        nombre: campos.nombre.value.trim(),
        email: campos.correo.value.trim(),
        password: campos.password.value,
        rol: rolInput.value,
        datos_vendedor: rolInput.value === "vendedor" 
            ? { marca: campos.negocio.value.trim() } 
            : null,
        fecha_creacion: new Date().toISOString()
    };

    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

    const correoExiste = usuariosGuardados.some(
        u => u.email === nuevoUsuario.email
    );

    if (correoExiste) {
        Swal.fire({
            icon: "error",
            title: "Correo ya registrado",
            text: "Este correo ya tiene una cuenta."
        });
        return;
    }

    usuariosGuardados.push(nuevoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

    Swal.fire({
        title: "¡Cuenta creada con éxito!",
        text: `Bienvenido/a ${nuevoUsuario.nombre}`,
        icon: "success",
        confirmButtonColor: "#9913f2"
    }).then(() => {
        form.reset();
        window.location.href = "login.html";
    });
        }
    });
});
// 🔥 FIX SOLO PARA REGISTRO
document.addEventListener("DOMContentLoaded", () => {

    const esperarNavbar = setInterval(() => {
        const themeBtn = document.getElementById("theme-toggle");

        if (themeBtn) {
            clearInterval(esperarNavbar);

            themeBtn.addEventListener("click", () => {
                const html = document.documentElement;
                const currentTheme = html.getAttribute("data-theme");
                const newTheme = currentTheme === "dark" ? "light" : "dark";

                html.setAttribute("data-theme", newTheme);
                localStorage.setItem("theme", newTheme);
            });
        }

    }, 100);
});