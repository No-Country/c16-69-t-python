document.addEventListener("DOMContentLoaded", function () {
    const nombreInput = document.getElementById("nombre");
    const apellidoInput = document.getElementById("apellido");
    const userInput = document.getElementById("user");
    const suggestedUsernameDiv = document.getElementById("suggestedUsername");
  
    // Función para generar el nombre de usuario sugerido
    function generarNombreUsuarioSugerido() {
      const nombre = nombreInput.value.trim().toLowerCase().replace(/\s+/g, '_');
      const apellido = apellidoInput.value.trim().toLowerCase().replace(/\s+/g, '_');
      const nombreUsuarioSugerido = `${nombre}.${apellido}`;
      
      if (nombreUsuarioSugerido !== '..') {
        userInput.value = nombreUsuarioSugerido;
        suggestedUsernameDiv.innerText = `Usuario sugerido: ${nombreUsuarioSugerido}`;
        suggestedUsernameDiv.style.display = "block";
      } else {
        userInput.value = "";
        suggestedUsernameDiv.innerText = "";
        suggestedUsernameDiv.style.display = "none";
      }
    }
  
    
    nombreInput.addEventListener("input", generarNombreUsuarioSugerido);
    apellidoInput.addEventListener("input", generarNombreUsuarioSugerido);
  });
  
  function limpiarFormulario() {
    document.getElementById("registerForm").reset();
    limpiarMensajeErrorContraseñas(); // Limpia mensaje de error
  }
  
  document
    .getElementById("registerForm")
    .addEventListener("submit", function (event) {
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
  
      // Compruebo si las contraseñas coinciden
      if (!validarContraseñas(password, confirmPassword)) {
        event.preventDefault(); // Evita el envío del formulario
      } else {
        limpiarMensajeErrorContraseñas();
      }
    });
  
  function limpiarMensajeErrorContraseñas() {
    const passwordError = document.getElementById("passwordError");
    passwordError.innerText = "";
    passwordError.style.display = "none";
  }
  
  function validarContraseñas(password, confirmPassword) {
    const passwordError = document.getElementById("passwordError");
  
    if (password !== confirmPassword) {
      passwordError.innerText = "Las contraseñas no coinciden.";
      passwordError.style.display = "block";
      passwordError.style.color = "#ff5722";
      passwordError.style.fontWeight = "bold";
      return false; // Las contraseñas no coinciden
    }
  
    return true; // Las contraseñas coinciden
  }
  
  function cancelarRegistro() {
    window.location.href = '../index.html'; 
  }
  
  function registrarUsuario() {
    // Captura los valores de los campos del formulario
    const apellido = document.getElementById('apellido').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const usuario = document.getElementById('user').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const domicilio = document.getElementById('domicilio').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
  
    // Aca va la API Fetch para enviar al backend la info del formulario de registro
  
    // Verifica que las contraseñas coincidan
    if (!validarContraseñas(password, confirmPassword)) {
      alert('Las contraseñas no coinciden');
      return; // Detiene el proceso si las contraseñas no coinciden
    }
  
    // Crea un objeto con los datos a enviar al backend
    const datosUsuario = {
      apellido: apellido,
      nombre: nombre,
      usuario: usuario,
      correo: correo,
      domicilio: domicilio,
      password: password
    };
  
    // Realiza una solicitud HTTP (POST) al backend con los datos del usuario
    fetch('/ruta-al-endpoint-de-registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosUsuario)
    })
    .then(response => response.json())
    .then(data => {
      // Maneja la respuesta del backend según tus necesidades
      console.log('Respuesta del backend:', data);
      // Puedes redirigir a otra página o mostrar un mensaje de éxito aquí
    })
    .catch(error => {
      console.error('Error al enviar los datos:', error);
      // Puedes mostrar un mensaje de error al usuario aquí
    });
  }
  