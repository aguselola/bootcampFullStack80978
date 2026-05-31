const monto = document.getElementById('monto')
const valorUsd = document.getElementById('valorUsd')
const actualizacion = document.getElementById('actualizacion')
const hora = document.getElementById('hora')
const totalCalculado = document.getElementById('totalCalculado')

let miIntervalo = null;


function calcularDolares(){
    if (!monto.value || !valorUsd.value || Number(valorUsd.value) === 0) {
        totalCalculado.innerText = ''
        return
    }


    let calculoTotal = monto.value / valorUsd.value
    let total = calculoTotal.toFixed(2)
    totalCalculado.innerText = total
}

monto.addEventListener('input', calcularDolares)
valorUsd.addEventListener('input', calcularDolares)

function conseguirDolarApi(){
    const xhr = new XMLHttpRequest()
            xhr.open('GET', 'https://api.bluelytics.com.ar/v2/latest')
            xhr.addEventListener('load', ()=>{
                if(xhr.status == 200){
                    const respuesta = JSON.parse(xhr.response)
                    valorUsd.disabled = true
                    valorUsd.value = respuesta.blue.value_sell
                    const fecha = new Date(respuesta.last_update);

                    const fechaLimpia = fecha.toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'medium' });

                    hora.innerText = fechaLimpia

                    calcularDolares()
                }
                else {
                    console.error('Error en status http (xhr):', xhr.status)
                }
            })
            xhr.addEventListener('error', e => {
                console.error('Error xhr:', e)
            })
            xhr.send()
}

actualizacion.addEventListener('change', (evento)=>{
    if(evento.target.checked){
        conseguirDolarApi()
        miIntervalo = setInterval(conseguirDolarApi , 2000)
        
    }else{
        valorUsd.disabled = false
        hora.innerText = ''

        clearInterval(miIntervalo);
        miIntervalo = null; 
        
    }
})