import {useStateLocalStorage} from '../../hooks/useStateLocalStorage'
import {  useState } from 'react'
import servicioPedidos from '../../servicios/pedidos'
import './Index.css'


export function Index() {

    const [carrito, setCarrito] = useStateLocalStorage('carrito', [])
    const [productoAEliminar, setProductoAEliminar] = useState(null)
    const [modalVaciar, setModalVaciar] = useState(false)
    const [modalPedido, setModalPedido] = useState(null)
    const [enviando, setEnviando] = useState(false)

    const total = carrito.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0)

    function abrirModalVaciar() {
        if (!carrito.length) return
        setModalVaciar(true)
    }

    function confirmarVaciar() {
        setCarrito([])
        setModalVaciar(false)
    }

    function cancelarVaciar() {
        setModalVaciar(false)
    }

    function decrementarItem(id) {
        const carritoClon = [...carrito]
        const producto = carritoClon.find(p => p.id == id)
        //console.log(producto)

        if (producto.cantidad > 1) {
            producto.cantidad--
            setCarrito(carritoClon)
        }
    }

    function incrementarItem(id) {
        setCarrito(prev =>
            prev.map(p =>
                p.id == id ? { ...p, cantidad: p.cantidad + 1 } : p
            )
        )
    }
    function borrarItem(id) {
        setCarrito(prev => prev.filter(p => p.id !== id))
    }

    function confirmarEliminacion() {
        setCarrito(prev => prev.filter(p => p.id !== productoAEliminar.id))
        setProductoAEliminar(null)
    }
    function cancelarEliminacion() {
        setProductoAEliminar(null)
    }

    function abrirModalPedido() {
        if (!carrito.length) return
        setModalPedido('confirmar')
    }

    async function confirmarPedido() {
        setEnviando(true)

        try {
            const pedido = {
                fecha: new Date().toLocaleString(),
                pedido: carrito
                
            }

            await servicioPedidos.enviar(pedido)
            setCarrito([])
            setModalPedido('exito')
        } catch (error) {
            console.error('Error al enviar pedido', error)
            setModalPedido('error')
        } finally {
            setEnviando(false)
        }
    }

    function cerrarModalPedido() {
        setModalPedido(null)
    }
  return (
    <>
        
        <h1>Carrito de Compras</h1>


        <section className="carrito">

            <h4>🛒 Tu Ritual Seleccionado</h4>


            <button
                className="btnVaciar"
                onClick={abrirModalVaciar}
                disabled={!carrito.length}
            >
                Vaciar carrito
            </button>
            <br/>
            <br/>

            {

                carrito.map((producto, i) =>

                    <div className="productoCarrito" key={producto.id ?? i}>

                        <img src={producto.foto} alt={producto.nombre} />

                        <div className="infoProducto">

                            <h3>{producto.nombre}</h3>

                            <p>{producto.detalles}</p>
                            <p>{producto.envio?'Envío disponible':'Envío no disponible'}</p>

                            <p className='p-precio'>${producto.precio}</p>

                            <button className="btnIncDec" onClick={
                                () => decrementarItem(producto.id)
                            }>-</button>

                            <p className='cantidad'>{producto.cantidad}</p>

                            <button className="btnIncDec" onClick={
                                () => incrementarItem(producto.id)
                            }>+</button>

                            <p className='p-precio'>Subtotal: ${producto.precio * producto.cantidad}</p>



                        </div>

                        <button className="btnBorrar" onClick={
                            () => setProductoAEliminar(producto)
                        }>Eliminar</button>

                    </div>
                )
            }

            {!carrito.length && <h2>No se encontraron pedidos para mostrar</h2>}

            <div className="total">

                <h3>Total: ${total}</h3>

                <button
                    className="finalizar"
                    onClick={abrirModalPedido}
                    disabled={!carrito.length}
                >
                    ✦ Finalizar compra
                </button>

            </div>
            


        </section>

        {modalVaciar && (
            <div className="modal-overlay" onClick={cancelarVaciar}>
                <div className="modal-confirmar" onClick={e => e.stopPropagation()}>
                    <h3>¿Vaciar el carrito?</h3>
                    <p>
                        Vas a quitar <strong>{carrito.length}</strong> producto{carrito.length > 1 ? 's' : ''} de tu ritual seleccionado. Esta acción no se puede deshacer.
                    </p>
                    <div className="modal-botones">
                        <button className="btnCancelarModal" onClick={cancelarVaciar}>
                            Cancelar
                        </button>
                        <button className="btnConfirmarModal" onClick={confirmarVaciar}>
                            Sí, vaciar carrito
                        </button>
                    </div>
                </div>
            </div>
        )}

        {productoAEliminar && (
            <div className="modal-overlay" onClick={cancelarEliminacion}>
                <div className="modal-confirmar" onClick={e => e.stopPropagation()}>
                    <h3>¿Eliminar del carrito?</h3>
                    <p>
                        Vas a quitar <strong>{productoAEliminar.nombre}</strong> de tu ritual seleccionado.
                    </p>
                    <div className="modal-botones">
                        <button className="btnCancelarModal" onClick={cancelarEliminacion}>
                            Cancelar
                        </button>
                        <button className="btnConfirmarModal" onClick={confirmarEliminacion}>
                            Sí, eliminar
                        </button>
                    </div>
                </div>
            </div>
        )}

        {modalPedido === 'confirmar' && (
            <div className="modal-overlay" onClick={cerrarModalPedido}>
                <div className="modal-confirmar" onClick={e => e.stopPropagation()}>
                    <h3>¿Confirmar pedido?</h3>
                    <p>
                        Vas a enviar <strong>{carrito.length}</strong> producto{carrito.length > 1 ? 's' : ''} por un total de <strong>${total}</strong>.
                    </p>
                    <div className="modal-botones">
                        <button className="btnCancelarModal" onClick={cerrarModalPedido} disabled={enviando}>
                            Cancelar
                        </button>
                        <button className="btnConfirmarModal" onClick={confirmarPedido} disabled={enviando}>
                            {enviando ? 'Enviando...' : 'Sí, finalizar compra'}
                        </button>
                    </div>
                </div>
            </div>
        )}

        {modalPedido === 'exito' && (
            <div className="modal-overlay" onClick={cerrarModalPedido}>
                <div className="modal-confirmar" onClick={e => e.stopPropagation()}>
                    <h3>✦ Pedido enviado ✦</h3>
                    <p>Tu ritual fue registrado correctamente. ¡Gracias por tu compra!</p>
                    <div className="modal-botones">
                        <button className="btnConfirmarModal" onClick={cerrarModalPedido}>
                            Aceptar
                        </button>
                    </div>
                </div>
            </div>
        )}

        {modalPedido === 'error' && (
            <div className="modal-overlay" onClick={cerrarModalPedido}>
                <div className="modal-confirmar" onClick={e => e.stopPropagation()}>
                    <h3>No se pudo enviar el pedido</h3>
                    <p>Hubo un problema al conectar con el servidor. Intentá de nuevo en unos momentos.</p>
                    <div className="modal-botones">
                        <button className="btnCancelarModal" onClick={cerrarModalPedido}>
                            Cerrar
                        </button>
                        <button className="btnConfirmarModal" onClick={confirmarPedido} disabled={enviando}>
                            {enviando ? 'Enviando...' : 'Reintentar'}
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>

  )
}

