const form = document.querySelector('.formularioContacto') 


function manejarSubmit(e) {
    if (!form.checkValidity()) {
        form.reportValidity()
        return
    }
    e.preventDefault()
    
}


function start() {
    form.addEventListener('submit', manejarSubmit)
}
