document.addEventListener("DOMContentLoaded", function () {
  fetch("http://127.0.0.1:5000/api/pets/")
      .then((response) => response.json())
      .then((data) => {
          console.log(data);
          const mascotas = data.pets; // Tomar todas las mascotas recuperadas

          const swiperWrapper = document.querySelector(".swiper-wrapper");
          mascotas.forEach((mascota, index) => {
              const swiperSlide = document.createElement("div");
              swiperSlide.classList.add("swiper-slide");

              const img = document.createElement("img");
              img.src = mascota.image_url;
              img.alt = mascota.name;

              const cardDescription = document.createElement("div");
              cardDescription.classList.add("card-description");

              const cardTitle = document.createElement("div");
              cardTitle.classList.add("card-title");
              cardTitle.innerHTML = `<h5>${mascota.name}</h5>`;

              const cardText = document.createElement("div");
              cardText.classList.add("card-text");
              cardText.innerHTML = `<p>${mascota.location}</p><p>${mascota.date_lost}</p>`;

              cardDescription.appendChild(cardTitle);
              cardDescription.appendChild(cardText);

              swiperSlide.appendChild(img);
              swiperSlide.appendChild(cardDescription);

              const token = localStorage.getItem("token");

              if (token) {
                  const cardLink = document.createElement("div");
                  cardLink.classList.add("card-link");
                  const btnVerMas = document.createElement("button");
                  btnVerMas.type = "button";
                  btnVerMas.classList.add("btn", "btn-link", "btn-sm");
                  btnVerMas.dataset.toggle = "modal";
                  btnVerMas.dataset.target = "#exampleModal";
                  btnVerMas.textContent = "Ver más";
                  btnVerMas.addEventListener("click", () => {
                      handleVerMasClick(index); // Llama a la función con el índice de la mascota
                      
                  });
                  cardLink.appendChild(btnVerMas);
                  cardDescription.appendChild(cardLink);
              }

              swiperWrapper.appendChild(swiperSlide);
          });

          const swiper = new Swiper(".mySwiper", {
              loop: true,
              navigation: {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
              },
          });

          

          function handleVerMasClick(index) {
              console.log("Número de card:", index);
              const mascotaSeleccionada =  mascotas[index];
              console.log(mascotaSeleccionada)
             
                  // Actualiza el contenido del modal con los datos de la mascota
              const modalTitle = document.querySelector(".modal-title");
              modalTitle.textContent = mascotaSeleccionada.name;

              const modalImg = document.querySelector(".modal-body img");
              modalImg.src = mascotaSeleccionada.image_url;

              

              const nameElement = document.getElementById('petName');
              nameElement.textContent = `Nombre: ${mascotaSeleccionada.name}`;

           
              
              const breedElement = document.getElementById("petBreed");
              breedElement.textContent=`Raza: ${mascotaSeleccionada.breed}`;
             

              const petLocation = document.getElementById("petLocation");
              petLocation.textContent =`Zona: ${mascotaSeleccionada.location}`;

              const petAge = document.getElementById("petAge");
              petAge.textContent = `Edad: ${mascotaSeleccionada.age}`;

              const petSize = document.getElementById("petSize");
              petSize.textContent = `Tamaño: ${mascotaSeleccionada.size}`; 

             const petType = document.getElementById("petType")
              if (mascotaSeleccionada == "Wanted"){
                petType.textContent ="Buscada"
                
              }else{
                petType.textContent="Encontrada";
              }
           
              $('#exampleModal').modal('show');
          }
          
        
      })
      .catch((error) => {
          console.error("Error al obtener los datos de la API de mascotas:", error);
      });
});
