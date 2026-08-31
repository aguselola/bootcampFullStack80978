import axios from "axios"

const url = 'http://localhost:3000/api/carrito'

const enviar = async pedido => await axios.post(url, pedido, {
    headers: { 'content-type': 'application/json' }
}).then(r => r.data)

const getPreferenceId = async carrito => {
  const prefItems = {
    body: {
      items: carrito.map(p => ({
        title: p.nombre,
        quantity: Number(p.cantidad),
        unit_price: Number(p.precio),
        currency_id: 'UYU',
      })),
      back_urls: {
        success: 'http://localhost:5173/carrito',
        failure: 'http://localhost:5173/carrito',
        pending: 'http://localhost:5173/carrito',
      },
    },
  };

  const { data: preferenceId } = await axios.post(
    `${url}/mp/create_preference`,
    { prefItems }
  );
  return preferenceId;
};

export default { enviar, getPreferenceId };
