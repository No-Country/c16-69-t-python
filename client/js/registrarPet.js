const formulario = document.getElementById('formulario');

// Agrega un event listener para el envío del formulario
formulario.addEventListener('submit', function(event) {
  event.preventDefault(); // Evita el envío del formulario

  // Toma los datos del formulario
  const type = document.getElementById('type').value;
  const date_lost = document.getElementById('date_lost').value;
  const location = document.getElementById('location').value;
  const name = document.getElementById('namePet').value;
  const breed = document.getElementById('breed').value;
  const age = document.getElementById('age').value;
  const size = document.getElementById('size').value;
  const facebook = document.getElementById('facebook').value;
  const instagram = document.getElementById('instagram').value;
  const description = document.getElementById('description').value;
  const hashtags = document.getElementById('hashtags').value;

  // Crea un objeto FormData para enviar los datos del formulario
  const formData = new FormData();
  formData.append('image', formulario.picturePet.files[0]); // Obtén el archivo de la imagen
  
  // API Request para subir la imagen a ImgBB
  const apiKey = 'b8630093227cc0bf57935c135bbf6f9c'; // Reemplaza 'TU_API_KEY' con tu clave API de ImgBB

  fetch('https://api.imgbb.com/1/upload?key=' + apiKey, {
    method: 'POST',
    body: formData,
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Guarda la URL de la imagen subida en una variable
    const imageUrl = data.data.url;
    console.log('URL de la imagen subida:', imageUrl);

    // Arma un objeto con los datos del formulario incluyendo la URL de la imagen subida
    const datosPet = {
      image_url: imageUrl,
      type,
      date_lost,
      location,
      name,
      breed,
      age,
      size,
      //facebook,
      //instagram,
      description,
      //hashtags
    };

    // Solicitud POST al backend
    fetch("http://127.0.0.1:5000/api/pets/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosPet),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error en la solicitud Fetch: " + response);
      }
      return response.json();
    })
    .then(data => {
      console.log("Respuesta del backend:", data);
      window.location.href = "../index.html"; // Redirige a index.html
    })
    .catch(error => {
      console.error("Error al enviar los datos:", error);
    });

  })
  .catch(error => {
    console.error('Error:', error);
  });
});
