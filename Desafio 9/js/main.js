// variables globales

let display = document.getElementById("display")

//NUMEROS
let nueve = document.getElementById("nueve")
let ocho = document.getElementById("ocho")
let siete = document.getElementById("siete")
let seis = document.getElementById("seis")
let cinco = document.getElementById("cinco")
let cuatro = document.getElementById("cuatro")
let tres = document.getElementById("tres")
let dos = document.getElementById("dos")
let uno = document.getElementById("uno")
let cero = document.getElementById("cero")

let mas = document.getElementById("mas")
let menos = document.getElementById("menos")
let por = document.getElementById("por")
let dividido = document.getElementById("dividido")

let coma = document.getElementById("coma")
let igual = document.getElementById("igual") 


let numero1 = 0
let operacion = ""
let resultado = 0
let empezoSegundoNumero = false

const maxDigitos = 13; 

//funciones 
const mostrarNumerosEnDisplay = (numero) => {
    const digito = numero.innerText

    if (digito === "." && display.innerText.includes(".")) {
        return
    }else if(display.innerText === "0" && digito === "."){
        display.innerText = "0."
    }else if (display.innerText === "0") {
        display.innerText = digito
    }else{
        display.innerText += digito
    }

    if(operacion !== ""){
        empezoSegundoNumero = true
    }

    if (display.innerText.length > maxDigitos) {
        display.innerText = display.innerText.slice(0, maxDigitos);
    }
}
const vaciar = () => {
    display.innerText = "0"
    empezoSegundoNumero = false
    operacion = ""
    numero1 = 0
    resultado = 0
}

const operaciones = (operador) => {
    
    if (operacion!== "" && !empezoSegundoNumero){

        operacion = operador.innerText
        return
    }
    numero1 = parseFloat(display.innerText)
    display.innerText = "0"
    operacion = operador.innerText
    empezoSegundoNumero = false
    
    
}


const darResultado = () => {
    if (operacion === "+"){
        resultado = numero1 + parseFloat(display.innerText)
        display.innerText = resultado
    }else if(operacion === "-"){
        resultado = numero1 - parseFloat(display.innerText)
        display.innerText = resultado

    }else if(operacion === "X"){
        resultado = numero1 * parseFloat(display.innerText)
        display.innerText = resultado

    }else if(operacion === "/"){
        if (parseFloat(display.innerText) === 0){
            display.innerText = "Error"
            operacion = ""
            empezoSegundoNumero = false
            numero1 = 0
            return
        }
        resultado = numero1 / parseFloat(display.innerText)
        display.innerText = resultado
    }else{
        display.innerText = "Error"
    }

    if (display.innerText.length > maxDigitos) {
        display.innerText = display.innerText.slice(0, maxDigitos);
    }

    operacion = ""
    empezoSegundoNumero = false
    numero1 = 0
}

const start = () => {

    nueve.onclick = () => mostrarNumerosEnDisplay(nueve)
    ocho.onclick = () => mostrarNumerosEnDisplay(ocho)
    siete.onclick = () => mostrarNumerosEnDisplay(siete)
    seis.onclick = () => mostrarNumerosEnDisplay(seis)
    cinco.onclick = () => mostrarNumerosEnDisplay(cinco)
    cuatro.onclick = () => mostrarNumerosEnDisplay(cuatro)
    tres.onclick = () => mostrarNumerosEnDisplay(tres)
    dos.onclick = () => mostrarNumerosEnDisplay(dos)
    uno.onclick = () => mostrarNumerosEnDisplay(uno)
    cero.onclick = () => mostrarNumerosEnDisplay(cero)
    coma.onclick = () => mostrarNumerosEnDisplay(coma)


    mas.onclick = () => operaciones(mas)
    menos.onclick = () => operaciones(menos)
    por.onclick = () => operaciones(por)
    dividido.onclick = () => operaciones(dividido)
    igual.onclick = darResultado

    display.onclick = vaciar
}


//ejecucion
start()