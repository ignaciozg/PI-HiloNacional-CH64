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
    telCompleto: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
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
    const telefono = document.getElementById("telefono");
    const password = document.getElementById("password");
    const confirm = document.getElementById("confirm");
    const negocio = document.getElementById("negocio");
    const descripcion = document.getElementById("descripcion");

    let esValido = true;
    let mensajeError = "";
    let valorTelefono = "";
    let vPass = "";
    let vEmail = "";

    // Validaciones básicas
    const vNombre = nombre.value.trim();
    if (!vNombre || vNombre.length < 3 || !regex.nombre.test(vNombre)) {
      setError(nombre);
      mensajeError =
        "Ingresa un nombre válido (solo letras, mín. 3 caracteres).";
      esValido = false;
    }

    if (esValido) {
        vEmail = email.value.trim();
        if (!regex.email.test(vEmail)) {
          setError(email);
          mensajeError = "Ingresa un correo válido.";
          esValido = false;
        } else if (correoDuplicado(vEmail)) {
          setError(email);
          mensajeError = "Este correo ya está registrado.";
          esValido = false;
        }
    }

      // 2. ✅ VALIDACIÓN TELÉFONO (🆕 Integrada aquí)
    if (esValido) {
        valorTelefono = telefono.value.trim();
        const soloNumeros = valorTelefono.replace(/\D/g, "");

    if (!valorTelefono) {
        setError(telefono);
        mensajeError = "El teléfono es obligatorio.";
        esValido = false;
    } else if (!regex.telCompleto.test(valorTelefono)) {
        setError(telefono);
        mensajeError = "Formato inválido (ej: +52 331 123 4567).";
        esValido = false;
    } else if (soloNumeros.length < 10) {
        setError(telefono);
        mensajeError = "El número debe tener al menos 10 dígitos.";
        esValido = false;
    } else if (soloNumeros.startsWith("0")) {
        setError(telefono);
        mensajeError = "No puede empezar con 0.";
        esValido = false;
    } else if (new Set(soloNumeros).size === 1) {
        setError(telefono);
        mensajeError = "No se permiten números repetidos (ej: 111...).";
        esValido = false;
    } else if (soloNumeros.match(/0{5,}/)) {
        setError(telefono);
        mensajeError = "Ingresa un número de teléfono real.";
        esValido = false;
    } else if (soloNumeros === "1234567890" || soloNumeros === "1234567891") {
        setError(telefono);
        mensajeError = "No uses secuencias numéricas.";
        esValido = false;
    }
  }

  if (esValido) {
    vPass = password.value;
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
  }

    // Validaciones extra si es vendedor
    if (esValido && tipoRegistro === "vendedor") {
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
      telefono: valorTelefono,
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
