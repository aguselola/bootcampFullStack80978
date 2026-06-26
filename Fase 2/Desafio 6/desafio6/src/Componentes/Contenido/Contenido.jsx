import { useState } from 'react'
import './Contenido.css'

function Contenido(props) {
    const colores = ["yellow", "cyan", "orange"]
    const [color, setColor] = useState()
    const [indice, setIndice] = useState(0);
    function cambiarColores() {
        const nuevoIndice = (indice + 1) % colores.length;

        setIndice(nuevoIndice);
        setColor(colores[nuevoIndice]);
    }

    return(
        <>
            <p className={color}>{props.texto} </p>
            <button onClick={cambiarColores} >Cambiar color</button>
        </>
    )
}

export default Contenido