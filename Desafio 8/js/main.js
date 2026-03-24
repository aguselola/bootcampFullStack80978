//FUNCIONES GLOBALES
function remplazar(){
    const divDestino = document.getElementById("destino")
    const textArearRem = document.querySelector("textarea")
    divDestino.innerHTML = textArearRem.value
    
}
function agregar(e){
    
    const botonesAgregar = document.getElementsByClassName("btn-agregar")
    console.log(botonesAgregar)
    const divDestino = document.getElementById("destino")

    const textArearRem = document.querySelector("textarea")

    if (e == 0){
        divDestino.innerHTML = textArearRem.value
    }
    else if (e == 1){
        for(let i = 1; i <= 5; i++){
            divDestino.innerHTML += textArearRem.value
        }
    }
    else if (e == 2){
        for(let i = 1; i <= 10; i++){
            divDestino.innerHTML += textArearRem.value
        }
    }
    else if (e == 3){
        let cantidad 
        do {
            cantidad = parseInt(prompt("Ingrese la cantidad de veces que quiere que se agregue el texto"))
            if (!Number.isFinite(cantidad) || cantidad <= 0) {
              alert("Ingrese un número válido");
            }
          } while (!Number.isFinite(cantidad) || cantidad <= 0);
          for (let i = 1; i <= cantidad; i++) {
            divDestino.innerHTML += textArearRem.value;
          }
    }
    
    
}

function vaciar(){
    const divDestino = document.getElementById("destino")
    divDestino.innerHTML = ""
}

function convertirMayusculas(){
    const divDestino = document.getElementById("destino")
    divDestino.innerHTML = divDestino.innerHTML.toUpperCase()
}

function convertirMinusculas(){
    const divDestino = document.getElementById("destino")
    divDestino.innerHTML = divDestino.innerHTML.toLowerCase()
}


function start(){
    console.log("Contenido del DOM cargado")
    
    

    
    const valorTextArea = document.querySelector("textarea")
    valorTextArea.value = "<p>Este contenido <strong>está listo</strong><br>para ser editado y pasarlo abajo.</p>"
    
    valorTextArea.oninput = function (){

        const entradas = document.getElementsByTagName("input")
        for (let i = 0; i < entradas.length; i++) {
            entradas[i].disabled = false;
        }

        const boton = document.querySelector("button")
        boton.disabled = false
        
    }

 


    document.getElementById("btn-reemplazar").onclick = remplazar 

    
    const botonesAgregar = document.getElementsByClassName("btn-agregar");

    for (let i = 0; i < botonesAgregar.length; i++) {
        botonesAgregar[i].onclick = function () {
            agregar(i);
        }
    }
    const botonVaciar = document.querySelector(".btn-vaciar")
    botonVaciar.onclick = vaciar

    const botonConvertirMayusculas = document.querySelector(".btn-convertir-a-mayusculas")
    botonConvertirMayusculas.onclick = convertirMayusculas

    const botonConvertirMinusculas = document.querySelector('button')
    botonConvertirMinusculas.onclick = convertirMinusculas

    const listItems = document.getElementsByTagName("li")
   
    for (let i = 0; i < listItems.length; i++) {
        listItems[i].innerHTML = `[Ok] ${listItems[i].innerHTML}`
    }
    
}
    

//EJECUCION
window.onload = start





