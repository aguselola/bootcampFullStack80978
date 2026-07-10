import { useState } from 'react'
import './Index.css'
import servicioProductos from '../../servicios/productos'


export function Index() {


    return (
    
        <main>
            <h1>Conectemos</h1>

            <div id="formulario">

                <p>✦¿Tenes dudas, consultas o queres hacer un pedido especial?✦</p>
                <p>Escribinos, estamos para ayudarte.</p>
        
                <img src="/img/separador.png" alt="separador" id="separador" />
                
                <form id="formularioContacto">
                    <div>
                        <label htmlFor="nombre">Nombre</label>
                        <input id="nombre" type="text" name="nombre" minLength="2" maxLength="50" placeholder="Tu nombre" required />
                    </div>
                    <div>
                        <label htmlFor="apellido">Apellido</label>
                        <input id="apellido" type="text" name="apellido" minLength="2" maxLength="50" placeholder="Tu apellido" required />
                    </div>
                    <div>
                        <label htmlFor="telefono">Teléfono</label>
                        <input id="telefono" type="tel" name="telefono" title="Ingresa un telefono válido" pattern="[0-9]+" maxLength="9" placeholder="Ej: 098 123 456" required />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" name="email" placeholder="tu@email.com" required />
                    </div>
                    <div>
                        <label htmlFor="consulta">Consulta</label>
                        <textarea id="consulta" name="consulta" minLength="10" maxLength="2000" placeholder="Escribe tu consulta..." required></textarea>                
                    </div>
                    <button type="submit" >✦ Enviar mensaje ✦</button>
                    
                </form>
                <img src="/img/separador.png" alt="separador" id="separador" />
            </div>
        </main>
    
  )
}
