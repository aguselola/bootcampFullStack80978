import { useState } from 'react'
import './App.css'
import Encabezado from './Componentes/Encabezado'
import Contenido from './Componentes/Contenido/Contenido'

function App() {
  return (
    <>
      <Encabezado titulo="Último desafío de fase 2 (Desafío 6)"/>

      <Contenido texto="Realizar un proyecto en React.js que contenga dos componentes embebidos dentro del
        componente principal.

        Uno de ellos será un componente stateless llamado Encabezado que recibirá la prop ‘titulo’
        y deberá mostrar la información recibida por esa prop dentro de un elemento h1 en color
        azul.

        El otro componente deberá guardar estado (statefull) y se llamará Contenido. Representará
        un texto que recibirá por la prop texto, en un elemento de párrafo y dispondrá de un botón
        que permita cambiar el fondo de dicho texto entre los colores amarillo, cyan y naranja de
        manera rotativa"/>
    </>
  )
}

export default App
