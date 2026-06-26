function representarTablaProductos() {
    let filasTabla = ''



    if(productos.length) {
        filasTabla += `
            <thead>
                <tr>
                    <th>nombre</th>
                    <th>precio</th>
                    <th>stock</th>
                    <th>marca</th>
                    <th>categoría</th>
                    <th>detalles</th>
                    <th>foto</th>
                    <th>envío</th>
                </tr>
            </thead>
        `

        filasTabla += '<tbody>'

        for(let producto of productos) {
            filasTabla += `
                <tr>
                    <td>${producto.nombre}</td>
                    <td class="centrar">$${producto.precio}</td>
                    <td class="centrar">${producto.stock}</td>
                    <td>${producto.marca}</td>
                    <td>${producto.categoria}</td>
                    <td>${producto.detalles}</td>
                    <td><img width="75" src="${producto.foto}" alt="${producto.nombre}"></td>
                    <td class="centrar">${producto.envio?'Si':'No'}</td>
                </tr>
            `
        }

        filasTabla += '</tbody>'
    }
    else filasTabla += '<h2>No se encontraron productos para mostrar</h2>'

    document.querySelector('table').innerHTML = filasTabla
}



function agregar(e) {
    const form = e.target
    if (!form.checkValidity()) {
        form.reportValidity()
        return
    }

    e.preventDefault()


    const refNombre = form.querySelector('#nombre')
    const refPrecio = form.querySelector('#precio')
    const refStock = form.querySelector('#stock')
    const refMarca = form.querySelector('#marca')
    const refCategoria = form.querySelector('#categoria')
    const refDetalles = form.querySelector('#detalles')
    const refFoto = form.querySelector('#foto')
    const refEnvio = form.querySelector('#envio')
    const nombre = refNombre.value
    const precio = refPrecio.value
    const stock = refStock.value
    const marca = refMarca.value
    const categoria = refCategoria.value
    const detalles = refDetalles.value
    const foto = refFoto.value
    const envio = refEnvio.checked


    const producto = {
        nombre: nombre,
        precio: +precio,
        stock: parseInt(stock, 10),
        marca: marca,
        categoria: categoria,
        detalles: detalles,
        foto: foto,
        envio: envio
    }


    productos.push(producto)
    representarTablaProductos()


    refNombre.value = ''
    refPrecio.value = ''
    refStock.value = ''
    refMarca.value = ''
    refCategoria.value = ''
    refDetalles.value = ''
    refFoto.value = ''
    refEnvio.checked = false
}



function start() {
    const formAlta = document.querySelector('.alta-form')
    formAlta.addEventListener('submit', agregar)
    representarTablaProductos()
}