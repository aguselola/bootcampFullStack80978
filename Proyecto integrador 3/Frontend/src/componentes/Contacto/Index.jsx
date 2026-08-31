import { useState } from 'react'
import './Index.css'


export function Index() {

    const formClear = {
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        comentarios: ''
    }

    const erroresClear = {
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        comentarios: ''
    }

    const [formulario, setFormulario] = useState(formClear)
    const [errores, setErrores] = useState(erroresClear)
    const [enviado, setEnviado] = useState(false)

    function validarCampo(campo, valor) {
        switch (campo) {
            case 'nombre':
                if (!valor?.trim()) return 'El nombre es obligatorio'
                if (valor.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres'
                if (valor.trim().length > 50) return 'El nombre no puede superar 50 caracteres'
                break
            case 'apellido':
                if (valor?.trim() && valor.trim().length < 2)
                    return 'El apellido debe tener al menos 2 caracteres'
                if (valor?.trim() && valor.trim().length > 50)
                    return 'El apellido no puede superar 50 caracteres'
                break
            case 'telefono':
                if (valor?.trim() && !/^[0-9]+$/.test(valor.trim()))
                    return 'El teléfono solo puede contener números'
                if (valor?.trim() && valor.trim().length > 9)
                    return 'El teléfono no puede superar 9 dígitos'
                break
            case 'email':
                if (!valor?.trim()) return 'El email es obligatorio'
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim()))
                    return 'Ingresá un email válido (ej: tu@email.com)'
                break
            case 'comentarios':
                if (!valor?.trim()) return 'El comentario es obligatorio'
                if (valor.trim().length < 10)
                    return 'El comentario debe tener al menos 10 caracteres'
                if (valor.trim().length > 2000)
                    return 'El comentario no puede superar 2000 caracteres'
                break
        }
        return ''
    }

    function handleBlur(campo) {
        const mensaje = validarCampo(campo, formulario[campo])
        setErrores(prev => ({ ...prev, [campo]: mensaje }))
    }

    function validarFormulario(datos) {
        const campos = ['nombre', 'apellido', 'telefono', 'email', 'comentarios']
        const nuevosErrores = { ...erroresClear }

        campos.forEach(campo => {
            nuevosErrores[campo] = validarCampo(campo, datos[campo])
        })

        setErrores(nuevosErrores)
        return !Object.values(nuevosErrores).some(msg => msg !== '')
    }

    function handleChange(campo, valor) {
        setFormulario(prev => ({ ...prev, [campo]: valor }))
        if (errores[campo]) {
            setErrores(prev => ({ ...prev, [campo]: '' }))
        }
        if (enviado) setEnviado(false)
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (!validarFormulario(formulario)) return

        setEnviado(true)
        setFormulario(formClear)
        setErrores(erroresClear)
    }

    return (
        <main>
            <h1>Conectemos</h1>

            <div id="formulario">
                <p>✦¿Tenes dudas, consultas o queres hacer un pedido especial?✦</p>
                <p>Escribinos, estamos para ayudarte.</p>

                <img src="/img/separador.png" alt="separador" id="separador" />

                <form id="formularioContacto" onSubmit={handleSubmit} noValidate>
                    <div className="input-group">
                        <label htmlFor="nombre">Nombre</label>
                        <span className="form-ayuda">Obligatorio. Entre 2 y 50 caracteres.</span>
                        <input
                            id="nombre"
                            type="text"
                            name="nombre"
                            placeholder="Tu nombre"
                            value={formulario.nombre}
                            onChange={e => handleChange('nombre', e.target.value)}
                            onBlur={() => handleBlur('nombre')}
                        />
                        <div className="error-detail">{errores.nombre}</div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="apellido">Apellido</label>
                        <span className="form-ayuda">Opcional. Si lo completás, mínimo 2 caracteres.</span>
                        <input
                            id="apellido"
                            type="text"
                            name="apellido"
                            placeholder="Tu apellido"
                            value={formulario.apellido}
                            onChange={e => handleChange('apellido', e.target.value)}
                            onBlur={() => handleBlur('apellido')}
                        />
                        <div className="error-detail">{errores.apellido}</div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="telefono">Teléfono</label>
                        <span className="form-ayuda">Opcional. Solo números, máximo 9 dígitos.</span>
                        <input
                            id="telefono"
                            type="tel"
                            name="telefono"
                            placeholder="Ej: 098123456"
                            value={formulario.telefono}
                            onChange={e => handleChange('telefono', e.target.value)}
                            onBlur={() => handleBlur('telefono')}
                        />
                        <div className="error-detail">{errores.telefono}</div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <span className="form-ayuda">Obligatorio. Formato: tu@email.com</span>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="tu@email.com"
                            value={formulario.email}
                            onChange={e => handleChange('email', e.target.value)}
                            onBlur={() => handleBlur('email')}
                        />
                        <div className="error-detail">{errores.email}</div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="comentarios">Comentarios</label>
                        <span className="form-ayuda">Obligatorio. Entre 10 y 2000 caracteres.</span>
                        <textarea
                            id="comentarios"
                            name="comentarios"
                            placeholder="Escribí tu consulta..."
                            value={formulario.comentarios}
                            onChange={e => handleChange('comentarios', e.target.value)}
                            onBlur={() => handleBlur('comentarios')}
                        />
                        <div className="error-detail">{errores.comentarios}</div>
                    </div>

                    {enviado && (
                        <p className="mensaje-exito">
                            ✦ Tu mensaje fue enviado correctamente. Te responderemos a la brevedad. ✦
                        </p>
                    )}

                    <button type="submit">✦ Enviar mensaje ✦</button>
                </form>

                <img src="/img/separador.png" alt="separador" id="separador" />
            </div>
        </main>
    )
}
