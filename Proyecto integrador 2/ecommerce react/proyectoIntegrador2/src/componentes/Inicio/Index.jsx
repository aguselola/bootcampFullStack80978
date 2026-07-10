import { useEffect, useState } from 'react'
import {useStateLocalStorage} from '../../hooks/useStateLocalStorage'

import './Index.css'
import servicioProductos from '../../servicios/productos'


export function Index() {

    const [productos, setProductos] = useState([])  
    const [carrito, setCarrito] = useStateLocalStorage('carrito', [])
    const [productoAgregado, setProductoAgregado] = useState(null)

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

    function agregarAlCarrito(producto) {
        setCarrito(prev => {
            const existe = prev.find(p => p.id == producto.id)
            if (existe) {
                return prev.map(p =>
                    p.id == producto.id
                        ? { ...p, cantidad: p.cantidad + 1 }
                        : p
                )
            }
            return [...prev, { ...producto, cantidad: 1 }]
        })
        setProductoAgregado(producto)
    }

    function cerrarModal() {
        setProductoAgregado(null)
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
        {productoAgregado && (
            <div className="modal-overlay" onClick={cerrarModal}>
                <div className="modal-confirmar" onClick={e => e.stopPropagation()}>
                    <h3>✦ Producto agregado ✦</h3>
                    <p>
                        <strong>{productoAgregado.nombre}</strong> se añadió correctamente a tu carrito.
                    </p>
                    <div className="modal-botones">
                        <button className="btnConfirmarModal" onClick={cerrarModal}>
                            Seguir comprando
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
  )
}

