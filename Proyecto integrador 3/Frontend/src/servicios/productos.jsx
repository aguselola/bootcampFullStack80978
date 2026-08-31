import axios from "axios";


const url = 'http://localhost:3000/api/productos'


const getAll = async () => await axios.get(url).then(r => {
  const productos = r.data
  return productos.map(producto => proxyProducto(producto))
})

const guardar = async prod => await axios.post(url, prod, {
  headers: { 'content-type': 'application/json' }
}).then(r => proxyProducto(r.data))


const actualizar = async (id, prod) => await axios.put(`${url}/${id}`, eliminarPropiedad(prod, '_id'), {
  headers: { 'content-type': 'application/json' }
}).then(r => proxyProducto(r.data))

export const proxyProducto = producto => {
  const handler = {
    get: function (target, prop) {
      if (prop == 'id') prop = '_id'
      return target[prop]
    }
  }
  return new Proxy(producto, handler)
}

const eliminarPropiedad = (obj, prop) => {
  const objClon = { ...obj }
  delete objClon[prop]
  return objClon
}

const eliminar = async id => await axios.delete(`${url}/${id}`).then(r => proxyProducto(r.data))

export default {
    getAll,
    guardar,
    actualizar,
    eliminar
}