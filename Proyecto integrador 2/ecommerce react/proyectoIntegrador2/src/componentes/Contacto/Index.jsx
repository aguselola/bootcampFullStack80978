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
                        <label for="nombre">Nombre</label>
                        <input id="nombre" type="text" name="nombre" minlength="2" maxlength="50" placeholder="Tu nombre" required />
                    </div>
                    <div>
                        <label for="apellido">Apellido</label>
                        <input id="apellido" type="text" name="apellido" minlength="2" maxlength="50" placeholder="Tu apellido" required />
                    </div>
                    <div>
                        <label for="telefono">Teléfono</label>
                        <input id="telefono" type="tel" name="telefono" title="Ingresa un telefono válido" pattern="[0-9]+" maxlength="9" placeholder="Ej: 098 123 456" required />
                    </div>
                    <div>
                        <label for="email">Email</label>
                        <input id="email" type="email" name="email" placeholder="tu@email.com" required />
                    </div>
                    <div>
                        <label for="consulta">Consulta</label>
                        <textarea id="consulta" name="consulta" minlength="10" maxlength="2000" placeholder="Escribe tu consulta..." required></textarea>                
                    </div>
                    <button type="submit" >✦ Enviar mensaje ✦</button>
                    
                </form>
                <img src="/img/separador.png" alt="separador" id="separador" />
            </div>
        </main>
    
  )
}
