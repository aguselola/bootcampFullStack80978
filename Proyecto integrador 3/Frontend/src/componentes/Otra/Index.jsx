import { useState } from 'react'
import './Index.css'


const rituales = [
    {
        id: 1,
        titulo: 'Limpieza energética',
        icono: '☽',
        descripcion: 'Encendé un sahumerio o palo santo al iniciar el día. Recorré tu espacio en sentido horario mientras visualizás cómo se van las cargas pesadas.',
        productos: 'Sahumos, inciensos, velas blancas'
    },
    {
        id: 2,
        titulo: 'Intención con cristales',
        icono: '✧',
        descripcion: 'Elegí una piedra que resuene con lo que necesitás hoy. Sostenela en tus manos, cerrá los ojos y repetí una afirmación en voz baja tres veces.',
        productos: 'Cuarzo rosa, amatista, obsidiana'
    },
    {
        id: 3,
        titulo: 'Ritual de la luna',
        icono: '☾',
        descripcion: 'En luna nueva, plantá deseos. En luna llena, soltá lo que ya no te sirve. Anotá tus reflexiones en un cuaderno y acompañá el ciclo con calma.',
        productos: 'Velas, diario, cartas de tarot'
    },
    {
        id: 4,
        titulo: 'Tarot introspectivo',
        icono: '❋',
        descripcion: 'Sacá una carta al despertar. Observá su símbolo sin buscar respuestas inmediatas: dejá que el mensaje se revele a lo largo del día.',
        productos: 'Mazos de tarot, oráculos'
    }
]

const intenciones = {
    calma: {
        titulo: 'Calma',
        mensaje: 'Respirá profundo tres veces. Encendé una vela lavanda y repetí: "Elijo la paz en este momento".',
        icono: '☼'
    },
    abundancia: {
        titulo: 'Abundancia',
        mensaje: 'Colocá un cuarzo citrino cerca de tu espacio de trabajo y agradecé tres cosas que ya tenés hoy.',
        icono: '✦'
    },
    proteccion: {
        titulo: 'Protección',
        mensaje: 'Visualizá una luz dorada rodeándote. Llevá contigo una obsidiana o amuleto que te haga sentir segura.',
        icono: '⊹'
    },
    amor: {
        titulo: 'Amor propio',
        mensaje: 'Mirate al espejo y decí algo amable sobre vos. El cuarzo rosa puede acompañar este ritual con suavidad.',
        icono: '❤'
    }
}


export function Index() {

    const [intencionElegida, setIntencionElegida] = useState(null)

    return (
        <>
            <h1>Rituales & Guías</h1>

            <section className="otra-intro">
                <p>
                    En <b>Arcana Cósmica</b> creemos que cada objeto puede ser una herramienta de conexión.
                    Acá encontrás rituales sencillos para integrar la magia en tu rutina, sin complicaciones ni reglas rígidas.
                </p>
                <img src="/img/separador.png" alt="" className="otra-separador" />
            </section>

            <section className="otra-rituales">
                <h2>✦ Rituales para tu día ✦</h2>
                <div className="otra-cards">
                    {rituales.map(ritual =>
                        <article className="otra-card" key={ritual.id}>
                            <span className="otra-card-icono">{ritual.icono}</span>
                            <h3>{ritual.titulo}</h3>
                            <p>{ritual.descripcion}</p>
                            <p className="otra-productos">
                                <b>Ideal con:</b> {ritual.productos}
                            </p>
                        </article>
                    )}
                </div>
            </section>

            <section className="otra-intencion">
                <h2>☾ Elegí tu intención del momento ☾</h2>
                <p className="otra-intencion-texto">
                    Tocá la energía que necesitás hoy y recibí una sugerencia de ritual.
                </p>

                <div className="otra-botones-intencion">
                    {Object.entries(intenciones).map(([clave, datos]) =>
                        <button
                            key={clave}
                            type="button"
                            className={intencionElegida === clave ? 'otra-btn-intencion activa' : 'otra-btn-intencion'}
                            onClick={() => setIntencionElegida(clave)}
                        >
                            {datos.icono} {datos.titulo}
                        </button>
                    )}
                </div>

                {intencionElegida && (
                    <div className="otra-resultado">
                        <h3>
                            {intenciones[intencionElegida].icono}{' '}
                            Ritual de {intenciones[intencionElegida].titulo}
                        </h3>
                        <p>{intenciones[intencionElegida].mensaje}</p>
                    </div>
                )}
            </section>

            <section className="otra-cierre">
                <p>
                    <b>⊹ Recordá: no hace falta hacerlo perfecto. Hace falta hacerlo con intención. ⊹</b>
                </p>
            </section>
        </>
    )
}
