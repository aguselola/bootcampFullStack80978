import { useEffect, useState } from 'react'
import {useStateLocalStorage} from '../../hooks/useStateLocalStorage'
import { useDispatch } from 'react-redux'
import { actionSetCantidad } from '../../state/actions'


import './Index.css'
import servicioProductos from '../../servicios/productos'


export function Index() {

    const [productos, setProductos] = useState([])  
    const [carrito, setCarrito] = useStateLocalStorage('carrito', [])
    const [toast, setToast] = useState(null)
    const dispatch = useDispatch()

    // Hook de Efecto de montado / desmontado
    useEffect(() => {
        console.warn('Componente Inicio (montado)')

            ; (async () => {
                const productos = await servicioProductos.getAll()
                setProductos(productos)
            })()

        return () => {
            console.warn('Componente Inicio (desmontado)')
        }
    }, [])

    useEffect(() => {
        const cantidad = carrito.reduce((acc, p) => acc + (p.cantidad || 1), 0)
        dispatch(actionSetCantidad(cantidad))
    }, [carrito])

    useEffect(() => {
        if (!toast) return

        const timer = setTimeout(() => setToast(null), 3500)
        return () => clearTimeout(timer)
    }, [toast])

    function agregarAlCarrito(producto) {
        const id = producto.id
        setCarrito(prev => {
            const carritoClon = [...prev]
            const productoExistente = carritoClon.find(p => (p.id ?? p._id) == id)

            if (!productoExistente) {
                const productoClon = { ...producto, id, cantidad: 1 }
                carritoClon.push(productoClon)
            } else {
                productoExistente.cantidad++
                const index = carritoClon.findIndex(p => (p.id ?? p._id) == id)
                carritoClon.splice(index, 1, productoExistente)
            }
            return carritoClon
        })
        setToast(producto)
    }

    function cerrarToast() {
        setToast(null)
    }

  return (
    <>
    
        <div className="section-cards">
            <div className="section-cards-header">
                <h1>Listado de Productos</h1>
            </div>
            <div className="section-cards-body">
                {productos.length
                    ? productos.map((producto, i) =>
                        <section className='cards' key={producto.id ?? i}>
                            <h3>{producto.nombre}</h3>
                            <div className="card">
                                <img className="foto-producto-inicio" src={producto.foto} alt={producto.nombre} />
                                <div className="card-info">
                                    <p className="p-precio"><img className="precio" src="/img/tagprecio.PNG" alt="foto precio" /><b>Precio:</b> ${producto.precio}</p>
                                    <p className="p-stock"><img className="stock" src="/img/stock.PNG" alt="foto stock" /><b>Stock:</b> {producto.stock}</p>
                                    <p className="p-marca"><img className="marca" src="/img/marca.PNG" alt="foto marca" /><b>Marca:</b> {producto.marca}</p>
                                    <p className="p-categoria"><img className="categoria" src="/img/categoria.PNG" alt="foto categoria" /><b>Categoría:</b> {producto.categoria}</p>
                                    <p className="p-detalles"><img className="detalles" src="/img/detalles.PNG" alt="foto detalles" /><b>Detalles:</b> {producto.detalles}</p>
                                    <br />
                                    <p className="p-envio"><img className="envio" src="/img/envio.PNG" alt="foto envio" /><b>Envío:</b> {producto.envio ? 'Si' : 'No'}</p>
                                </div>
                            </div>
                            <button onClick={() => agregarAlCarrito(producto)}>✦Agregar al carrito✦</button>
                        </section>
                    )
                    : <h2>No se encontraron productos para mostrar</h2>
                }
            </div>
        </div>
        {toast && (
            <div className="toast-carrito" role="status" aria-live="polite">
                <p>
                    ✦ <strong>{toast.nombre}</strong> se agregó al carrito
                </p>
                <button
                    type="button"
                    className="toast-cerrar"
                    onClick={cerrarToast}
                    aria-label="Cerrar aviso"
                >
                    ×
                </button>
            </div>
        )}
    </>
  )
}

