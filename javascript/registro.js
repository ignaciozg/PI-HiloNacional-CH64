// registro.js - Validaciones y registro de Comprador/Vendedor

document.addEventListener("DOMContentLoaded", () => {
  // Utilidades compartidas
  const regex = {
    nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  };

  const limpiarErrores = (form) => {
    [...form.querySelectorAll(".is-invalid")].forEach(el => el.classList.remove("is-invalid"));
    // limpiar estados de error
    [...form.querySelectorAll('[id^="error-"]')].forEach(el => el.textContent = "");
  };

  const setError = (input, msg) => {
    input.classList.add("is-invalid");
    const span = document.getElementById(`error-${input.id}`);
    if (span) span.textContent = msg;
  };

  const correoDuplicado = (correo) => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    return usuarios.some(u => (u.email || u.correo) === correo);
  };

  const guardarUsuario = (usuario) => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  };

  const validarYRegistrar = (form, tipo) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      limpiarErrores(form);

      // Campos comunes
      const nombre = form.querySelector("#nombre");
      const email = form.querySelector("#email");
      const password = form.querySelector("#password");
      const confirm = form.querySelector("#confirm");

      // Campos de vendedor
      const negocio = form.querySelector("#negocio");
      const descripcion = form.querySelector("#descripcion");

      let esValido = true;

      // Nombre
      const vNombre = nombre?.value.trim() || "";
      if (!vNombre || vNombre.length < 3) {
        setError(nombre, "Mínimo 3 caracteres.");
        esValido = false;
      } else if (!regex.nombre.test(vNombre)) {
        setError(nombre, "Solo se permiten letras.");
        esValido = false;
      }

      // Email
      const vEmail = email?.value.trim() || "";
      if (!regex.email.test(vEmail)) {
        setError(email, "Ingresa un correo válido.");
        esValido = false;
      } else if (correoDuplicado(vEmail)) {
        setError(email, "Este correo ya está registrado.");
        esValido = false;
      }

      // Password
      const vPass = password?.value || "";
      const vConf = confirm?.value || "";
      if (vPass.length < 6) {
        setError(password, "Mínimo 6 caracteres.");
        esValido = false;
      }
      if (vPass !== vConf) {
        setError(confirm, "Las contraseñas no coinciden.");
        esValido = false;
      }

      // validaciones para campos extras del vendedor
      if (tipo === "vendedor") {
        const vNegocio = negocio?.value.trim() || "";
        const vDesc = descripcion?.value.trim() || "";
        if (vNegocio.length < 3) {
          setError(negocio, "El nombre del negocio es obligatorio (mínimo 3 caracteres).");
          esValido = false;
        }
        if (vDesc.length < 10) {
          setError(descripcion, "Describe tu negocio (mínimo 10 caracteres).");
          esValido = false;
        }
      }

      if (!esValido) return;

      const usuario = {
        id: Date.now(),
        nombre: vNombre,
        email: vEmail,
        password: vPass,
        rol: tipo,
        fecha_creacion: new Date().toISOString(),
      };

      if (tipo === "vendedor") {
        usuario.datos_vendedor = {
          marca: negocio?.value.trim() || "",
          descripcion: descripcion?.value.trim() || "",
        };
      }

      guardarUsuario(usuario);

      Swal.fire({
        title: "¡Cuenta creada con éxito!",
        text: `Bienvenido/a ${usuario.nombre}`,
        icon: "success",
        confirmButtonColor: "#000",
      }).then(() => {
        form.reset();
        window.location.href = "login.html";
      });
    });
  };

  const formComprador = document.getElementById("form-comprador");
  if (formComprador) validarYRegistrar(formComprador, "comprador");

  const formVendedor = document.getElementById("form-vendedor");
  if (formVendedor) validarYRegistrar(formVendedor, "vendedor");
});

// el fix de tema 
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
