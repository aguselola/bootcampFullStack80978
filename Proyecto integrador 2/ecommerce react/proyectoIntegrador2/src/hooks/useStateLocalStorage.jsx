import { useState } from 'react'


export function useStateLocalStorage(clave, valorInicial) {

    const [valor, setValor] = useState(() => {
        const guardado = localStorage.getItem(clave)
        return guardado ? JSON.parse(guardado) : valorInicial
    })


    function actualizar(nuevoValor) {
        const valorFinal = typeof nuevoValor === 'function'
            ? nuevoValor(valor)
            : nuevoValor
        setValor(valorFinal)
        localStorage.setItem(clave, JSON.stringify(valorFinal))
    }

    
    return [valor, actualizar]

}