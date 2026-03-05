document.addEventListener("DOMContentLoaded", () => {
  const btnComprador = document.getElementById("btnComprador");
  const btnVendedor = document.getElementById("btnVendedor");
  const form = document.getElementById("form-login");

  // Variables de estado
  let tipoUsuario = "comprador"; // Por defecto

  // --- Lógica de Interfaz (Tu código existente mejorado) ---
  function activarComprador() {
<<<<<<< HEAD
    title.textContent = "Iniciar Sesión como Comprador";
    subtitle.textContent = "Accede a tu cuenta para realizar compras";
    registerLink.href = "./registro.html";

    btnComprador.classList.add("bg-white", "shadow-sm", "tipo-activo");
    btnVendedor.classList.remove("bg-white", "shadow-sm", "tipo-activo");
  }

  function activarVendedor() {
    title.textContent = "Iniciar Sesión como Vendedor";
    subtitle.textContent = "Accede a tu panel de vendedor";
    registerLink.href = "./registro.html";

    btnVendedor.classList.add("bg-white", "shadow-sm", "tipo-activo");
    btnComprador.classList.remove("bg-white", "shadow-sm", "tipo-activo");
=======
    tipoUsuario = "comprador";
    document.getElementById("loginTitle").textContent =
      "Iniciar Sesión como Comprador";
    btnComprador.classList.add("btn-dark"); // O la clase que uses para el estado activo
    btnVendedor.classList.remove("btn-dark");
  }

  function activarVendedor() {
    tipoUsuario = "vendedor";
    document.getElementById("loginTitle").textContent =
      "Iniciar Sesión como Vendedor";
    btnVendedor.classList.add("btn-dark");
    btnComprador.classList.remove("btn-dark");
>>>>>>> 76d0a2acc10c179512e1c1d8b75e5796dc55f9c0
  }

  btnComprador.addEventListener("click", activarComprador);
  btnVendedor.addEventListener("click", activarVendedor);

<<<<<<< HEAD
  activarComprador();
});
// --- Lógica de Inicio de Sesión ---
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita que se recargue la página

  // 1. Validar formulario (Bootstrap style)
  if (!form.checkValidity()) {
    e.stopPropagation();
    form.classList.add("was-validated");
    return;
  }

  // 2. Capturar datos
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log(`Iniciando sesión como ${tipoUsuario}:`, { email, password });

  // 3. Simulación de Llamada a API
  // Aquí es donde conectarías con tu backend usando fetch()
  try {
    mostrarCargando();

    // Simulemos una espera de red
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Ejemplo de validación local (solo para pruebas)
    if (email === "test@test.com" && password === "123456") {
      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: `Has ingresado como ${tipoUsuario}`,
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        // Redirigir según el tipo de usuario
        window.location.href =
          tipoUsuario === "comprador" ? "index.html" : "panel-vendedor.html";
      });
    } else {
      throw new Error("Credenciales incorrectas");
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error de acceso",
      text: error.message,
    });
  }


function mostrarCargando() {
  Swal.fire({
    title: "Verificando...",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
}
=======
  // --- Lógica de Inicio de Sesión ---
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita que se recargue la página

    // 1. Validar formulario (Bootstrap style)
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    // 2. Capturar datos
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log(`Iniciando sesión como ${tipoUsuario}:`, { email, password });

    // 3. Simulación de Llamada a API
    // Aquí es donde conectarías con tu backend usando fetch()
    try {
      mostrarCargando();

      // Simulemos una espera de red
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Ejemplo de validación local (solo para pruebas)
      if (email === "test@test.com" && password === "123456") {
        Swal.fire({
          icon: "success",
          title: "¡Bienvenido!",
          text: `Has ingresado como ${tipoUsuario}`,
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          // Redirigir según el tipo de usuario
          window.location.href =
            tipoUsuario === "comprador" ? "index.html" : "panel-vendedor.html";
        });
      } else {
        throw new Error("Credenciales incorrectas");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error de acceso",
        text: error.message,
      });
    }
  });

  function mostrarCargando() {
    Swal.fire({
      title: "Verificando...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }
});
>>>>>>> 76d0a2acc10c179512e1c1d8b75e5796dc55f9c0

// inicio de sesión real con usuarios guardados en localStorage
// login.js
document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("form-login");

  if (!formLogin) return;

  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailInput = document
      .querySelector('input[type="email"]')
      .value.trim();
    const passInput = document.querySelector('input[type="password"]').value;

    // 1. Obtener los usuarios del localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // 2. Buscar coincidencia
    const usuarioEncontrado = usuarios.find(
      (u) => u.email === emailInput && u.password === passInput,
    );

    if (usuarioEncontrado) {
      // 3. Crear sesión activa
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

      Swal.fire({
        icon: "success",
        title: "¡Bienvenido de nuevo!",
        text: `Hola ${usuarioEncontrado.nombre}`,
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = "perfilUsuario.html";
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error de acceso",
        text: "Email o contraseña incorrectos",
        confirmButtonColor: "#000",
      });
    }
  });
});
