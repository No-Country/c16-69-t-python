
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
// Tomo los campos como vacios

const expresiones = {  
    namePet: /^[a-zA-ZA-ÿ\s]{1,20}$/, // Letras y espacios, pueden llevar acentos.
    breed: /^[a-zA-ZÀ-ÿ\s]{1,20}$/, // Letras y espacios, pueden llevar acentos.
    age: /^\d{1,3}$/, // 1 a 3 numeros.
    network1: /^((?!-)[A-Za-z0-9-]{1, 60}(?<!-)\\.)+[A-Za-z]{2, 6}$/,//el dominio puede tener letras, numeros y guion, un max de 60caracteres, no puede empezar con guion, y puede ser un subdominio.
    network2: /^((?!-)[A-Za-z0-9-]{1, 60}(?<!-)\\.)+[A-Za-z]{2, 6}$/,
    date_lost: /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[1-9]|2[1-9])$/, // formato dd/mm/a
    location: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    size: /^[a-zA-ZÀ-ÿ\s]{1,20}$/,
    descrpition: /^[a-zA-ZÀ-ÿ\s]{1,100}$/,
    hashtags: [a-zA-Z0-9]+/g$/
}


const campos = {
    picture: false,
    type: false,
    date_lost: false,
    location: false,
    namePet: false,
    breed: false,
    age: false,
    size: false,
    network1: false,
    network2: false,
    description: false,
    hashtags: false
}
//Valida automaticamente al momento de cargar los datos por input y campo
const validarFormulario = (e) => {
    switch (e.target.name) {
        case "picture":
            validarCampo(expresiones.picture, e.target,'picture');
            break;
        case "type":
            validarCampo(expresiones.type,e.target, 'type');
            break;
        case "date_lost":
            validarCampo(expresiones.date_lost, e.target, 'date_lost');
            break;
        case "location":
            validarCampo(expresiones.location, e.target, 'locataion');
            break;
        case "namePet":
            console.log('se ejecuto!')
            validarCampo(expresiones.namePet, e.target, 'namePet');
            break;
        case "breed":
            validarCampo(expresiones.breed, e.target, 'breed');
            break;
        case "age":
            validarCampo(expresiones.age, e.target, 'age');
            break;
        case "size":
            validarCampo(expresiones.size, e.target, 'size');
            break;
        case "network1":
            validarCampo(expresiones.network1, e.target, 'network1');
            break;
        case "network2":
            validarCampo(expresiones.network2, e.target, 'network2');
            break;
        case "description":
            validarCampo(expresiones.description, e.target, 'description');
            break;
        case "hashtags":
            validarCampo(expresiones.hashtags, e.target, 'hashtags');
            break;
    }

}
//tomo los datos de cada campo y hago la prueba de validacion
const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`${campo}`).classList.remove('fgr-invalid');
        document.getElementById(`${campo}`).classList.add('fgr-valid');
		campos[campo] = true;
	} else {
		
		campos[campo] = false;
	}
}
//hago que valide el formulario incluso si clickea por fuera del form
inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
});
//vuelve al home si se cancela la operacion
function cancelarRegistro() {
    window.location.href = '../index.html';
};
formulario.addEventListener('reset', cancelarRegistro)