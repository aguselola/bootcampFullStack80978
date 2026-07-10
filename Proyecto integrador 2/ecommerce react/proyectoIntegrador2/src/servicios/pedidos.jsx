import axios from "axios"

// Servicio de datos remotos externos: https://mockapi.io/
const url = 'https://6a4051dd9b6d371e838193e3.mockapi.io/servicioProductos/pedidosEcommerce'

const enviar = async pedido => await axios.post(url, pedido, {
    headers: { 'content-type': 'application/json' }
}).then(r => r.data)


export default {
    enviar
}