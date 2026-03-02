
document.addEventListener("DOMContentLoaded", () => {
    

    const form = document.getElementById("formulario-login");

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const correo = document.getElementById("correo-login");
        const password = document.getElementById("password-login");

        document.querySelectorAll(".error-text").forEach(el => el.innerText = "");
        document.querySelectorAll(".form-control").forEach(el => el.classList.remove("is-invalid"));

        let esValido = true;

        const setError = (campo, mensaje) => {
            document.getElementById("error-" + campo).innerText = mensaje;
            document.getElementById(campo + "-login").classList.add("is-invalid");
            esValido = false;
        };

        if (!correo.value.trim()) {
            setError("correo", "Ingresa tu correo.");
        }

        if (!password.value.trim()) {
            setError("password", "Ingresa tu contraseña.");
        }

        if (!esValido) return;

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const usuarioEncontrado = usuarios.find(u =>
            u.email === correo.value.trim() &&
            u.password === password.value
        );

        if (!usuarioEncontrado) {
            Swal.fire({
                icon: "error",
                title: "Credenciales incorrectas",
                text: "Revisa tu correo o contraseña"
            });
            return;
        }

        // Guardamos sesión activa
        localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

        Swal.fire({
            icon: "success",
            title: "Bienvenido/a",
            text: `Hola ${usuarioEncontrado.nombre}`
        }).then(() => {
            window.location.href = "index.html";
        });

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