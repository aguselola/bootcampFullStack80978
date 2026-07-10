import { useState, useEffect } from 'react'
import './Index.css'
import servicioProductos from '../../servicios/productos'


export function Index() {

    const prodClear = {
        nombre: '',
        precio: '',
        stock: '',
        marca: '',
        categoria: '',
        detalles: '',
        foto: '',
        envio: false
    }
    const erroresClear = {
        nombre: '',
        precio: '',
        stock: '',
        marca: '',
        categoria: '',
        detalles: '',
        foto: ''
    }
    // estado interno del componente alta
    const [productos, setProductos] = useState([])             // Hook de Estado)
    const [producto, setProducto] = useState(prodClear)        // Hook de Estado
    const [editarID, setEditarID] = useState(null)
    const [errores, setErrores] = useState(erroresClear)
    
    
    // Hook de Efecto de montado / desmontado
    useEffect(() => {
        console.warn('Componente Alta (montado)')
        
        ; (async () => {
            const productos = await servicioProductos.getAll()
            setProductos(productos)
        })()
        
        return () => {
            console.warn('Componente Alta (desmontado)')
        }
    }, [])
    
    function validarProducto(prod) {
        const nuevosErrores = { ...erroresClear }
        if (!prod.nombre?.trim()) {
            nuevosErrores.nombre = 'El nombre es obligatorio'
        }
        if (prod.precio === '' || isNaN(prod.precio) || prod.precio < 0) {
            nuevosErrores.precio = 'El precio es obligatorio y debe ser un número válido'
        }
        if (prod.stock === '' || isNaN(prod.stock) || prod.stock < 0) {
            nuevosErrores.stock = 'El stock es obligatorio y debe ser un número válido'
        }
        if (!prod.categoria?.trim()) {
            nuevosErrores.categoria = 'La categoría es obligatoria'
        }
        if (!prod.foto?.trim()) {
            nuevosErrores.foto = 'La foto es obligatoria'
        }
        setErrores(nuevosErrores)
        // true si NO hay ningún error
        return !Object.values(nuevosErrores).some(msg => msg !== '')
    }
    
    async function agregar_actualizar(e) {
        e.preventDefault()

        if (!validarProducto(producto)) return

        console.log('agregar_actualizar')
        //console.log(producto)

        if (editarID) {
            // actualizamos el producto en el recurso remoto
            const productoActualizado = await servicioProductos.actualizar(editarID, producto)
            //console.log(productoActualizado)

            // actualizamos el producto en el recurso local
            const productosClon = [...productos]
            const index = productosClon.findIndex(p => p.id == productoActualizado.id)
            productosClon.splice(index, 1, productoActualizado)
            setProductos(productosClon)

            setEditarID(null)
        }
        else {
            // guardamos el producto en el recurso remoto
            const productoGuardado = await servicioProductos.guardar(producto)
            //console.log(productoGuardado)

            // guardamos el producto en el recurso local
            const productosClon = [...productos]
            productosClon.push(productoGuardado)
            setProductos(productosClon)
        }

        // Borro todos los campos del formularios
        setProducto(prodClear)
        setErrores(erroresClear)
        
    }

    async function borrar(id) {
        console.log('borrar', id)

        if (confirm(`¿Está seguro de borrar el producto de id ${id}?`)) {
            // borramos el producto en el recurso remoto
            const productoEliminado = await servicioProductos.eliminar(id)
            //console.log(productoEliminado)

            // borro el producto en el recurso local
            const productosClon = [...productos]
            const index = productosClon.findIndex(p => p.id == productoEliminado.id)
            productosClon.splice(index, 1)
            setProductos(productosClon)
        }
    }

    function editar(id) {
        console.log('editar', id)

        setEditarID(id)

        const producto = productos.find(p => p.id == id)
        //console.log(producto)

        setProducto(producto)
    }

    function cancelar(id) {
        console.log('cancelar', id)

        setEditarID(null)

        setProducto(prodClear)
        setErrores(erroresClear)
    }


  return (
    <>
        <h1>Alta de Productos</h1>

        <form className="alta-form" onSubmit={agregar_actualizar}>
            
             {/* campo nombre  */}
            <div className="input-group">
                <label htmlFor="nombre">nombre</label>
                <input id="nombre" type="text" name="nombre" value={producto.nombre} onChange={
                        e => {setProducto({ ...producto, nombre: e.target.value })
                        if (errores.nombre) setErrores({ ...errores, nombre: '' })

                    }} />
                <div className="error-detail">{errores.nombre}</div>
            </div>

             {/* campo precio  */}
            <div className="input-group">
                <label htmlFor="precio">precio</label>
                <input id="precio" step="any" type="number" name="precio" value={producto.precio} min="0" onChange={
                        e => {setProducto({ ...producto, precio: +e.target.value })
                        if (errores.precio) setErrores({ ...errores, precio: '' })

                    }}/>
                <div className="error-detail">{errores.precio}</div>
            </div>

             {/* campo stock  */}
            <div className="input-group">
                <label htmlFor="stock">stock</label>
                <input id="stock" type="number" name="stock" min="0" value={producto.stock} onChange={
                        e => {setProducto({ ...producto, stock:  parseInt(e.target.value)})
                        if (errores.stock) setErrores({ ...errores, stock: '' })

                    }} />
                <div className="error-detail">{errores.stock}</div>
            </div>

             {/* campo marca  */}
            <div className="input-group">
                <label htmlFor="marca">marca</label>
                <input id="marca" type="text" name="marca" value={producto.marca} onChange={
                        e => setProducto({ ...producto, marca: e.target.value })
                    } />
                <div className="error-detail"></div>
            </div>

             {/* campo categoria  */}
            <div className="input-group">
                <label htmlFor="categoria">categoría</label>
                <input id="categoria" type="text" name="categoria" value={producto.categoria} onChange={
                        e => {setProducto({ ...producto, categoria: e.target.value })
                        if (errores.categoria) setErrores({ ...errores, categoria: '' })

                    }}/>
                <div className="error-detail">{errores.categoria}</div>
            </div>

             {/* campo detalles  */}
            <div className="input-group">
                <label htmlFor="detalles">detalles</label>
                <input id="detalles" type="text" name="detalles" value={producto.detalles} onChange={
                        e => setProducto({ ...producto, detalles: e.target.value })
                    } />
                <div className="error-detail"></div>
            </div>

             {/* campo foto  */}
            <div className="input-group">
                <label htmlFor="foto">foto</label>
                <input id="foto" type="text" name="foto" value={producto.foto} onChange={
                        e => {setProducto({ ...producto, foto: e.target.value })
                        if (errores.foto) setErrores({ ...errores, foto: '' })

                    }} />
                <div className="error-detail">{errores.foto}</div>
            </div>

             {/* campo envio  */}
            <div className="input-group">
                <input id="envio" type="checkbox" name="envio" checked={producto.envio} onChange={
                        e => setProducto({ ...producto, envio: e.target.checked })
                    } />
                <label htmlFor="envio">envío</label>
            </div>

             {/* botón de envío  */}
            <button className={editarID? 'btnActualizar' : 'btnAgregar'}>
                    { editarID? 'Actualizar' : 'Agregar' }
            </button>

        </form>

        <hr />

        <h2>Listado de productos disponibles</h2>

        <div className="responsive">
            <table>
                <thead>
                        <tr>
                            <th>#</th>
                            <th>nombre</th>
                            <th>precio</th>
                            <th>stock</th>
                            <th>marca</th>
                            <th>categoría</th>
                            <th>detalles</th>
                            <th>foto</th>
                            <th>envío</th>
                            <th>acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productos.map((producto, i) =>
                                <tr key={i}>
                                    <td className="centrar">{producto.id}</td>
                                    <td>{producto.nombre}</td>
                                    <td className="centrar">${producto.precio}</td>
                                    <td className="centrar">{producto.stock}</td>
                                    <td>{producto.marca}</td>
                                    <td>{producto.categoria}</td>
                                    <td>{producto.detalles}</td>
                                    <td><img className="foto-producto" src={producto.foto} alt={'Foto de ' + producto.nombre} /></td>
                                    <td className="centrar">{producto.envio ? 'Si' : 'No'}</td>
                                    <td>
                                        <button disabled={editarID} className="borrar-editar btnBorrar" onClick={
                                            () => borrar(producto.id)
                                        }>Borrar</button>

                                        {editarID && (editarID == producto.id)
                                            ? <button className="borrar-editar btnCancelar" onClick={
                                                () => cancelar(producto.id)
                                            }>Cancelar</button>

                                            : <button className="borrar-editar btnEditar" onClick={
                                                () => editar(producto.id)
                                            }>Editar</button>
                                        }
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
            </table>
        </div>

        
    </>
  )
}

