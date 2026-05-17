//EJERCICIO C
var cantidadDeGatos = 10;
var cantidadDePasos = 5;

for(var i=1; i<=cantidadDeGatos; i++){

    var gatoElegido = '';
    var pasos = '';

    if(i%2==1){
        gatoElegido = '🐈'
    }else{
        gatoElegido = '🐈‍⬛'
    }

    for(var j=1; j<=cantidadDePasos; j++){
        pasos = pasos + '🐾'
    }
    console.log('Gato #' + i + ': ' + gatoElegido + pasos)
}

