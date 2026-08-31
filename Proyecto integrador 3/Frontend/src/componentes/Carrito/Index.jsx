import {useStateLocalStorage} from '../../hooks/useStateLocalStorage'
import {  useState, useEffect } from 'react'
import servicioPedidos from '../../servicios/pedidos'
import './Index.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { actionSetCantidad } from '../../state/actions'
import './pago' 
import { Wallet } from '@mercadopago/sdk-react'

export function Index() {

    const [carrito, setCarrito] = useStateLocalStorage('carrito', [])
    const [productoAEliminar, setProductoAEliminar] = useState(null)
    const [modalVaciar, setModalVaciar] = useState(false)
    const [modalPedido, setModalPedido] = useState(null)
    const [enviando, setEnviando] = useState(false)
    const [pagar, setPagar] = useState(false)
    const [compraStatus, setCompraStatus] = useState({
        payment_id: 'null',
        status: 'null',
        merchant_order_id: 'null'
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const total = carrito.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0)


    useEffect(() => {
        const cantidad = carrito.reduce((acc, p) => acc + (p.cantidad || 1), 0)
        dispatch(actionSetCantidad(cantidad))
    }, [carrito])


    useEffect(() => {
        async function recibirDatosPago() {
            const parameters = new URL(window.location.href)
            const compra = {
                payment_id: parameters.searchParams.get('payment_id') || 'null',
                status: parameters.searchParams.get('status') || 'null',
                merchant_order_id: parameters.searchParams.get('merchant_order_id') || 'null'
            }
            if (compra.status !== 'null') {
                setCompraStatus(compra)
                if (compra.status === 'approved') {
                    await generarPedido(compra)
                    navigate('/carrito')
                }
            }
        }
        recibirDatosPago()
    }, [])

    async function confirmarPedido() {
        if (!carrito.length) return
        setEnviando(true)
        try {
            await servicioPedidos.enviar(carrito)
            setCarrito([])
            setPagar(false)
            setModalPedido('exito')
        } catch (error) {
            console.error('Error al enviar pedido:', error)
            setModalPedido('error')
        } finally {
            setEnviando(false)
        }
    }

    async function generarPedido(compra) {
        const pedido = {
            fecha: new Date().toLocaleString(),
            compra,
            pedido: carrito
        }
        await servicioPedidos.enviar(pedido)
        setCarrito([])
        setPagar(false)
        setModalPedido('exito')
    }

    function abrirModalVaciar() {
        if (!carrito.length) return
        setModalVaciar(true)
    }

    function confirmarVaciar() {
        setCarrito([])
        setPagar(false)
        setModalVaciar(false)
    }

    function cancelarVaciar() {
        setModalVaciar(false)
    }

    function decrementarItem(id) {
        const carritoClon = [...carrito]
        const producto = carritoClon.find(p => p.id == id)
        //console.log(producto)

        if (producto && producto.cantidad > 1) {
            producto.cantidad--
            setCarrito(carritoClon)
            setPagar(false)
        }
    }

    function incrementarItem(id) {
        setCarrito(prev =>
            prev.map(p =>
                (p.id ?? p._id) == id ? { ...p, cantidad: p.cantidad + 1 } : p
            )
        )
        setPagar(false)
    }
    

    function confirmarEliminacion() {
        setCarrito(prev => prev.filter(p => (p.id ?? p._id) !== (productoAEliminar.id ?? productoAEliminar._id)))
        setProductoAEliminar(null)
        setPagar(false)

    }
    function cancelarEliminacion() {
        setProductoAEliminar(null)
    }


    function cerrarModalPedido() {
        setModalPedido(null)
    }

    const customization = {
        theme: 'default',
        customStyle: {
            buttonHeight: '48px',
            borderRadius: '20px',
        }
    }
    const onReady = () => console.log('Wallet listo')
    const onError = error => console.error('Error Wallet:', error)
    // const onSubmit = () => {
        // return new Promise((resolve, reject) => {
        //     servicioPedidos.getPreferenceId(carrito)
        //         .then(preferenceId => resolve(preferenceId))
        //         .catch(error => reject(error))
        // })
    const onSubmit = async () => {
        try {
            const preferenceId = await servicioPedidos.getPreferenceId(carrito)
            console.log('preferenceId:', preferenceId)
            return preferenceId
        } catch (error) {
            console.error('Error MP:', error.response?.data || error.message)
            throw error
        }
    }
    
  return (
    <>
        
        <h1>Carrito de Compras</h1>

        {/* Cartel resultado del pago */}
        {compraStatus.status !== 'null' && (
            <div style={{
                backgroundColor: compraStatus.status === 'approved' ? '#c4e8c4' : '#f8c8c8',
                width: '50%',
                margin: '0 auto 20px',
                padding: '15px',
                borderRadius: '15px',
                border: '2px dashed #743309'
            }}>
                <h3>Pago {compraStatus.status === 'approved' ? 'exitoso ✦' : 'rechazado'}</h3>
                <p>payment_id: {compraStatus.payment_id}</p>
                <p>status: {compraStatus.status}</p>
            </div>
        )}
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
                    onClick={confirmarPedido}
                    disabled={!carrito.length || enviando}
                >
                    {enviando ? 'Enviando...' : '✦ Confirmar pedido'}
                </button>

                {!pagar ? (
                    <button
                        className="finalizar"
                        onClick={() => setPagar(true)}
                        disabled={!carrito.length || enviando}
                    >
                        ✦ Pagar con Mercado Pago
                    </button>
                ) : (
                    <div id="wallet-container">
                        <Wallet
                            customization={customization}
                            onReady={onReady}
                            onError={onError}
                            onSubmit={onSubmit}
                        />
                    </div>
                )}

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

