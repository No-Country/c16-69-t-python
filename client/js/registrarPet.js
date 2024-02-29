const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

// Capturo el archivo que ingresa el usuario y lo muestro por pantalla

/*const picturePet = document.getElementById('picturePet');
var uploaded_image = "";
picturePet.addEventListener('change', function () {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    uploaded_image = reader.result;
    document.getElementById("display_image").style.backgroundImage = `url($(uploaded_image))`;
  })
  reader.readAsDataURL(this.files[0]);
});*/

// Tomo los datos que ingresa el usuario sobre el aviso a publicar

document
  .getElementById("formulario")
  .addEventListener("submit", function (event) {
    console.log("aqui..." + event)
    event.preventDefault(); // Evita el envío del formulario

    // Registra al aviso
    registrarPet();
    guardarRedes(); //queda pendiente hasta tener el endpoint de redes sociales

    //resetea el form
    resetearForm();
  });




function registrarPet() {
  //const image_url = document.getElementById('picturePet').value;
  const type = document.getElementById('type').value;
  const date_lost = document.getElementById('date_lost').value;
  const location = document.getElementById('location').value;
  const name = document.getElementById('namePet').value;
  const breed = document.getElementById('breed').value;
  const age = document.getElementById('age').value;
  const size = document.getElementById('size').value;
  const description = document.getElementById('description').value;
  const hashtags = document.getElementById('hashtags').value


  // Armo un objeto con los datos  del aviso a registrar

  const datosPet = {
    //image_url,
    type,
    date_lost,
    location,
    name,
    breed,
    age,
    size,
    description,
    //hashtags
  };

  // Solicitud de POST

  fetch("http://127.0.0.1:5000/api/pets/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosPet),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la solicitud Fetch");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Respuesta del backend:", data);
      window.location.href = "../index.html"; // Redirige al home

    })
    .catch((error) => {
      console.error("Error al enviar los datos:", error);
    });
}

function guardarRedes (){
  const facebook = document.getElementById('facebook').value;
  const instagram = document.getElementById('instagram').value;

  // Creo el objeto que va a pasar los datos de las redes a registrar

  const datosRedes = {
    facebook,
    instagram,
  };
  fetch("http://127.0.0.1:5000/api/pets/<id>/social_media/", {  //direccion de api de redes
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datosRedes),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la solicitud Fetch");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Respuesta del backend:", data);
      window.location.href = "../index.html"; // Redirige a index.html
    })
    .catch((error) => {
      console.error("Error al enviar los datos:", error);
    });
}

function resetearForm() {
  document.getElementById("formulario").reset();
}

//vuelve al home si se cancela la operacion
function cancelarRegistro() {
  window.location.href = '../index.html';
};