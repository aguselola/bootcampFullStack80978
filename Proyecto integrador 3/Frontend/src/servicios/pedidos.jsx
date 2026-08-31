import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const appUrl = import.meta.env.VITE_APP_URL || 'http://localhost:5173'
const url = `${apiUrl}/api/carrito`

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
        success: `${appUrl}/carrito`,
        failure: `${appUrl}/carrito`,
        pending: `${appUrl}/carrito`,
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
