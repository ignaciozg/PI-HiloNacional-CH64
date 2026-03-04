// registro.js - Validaciones y registro de Comprador/Vendedor

document.addEventListener("DOMContentLoaded", () => {
  const regex = {
    nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  };

  const limpiarErrores = (form) => {
    [...form.querySelectorAll(".is-invalid")].forEach(el => el.classList.remove("is-invalid"));
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

  // Elementos
  const btnComprador = document.getElementById("btnComprador");
  const btnVendedor = document.getElementById("btnVendedor");
  const title = document.getElementById("cardTitle");
  const subtitle = document.getElementById("cardSubtitle");
  const campoNegocio = document.getElementById("campoNegocio");
  const campoDescripcion = document.getElementById("campoDescripcion");
  const formRegistro = document.getElementById("registroForm");

  let rolActivo = "comprador"; // default

  function activarComprador() {
    rolActivo = "comprador";
    title.textContent = "Registro de Comprador";
    subtitle.textContent = "Crea tu cuenta para empezar a comprar productos únicos";
    campoNegocio.classList.add("d-none");
    campoDescripcion.classList.add("d-none");
    btnComprador.classList.add("opcion-activa");
    btnVendedor.classList.remove("opcion-activa");
  }

  function activarVendedor() {
    rolActivo = "vendedor";
    title.textContent = "Registro de Vendedor";
    subtitle.textContent = "Únete como vendedor y comparte tus productos artesanales";
    campoNegocio.classList.remove("d-none");
    campoDescripcion.classList.remove("d-none");
    btnVendedor.classList.add("opcion-activa");
    btnComprador.classList.remove("opcion-activa");
  }

  btnComprador.addEventListener("click", activarComprador);
  btnVendedor.addEventListener("click", activarVendedor);

  // Estado inicial
  activarComprador();

  // Validación y registro
  formRegistro.addEventListener("submit", (e) => {
    e.preventDefault();
    limpiarErrores(formRegistro);

    const nombre = formRegistro.querySelector("#nombre");
    const email = formRegistro.querySelector("#email");
    const password = formRegistro.querySelector("#password");
    const confirm = formRegistro.querySelector("#confirm");
    const negocio = formRegistro.querySelector("#negocio");
    const descripcion = formRegistro.querySelector("#descripcion");

    let esValido = true;

    const vNombre = nombre?.value.trim() || "";
    if (!vNombre || vNombre.length < 3) {
      setError(nombre, "Mínimo 3 caracteres.");
      esValido = false;
    } else if (!regex.nombre.test(vNombre)) {
      setError(nombre, "Solo se permiten letras.");
      esValido = false;
    }

    const vEmail = email?.value.trim() || "";
    if (!regex.email.test(vEmail)) {
      setError(email, "Ingresa un correo válido.");
      esValido = false;
    } else if (correoDuplicado(vEmail)) {
      setError(email, "Este correo ya está registrado.");
      esValido = false;
    }

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

    if (rolActivo === "vendedor") {
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
      rol: rolActivo,
      fecha_creacion: new Date().toISOString(),
    };

    if (rolActivo === "vendedor") {
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
      localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
      formRegistro.reset();
      window.location.href = "perfilUsuario.html";
    });
  });
});

// Fix de tema
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
