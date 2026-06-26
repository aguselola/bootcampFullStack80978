function representarCardsProductos() {
    let cards = ''
    
    if(productos.length) {
        for(let i=0; i<productos.length; i++) {
            const producto = productos[i]
            cards += `
                <section>
                    <h3>${producto.nombre}</h3>
                    <div class="card">
                        <img class="foto-producto" src="${producto.foto}" alt="${producto.nombre}">
                        <div class="card-info">
                            <p class="p-precio"><img class="precio" src="./css/img/tagprecio.PNG" alt="foto precio"><b>Precio:</b> $${producto.precio}</p>
                            <p class="p-stock"><img class="stock" src="./css/img/stock.PNG" alt="foto stock"><b>Stock:</b> ${producto.stock}</p>
                            <p class="p-marca"><img class="marca" src="./css/img/marca.PNG" alt="foto marca"><b>Marca:</b> ${producto.marca}</p>
                            <p class="p-categoria"><img class="categoria" src="./css/img/categoria.PNG" alt="foto categoria"><b>Categoría:</b> ${producto.categoria}</p>
                            <p class="p-detalles"><img class="detalles" src="./css/img/detalles.PNG" alt="foto detalles"><b>Detalles:</b> ${producto.detalles}</p>
                            <br>
                            <p class="p-envio"><img class="envio" src="./css/img/envio.PNG" alt="foto envio"><b>Envío:</b> ${producto.envio?'Si':'No'}</p>
                        </div>
                    </div>
                    <button>✦Agregar al carrito✦</button>
                </section>
            `
        }
    }
    else cards += '<h2>No se encontraron productos para mostrar</h2>'

    document.querySelector('.section-cards-body').innerHTML = cards
}


function start() {
    console.warn( document.querySelector('title').innerText )

    representarCardsProductos()
}

