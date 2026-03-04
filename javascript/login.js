
      (function(){
        const form = document.getElementById('form-login-vendedor');
        if(!form) return;
        form.addEventListener('submit', function(e){
          const email = form.email;
          const pass = form.password;
          let ok = true;
          if(!email.value || !email.checkValidity()) ok = false;
          if(!pass.value || pass.value.length < 6) ok = false;
          if(!ok){
            e.preventDefault();
            e.stopPropagation();
          } else {
            e.preventDefault();
            Swal.fire({icon:'success', title:'¡Bienvenido!', text:'Inicio de sesión de vendedor validado.'});
          }
          form.classList.add('was-validated');
        });
      })();



