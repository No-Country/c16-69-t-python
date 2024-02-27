document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío predeterminado del formulario

    // Obtener los valores del formulario
    var username = document.getElementById("user_log").value.trim();
    var password = document.getElementById("psw_log").value.trim();

    // Enviar los datos al servidor  para autenticar al usuario
    fetch("http://127.0.0.1:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //Guardo el token en el sessionStorage
        let token = data.access_token;
        sessionStorage.setItem("token", token);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  });
