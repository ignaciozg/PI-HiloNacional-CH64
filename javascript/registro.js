// registro.js - Validaciones y registro unificado
document.addEventListener("DOMContentLoaded", () => {
  const formRegistro = document.getElementById("registroForm");

  // Si no estamos en la página de registro, detenemos el script
  if (!formRegistro) return;

  // Variables para saber qué tipo de usuario se está registrando
  let tipoRegistro = "comprador";
  const btnComprador = document.getElementById("btnComprador");
  const btnVendedor = document.getElementById("btnVendedor");

  btnComprador.addEventListener("click", () => (tipoRegistro = "comprador"));
  btnVendedor.addEventListener("click", () => (tipoRegistro = "vendedor"));

  // Utilidades compartidas
  const regex = {
    nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  };

  const limpiarErrores = (form) => {
    [...form.querySelectorAll(".is-invalid")].forEach((el) =>
      el.classList.remove("is-invalid"),
    );
  };

  const setError = (input, msg) => {
    input.classList.add("is-invalid");
    // Si usas spans para errores, aquí se actualizarían. Como usamos SweetAlert, esto pinta el input en rojo.
  };

  const correoDuplicado = (correo) => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    return usuarios.some((u) => u.email === correo);
  };

  const guardarUsuario = (usuario) => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  };

  // Evento principal de registro
  formRegistro.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que la página se recargue
    limpiarErrores(formRegistro);

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirm = document.getElementById("confirm");
    const negocio = document.getElementById("negocio");
    const descripcion = document.getElementById("descripcion");

    let esValido = true;
    let mensajeError = "";

    // Validaciones básicas
    const vNombre = nombre.value.trim();
    if (!vNombre || vNombre.length < 3 || !regex.nombre.test(vNombre)) {
      setError(nombre);
      mensajeError =
        "Ingresa un nombre válido (solo letras, mín. 3 caracteres).";
      esValido = false;
    }

    const vEmail = email.value.trim();
    if (!regex.email.test(vEmail)) {
      setError(email);
      mensajeError = "Ingresa un correo válido.";
      esValido = false;
    } else if (correoDuplicado(vEmail)) {
      setError(email);
      mensajeError = "Este correo ya está registrado.";
      esValido = false;
    }

    const vPass = password.value;
    const vConf = confirm.value;
    if (vPass.length < 6) {
      setError(password);
      mensajeError = "La contraseña debe tener mínimo 6 caracteres.";
      esValido = false;
    } else if (vPass !== vConf) {
      setError(confirm);
      mensajeError = "Las contraseñas no coinciden.";
      esValido = false;
    }

    // Validaciones extra si es vendedor
    if (tipoRegistro === "vendedor") {
      const vNegocio = negocio.value.trim();
      const vDesc = descripcion.value.trim();
      if (vNegocio.length < 3) {
        setError(negocio);
        mensajeError = "El nombre del negocio es obligatorio.";
        esValido = false;
      }
      if (vDesc.length < 10) {
        setError(descripcion);
        mensajeError = "Describe tu negocio (mínimo 10 caracteres).";
        esValido = false;
      }
    }

    // Si hay errores, mostramos alerta y detenemos
    if (!esValido) {
      Swal.fire({ icon: "error", title: "Oops...", text: mensajeError });
      return;
    }

    // Si todo es válido, creamos el objeto usuario
    const nuevoUsuario = {
      id: Date.now(),
      nombre: vNombre,
      email: vEmail,
      password: vPass,
      rol: tipoRegistro,
      fecha_creacion: new Date().toISOString(),
    };

    if (tipoRegistro === "vendedor") {
      nuevoUsuario.datos_vendedor = {
        marca: negocio.value.trim(),
        descripcion: descripcion.value.trim(),
      };
    }

    // Guardamos en la base de datos simulada y creamos la sesión
    guardarUsuario(nuevoUsuario);
    localStorage.setItem("usuarioActivo", JSON.stringify(nuevoUsuario));

    Swal.fire({
      title: "¡Cuenta creada con éxito!",
      text: `Bienvenido/a ${nuevoUsuario.nombre}`,
      icon: "success",
      confirmButtonColor: "#000",
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      formRegistro.reset();
      window.location.href = "perfilUsuario.html"; // Redirigimos al perfil
    });
  });
});
