const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll('#formulario input');
const registro = document.getElementById("registro");
const exito = document.getElementById("exito");
var comentario = document.getElementsByTagName('textarea');
var result = document.getElementById("demo");
var send = document.getElementById("demo").value;
var string = ""
var max = 140;
document.getElementById("info").innerHTML = "La cantidad máxima de caracteres es " + max;
function longitud(str){
		result.innerHTML = "Cantidad de caracteres: " + str.length;
}
function validar(){
		for (i = 0; i < comentario.length; i++) {
		   string = comentario[i].value;
		}
		//console.log("validar: " + string);
		//console.log(string.length);
		if (string.length == 0) {
			alert('Ingrese una consulta para realizar la petición');
			//console.log("el comentario es: " + string);
			console.log("no se envio");
			
			return false;
		}
		
		else if(string.length>max){
			alert("La consulta no deber pasar el límite de caracteres: " + max);
			//console.log("mas de 15 caracteres");
			
			return false;
		}
		else if(string.length>15 && string.length <max){
			console.log(string);
			
			//console.log("se escapó la tortuga");
			alert("La consulta ha sido enviada con éxito");
			return true;
		}
		// alert("Error: Ingrese una consulta válida");
		// return false;
};	
formulario.addEventListener("submit", async(e) => {
	e.preventDefault();
	validar();
	
	if(formulario.nombre.value == null && formulario.correo.value == null && formulario.consulta.value == null){
		//console.log("formulario no enviado");
		
		
		alert("Complete los campos correspondientes para enviar el formulario. Gracias!");
		
		return;
	}
	try{
		const respuesta = await fetch("https://sheet.best/api/sheets/72006176-b968-4ab2-8c13-024814c3d51c", {
			method: "post",
			mode: "cors",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"Nombre": formulario.nombre.value,
				"Correo": formulario.correo.value,
				"Telefono": formulario.telefono.value,
				"Consulta": formulario.consulta.value
			})
		});
		const contenido = await respuesta.json();
		console.log(contenido);
		
	} catch(error){
		console.log(error);
	}
	registro.classList.remove("activo");
	exito.classList.add("activo");
	
});


const expresiones = {
		nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
		correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		telefono: /^\d{7,14}$/, // 7 a 14 numeros.
		comentario: /^[a-zA-ZÀ0-9-ÿ\s]{1,40}$/ // Letras y espacios, pueden llevar acentos.
				
}


const campos = {
	nombre: false,
	correo: false,
	telefono: false,
	comentario: false
	
}
const validarFormulario = (e) => {
	switch (e.target.name) {
		
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
		case "consulta":
			validarCampo(expresiones.consulta, e.target, 'comentario');
			validarPassword2();
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		// document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		// document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		// document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		// document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}
inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});







