const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

// Tomo los datos que ingresa el usuario

function registrarPet () {
    const picturePet = document.getElementById('picturePet').value;
    const type = document.getElementById('type').value;
    const date_lost = document.getElementById('date_lost').value;
    const location = document.getElementById('location').value;
    const namePet = document.getElementById('namePet').value;
    const breed = document.getElementById('breed').value;
    const age = document.getElementById('age').value;
    const size = document.getElementById('size').value;
    const facebook = document.getElementById('facebook').value;
    const instagram = document.getElementById('instagram').value;
    const description = document.getElementById('description').value;
    const hashtags = document.getElementById('hashtags').value

    //if (document.document.getElementById("picturePet"!=='.jpg'||'.png'||'jpeg' ) ){
    //    alert('Error al completar')
    //}

    // Armo un objeto con los datos a registrar

    const datosPet = {
        picturePet,
        type,
        date_lost,
        location,
        namePet,
        breed,
        age,
        size,
        facebook,
        instagram,
        description,
        hashtags
    };

// Solicitud de POST
fetch('http://127.0.0.1:5000/api/pets/register', {
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
      window.location.href = "/index.html"; // Redirige a index.html
    })
    .catch((error) => {
      console.error("Error al enviar los datos:", error);
    });
};
//vuelve al home si se cancela la operacion
function cancelarRegistro() {
    window.location.href = '/index.html';
};

