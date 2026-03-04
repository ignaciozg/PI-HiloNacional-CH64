document.addEventListener("DOMContentLoaded", () => {
  const btnComprador = document.getElementById("btnComprador");
  const btnVendedor = document.getElementById("btnVendedor");

  const title = document.getElementById("loginTitle");
  const subtitle = document.getElementById("loginSubtitle");
  const registerLink = document.getElementById("registerLink");

  function activarComprador() {
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

  }

  btnComprador.addEventListener("click", activarComprador);
  btnVendedor.addEventListener("click", activarVendedor);


  activarComprador(); 
});
