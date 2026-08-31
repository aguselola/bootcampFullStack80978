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
    const [productoABorrar, setProductoABorrar] = useState(null)
    const [modalError, setModalError] = useState(null)
    const [errorCarga, setErrorCarga] = useState(null)
    const [guardando, setGuardando] = useState(false)
    const [eliminando, setEliminando] = useState(false)
    
    
    // Hook de Efecto de montado / desmontado
    useEffect(() => {
        console.warn('Componente Alta (montado)')
        
        ; (async () => {
            try {
                const productos = await servicioProductos.getAll()
                setProductos(productos)
            } catch (error) {
                console.error('Error al cargar productos', error)
                setErrorCarga('No se pudieron cargar los productos. Verificá tu conexión e intentá de nuevo.')
            }
        })()
        
        return () => {
            console.warn('Componente Alta (desmontado)')
        }
    }, [])

    function validarCampo(campo, valor) {
        switch (campo) {
            case 'nombre':
                if (!valor?.trim()) return 'El nombre es obligatorio'
                break
            case 'precio':
                if (valor === '' || isNaN(valor) || valor < 0)
                    return 'El precio es obligatorio y debe ser un número válido'
                break
            case 'stock':
                if (valor === '' || isNaN(valor) || valor < 0)
                    return 'El stock es obligatorio y debe ser un número válido'
                break
            case 'marca':
                if (!valor?.trim()) return 'La marca es obligatoria'
                break
            case 'categoria':
                if (!valor?.trim()) return 'La categoría es obligatoria'
                break
            case 'foto':
                if (!valor?.trim()) return 'La foto es obligatoria'
                break
        }
        return ''
    }
    
    function validarProducto(prod) {
        const campos = ['nombre', 'precio', 'stock', 'marca', 'categoria', 'foto']
        const nuevosErrores = { ...erroresClear }
        campos.forEach(campo => {
            nuevosErrores[campo] = validarCampo(campo, prod[campo])
        })
        setErrores(nuevosErrores)
        return !Object.values(nuevosErrores).some(msg => msg !== '')
    }

    function handleBlur(campo) {
        const mensaje = validarCampo(campo, producto[campo])
        setErrores(prev => ({ ...prev, [campo]: mensaje }))
    }
    
    async function agregar_actualizar(e) {
        e.preventDefault()

        if (!validarProducto(producto)) return

        setGuardando(true)

        try {
            if (editarID) {
                const productoActualizado = await servicioProductos.actualizar(editarID, producto)

                const productosClon = [...productos]
                const index = productosClon.findIndex(p => p.id == productoActualizado.id)
                productosClon.splice(index, 1, productoActualizado)
                setProductos(productosClon)

                setEditarID(null)
            }
            else {
                const productoGuardado = await servicioProductos.guardar(producto)

                const productosClon = [...productos]
                productosClon.push(productoGuardado)
                setProductos(productosClon)
            }

            setProducto(prodClear)
            setErrores(erroresClear)
        } catch (error) {
            console.error('Error al guardar producto', error)
            setModalError(
                editarID
                    ? 'No se pudo actualizar el producto. Intentá de nuevo en unos momentos.'
                    : 'No se pudo guardar el producto. Intentá de nuevo en unos momentos.'
            )
        } finally {
            setGuardando(false)
        }
    }

    function abrirModalBorrar(producto) {
        setProductoABorrar(producto)
    }

    function cancelarBorrar() {
        setProductoABorrar(null)
    }

    async function confirmarBorrar() {
        setEliminando(true)

        try {
            const productoEliminado = await servicioProductos.eliminar(productoABorrar.id)

            const productosClon = [...productos]
            const index = productosClon.findIndex(p => p.id == productoEliminado.id)
            productosClon.splice(index, 1)
            setProductos(productosClon)

            if (editarID === productoABorrar.id) {
                setEditarID(null)
                setProducto(prodClear)
                setErrores(erroresClear)
            }

            setProductoABorrar(null)
        } catch (error) {
            console.error('Error al eliminar producto', error)
            setProductoABorrar(null)
            setModalError('No se pudo eliminar el producto. Intentá de nuevo en unos momentos.')
        } finally {
            setEliminando(false)
        }
    }

    function cerrarModalError() {
        setModalError(null)
    }

    function editar(id) {

        setEditarID(id)

        const producto = productos.find(p => p.id == id)

        setProducto(producto)
    }

    function cancelar() {
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
                <label htmlFor="nombre">nombre *</label>
                <input id="nombre" type="text" name="nombre" value={producto.nombre} onChange={
                        e => {setProducto({ ...producto, nombre: e.target.value })
                        if (errores.nombre) setErrores({ ...errores, nombre: '' })

                    }}     
                    onBlur={() => handleBlur('nombre')}
                />
                <div className="error-detail-alta">{errores.nombre}</div>
            </div>

             {/* campo precio  */}
            <div className="input-group">
                <label htmlFor="precio">precio *</label>
                <input id="precio" step="any" type="number" name="precio" value={producto.precio} min="0" onChange={
                        e => {setProducto({ ...producto, precio: +e.target.value })
                        if (errores.precio) setErrores({ ...errores, precio: '' })

                    }}
                    onBlur={() => handleBlur('precio')}

                    />
                <div className="error-detail-alta">{errores.precio}</div>
            </div>

             {/* campo stock  */}
            <div className="input-group">
                <label htmlFor="stock">stock *</label>
                <input id="stock" type="number" name="stock" min="0" value={producto.stock} onChange={
                        e => {setProducto({ ...producto, stock:  parseInt(e.target.value)})
                        if (errores.stock) setErrores({ ...errores, stock: '' })

                    }} 
                    onBlur={() => handleBlur('stock')}

                    />
                <div className="error-detail-alta">{errores.stock}</div>
            </div>

             {/* campo marca  */}
            <div className="input-group">
                <label htmlFor="marca">marca *</label>
                <input id="marca" type="text" name="marca" value={producto.marca} onChange={
                        e => {setProducto({ ...producto, marca: e.target.value })
                        if (errores.marca) setErrores({ ...errores, marca: '' })
                        
                }}     
                onBlur={() => handleBlur('marca')}
               
                />
                <div className="error-detail-alta">{errores.marca}</div>
            </div>

             {/* campo categoria  */}
            <div className="input-group">
                <label htmlFor="categoria">categoría *</label>
                <input id="categoria" type="text" name="categoria" value={producto.categoria} onChange={
                        e => {setProducto({ ...producto, categoria: e.target.value })
                        if (errores.categoria) setErrores({ ...errores, categoria: '' })

                    }}
                    onBlur={() => handleBlur('categoria')}

                    />
                <div className="error-detail-alta">{errores.categoria}</div>
            </div>

             {/* campo detalles  */}
            <div className="input-group">
                <label htmlFor="detalles">detalles</label>
                <input id="detalles" type="text" name="detalles" value={producto.detalles} onChange={
                        e => setProducto({ ...producto, detalles: e.target.value })
                    } />
                <div className="error-detail-alta"></div>
            </div>

             {/* campo foto  */}
            <div className="input-group">
                <label htmlFor="foto">foto *</label>
                <input id="foto" type="text" name="foto" value={producto.foto} onChange={
                        e => {setProducto({ ...producto, foto: e.target.value })
                        if (errores.foto) setErrores({ ...errores, foto: '' })

                    }} 
                    onBlur={() => handleBlur('foto')}

                    />
                <div className="error-detail-alta">{errores.foto}</div>
            </div>

             {/* campo envio  */}
            <div className="input-group">
                <input id="envio" type="checkbox" name="envio" checked={producto.envio} onChange={
                        e => setProducto({ ...producto, envio: e.target.checked })
                    } />
                <label htmlFor="envio">envío</label>
            </div>
            <p>*Campos Obligatorios</p>

             {/* botón de envío  */}
            <button className={editarID? 'btnActualizar' : 'btnAgregar'} disabled={guardando}>
                    { guardando ? 'Guardando...' : editarID ? 'Actualizar' : 'Agregar' }
            </button>

        </form>

        <hr />

        <h2>Listado de productos disponibles</h2>

        {errorCarga && <p className="alta-error-carga">{errorCarga}</p>}

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
                                    <td className="centrar">{i+1}</td>
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
                                            () => abrirModalBorrar(producto)
                                        }>Borrar</button>

                                        {editarID && (editarID == producto.id)
                                            ? <button className="borrar-editar btnCancelar" onClick={cancelar}>Cancelar</button>

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

        {productoABorrar && (
            <div className="modal-overlay" onClick={cancelarBorrar}>
                <div className="modal-confirmar" onClick={e => e.stopPropagation()}>
                    <h3>¿Eliminar producto?</h3>
                    <p>
                        Vas a borrar <strong>{productoABorrar.nombre}</strong> (id {productoABorrar.id}). Esta acción no se puede deshacer.
                    </p>
                    <div className="modal-botones">
                        <button className="btnCancelarModal" onClick={cancelarBorrar} disabled={eliminando}>
                            Cancelar
                        </button>
                        <button className="btnConfirmarModal" onClick={confirmarBorrar} disabled={eliminando}>
                            {eliminando ? 'Eliminando...' : 'Sí, eliminar'}
                        </button>
                    </div>
                </div>
            </div>
        )}

        {modalError && (
            <div className="modal-overlay" onClick={cerrarModalError}>
                <div className="modal-confirmar" onClick={e => e.stopPropagation()}>
                    <h3>No se pudo completar la operación</h3>
                    <p>{modalError}</p>
                    <div className="modal-botones">
                        <button className="btnConfirmarModal" onClick={cerrarModalError}>
                            Aceptar
                        </button>
                    </div>
                </div>
            </div>
        )}

        
    </>
  )
}

