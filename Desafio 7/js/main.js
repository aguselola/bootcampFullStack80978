//Variables globales

let gato1 = '😺'
let gato2 = '😸'
let gato3 = '😹'
let cajaNegra = '⬛'
let ultimo = ''
let racha = 0
let gatos = []
let cajas = []

const boton1 = document.getElementById('gato1')
const boton2 = document.getElementById('gato2')
const boton3 = document.getElementById('gato3')

const divDestino = document.getElementById('destino')


//FUNCIONES GLOBALES
function start(){
    
    
    boton1.onclick = () => agregarGatos(gato1)
    boton2.onclick = () => agregarGatos(gato2)
    boton3.onclick = () => agregarGatos(gato3)
}

function agregarGatos(emoji){
    gatos.push(emoji)
    console.log(gatos)
    if (emoji === ultimo){
        racha ++
    }else{
        racha = 1
    }
    ultimo = emoji

    if (racha > 5){
        cajas.push(cajaNegra)
        gatos = []
        ultimo = ''
        racha = 0
    }
    divDestino.innerText = cajas.join('') + gatos.join('')
}



//EJECUCION
start()