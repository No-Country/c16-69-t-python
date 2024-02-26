function data() {
    return {
        postDataPet: [],
        url: 'http://127.0.0.1:5000/api/pets/register',
        // para probar usar localhost 5000
        // url:'http://hosting/tabla',
        error: false,
        cargando: true,
        /*atributos para el guardar los valores del formulario */
        id: 0,
        picture: "",
        type: "",
        date_lost: "",
        location: "",
        namePet: document.getElementById,
        breed: "",
        age: 0,
        size: "",
        facebook: "",
        instagram: "",
        description: "",
        hashtags: "",
    }
};


    function fetchData(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.postDataPet = data;
                this.cargando = false
            })
            .catch(err => {
                console.error(err);
                this.error = true
            })
    };
    //Solicitud de POST
    // A los datos ingresados los guardo en una variable que la envio en formato JSON
    function registrarPet() {
        var formulario = document.getElementById ('formulario');
        var namePet = formulario.element["namePet"].value;
        console.log (namePet);
        let dataPet = {
            picture: this.picture,
            type: this.type,
            date_lost: this.date_lost,
            location: this.location,
            namePet: this.namePet,
            breed: this.breed,
            age: this.age,
            size: this.size,
            facebook: this.facebook,
            instagram: this.instagram,
            description: this.description,
            hashtags: this.hashtags,
        }
        console.log()
        var options = {
            body: JSON.stringify(dataPet),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow'
        }
        fetch(this.url, options)
            .then(function () {
                alert("Registro grabado")
                window.location.href = "../index.html";
            })
            .catch(err => {
                console.error(err);
                alert("Error al Grabar")
            })
    };

    function saludar (){
        alert("Hola!")
    }