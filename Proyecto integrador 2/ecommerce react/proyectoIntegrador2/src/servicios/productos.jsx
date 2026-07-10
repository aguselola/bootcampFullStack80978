import axios from "axios";


const url = 'https://6a4051dd9b6d371e838193e3.mockapi.io/servicioProductos/servicioProductos'


const getAll = async () => await axios.get(url).then(r => r.data)


const guardar = async prod => await axios.post(url, prod, {
    headers: { 'content-type': 'application/json' }
}).then(r => r.data)


const actualizar = async (id,prod) => await axios.put(`${url}/${id}`, prod, {
    headers: { 'content-type': 'application/json' }
}).then(r => r.data)



const eliminar = async id => await axios.delete(`${url}/${id}`).then(r => r.data)


export default {
    getAll,
    guardar,
    actualizar,
    eliminar
}