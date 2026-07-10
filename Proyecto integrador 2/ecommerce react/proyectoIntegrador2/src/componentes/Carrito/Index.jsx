import { useState } from 'react'
import {useStateLocalStorage} from '../../hooks/useStateLocalStorage'
import servicioProductos from '../../servicios/productos'
import './Index.css'


export function Index() {

    const [carrito, setCarrito] = useStateLocalStorage('carrito', [])
    const [total, setTotal] = useState(0)

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

  return (
    <>
        
        <h1>Carrito de Compras</h1>


        <section className="carrito">

            <h4>🛒 Tu Ritual Seleccionado</h4>

            {
                carrito.map((producto, i) =>

                    <div className="productoCarrito">

                        <img src={producto.foto} alt={producto.nombre} />

                        <div className="infoProducto">

                            <h3>{producto.nombre}</h3>

                            <p>{producto.detalles}</p>
                            <p>{producto.envio?'Envío disponible':'Envío no disponible'}</p>

                            <p className='p-precio'>${producto.precio * producto.cantidad}</p>

                            <button className="btnIncDec" onClick={
                                () => decrementarItem(producto.id)
                            }>-</button>

                            <p className='cantidad'>{producto.cantidad}</p>

                            <button className="btnIncDec" onClick={
                                () => incrementarItem(producto.id)
                            }>+</button>


                        </div>

                        <button className="btnBorrar" onClick={
                            () => borrarItem(producto.id)
                        }>Eliminar</button>

                    </div>
                )
            }

            {!carrito.length && <h2>No se encontraron pedidos para mostrar</h2>}

            <div className="total">

                <h3>Total:</h3>

                <button className="finalizar">
                    ✦ Finalizar compra
                </button>

            </div>
            


        </section>
    </>

  )
}

