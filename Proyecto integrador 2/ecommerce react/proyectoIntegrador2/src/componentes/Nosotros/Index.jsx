import { useState } from 'react'
import './Index.css'


export function Index() {

  return (
    <>
        <section>

            <h1>Acerca de Nosotros...</h1>

            <section className='nosotros-section'>
                <p>En <b>Arcana Cósmica</b> creemos que la espiritualidad puede ser un refugio, una guía y también una forma de reconectar con vos misma. Nacimos con la intención de crear un <b>espacio cálido y auténtico</b> donde el esoterismo se viva desde la intuición, la energía y el autoconocimiento.</p>


                <p>Es más que una tienda: es un universo creado para quienes sienten curiosidad por lo místico, disfrutan de los rituales cotidianos y buscan darle intención a cada etapa de su vida. Cada objeto, lectura y contenido está pensado para acompañarte en tus procesos, ayudarte a conectar con tu energía y transformar lo cotidiano en algo mágico.</p> 

                <p>Nos inspiran herramientas como el tarot, las piedras energéticas, los sahumos y la energía de los ciclos, entendiendo el esoterismo como una <b>experiencia personal, introspectiva y simbólica.</b></p> 
                
                <p>Queremos que cada persona que llegue a Arcana Cósmica sienta que encontró un espacio seguro para <b>explorar su intuición, expresar su esencia y rodearse de objetos con significado.</b></p> 
                <div id="esencia">

                    <h4>Nuestra esencia:</h4> 
                    <img id="foto-izq" src="/img/fondoDecoracion.png" alt="decoracion" /> 
                    <img id="foto-der" src="/img/fondoDecoracion.png" alt="decoracion" /> 
                    <ul> 
                        <li>☾ Espiritualidad sin rigidez ☾</li> 
                        <li>❋ Objetos y rituales con intención ❋</li> 
                        <li>✧ Energía, intuición y conexión ✧</li> 
                        <li>☼ Una comunidad que cree en la magia de lo cotidiano ☼</li> 
                    </ul> 
                </div>
                
                
                <p id="ultimoP"><b>⊹ Porque creemos que la magia no está lejos: habita en los pequeños rituales, en las señales, en la energía que elegís cultivar y en el vínculo que construís con vos misma. ⊹</b></p>
            </section>
        </section>

    </>
  )
}
