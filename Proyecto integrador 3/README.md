# Arcana Cósmica — Proyecto Integrador Etapa 3

E-commerce de productos místicos con:

- Catálogo de productos (CRUD)
- Carrito de compras con persistencia en localStorage
- Pedidos guardados en MongoDB
- Contador de carrito con Redux
- Pagar con Mercado Pago (opcional, modo prueba)

El proyecto tiene **frontend** (React) y **backend** (Node.js + Express) separados, conectados por una API REST.
---
## Tecnologías utilizadas
### Frontend
- React
- Vite
- React Router
- Axios
- Redux Toolkit
- Mercado Pago SDK React (opcional)
### Backend
- Node.js
- Express
- MongoDB Atlas
- Joi (validación de datos)
- Arquitectura MVC
---
## Estructura del proyecto
```
Proyecto integrador 3/
├── Backend/
│   ├── config/           → Configuración y conexión a MongoDB
│   ├── router/           → Rutas de la API
│   ├── controlador/      → Recibe requests y responde
│   ├── servicio/         → Lógica de negocio
│   ├── model/            → Acceso a la base de datos
│   ├── validaciones/     → Validaciones con Joi
│   └── server.js         → Punto de entrada del servidor
│
├── Frontend/
│   └── src/
│       ├── componentes/  → Pantallas (Inicio, Alta, Carrito, etc.)
│       ├── servicios/    → Llamadas HTTP al backend
│       ├── state/        → Redux (contador del carrito)
│       └── hooks/        → Hook de localStorage
│
└── README.md             → Este archivo

```
> Las credenciales de Mercado Pago se obtienen en [mercadopago.com.uy/developers](https://www.mercadopago.com.uy/developers), pestaña **Credenciales de prueba**.
---
## Cómo correr el proyecto en local
Se necesitan **dos terminales** abiertas al mismo tiempo.
### Terminal 1 — Backend
```bash
cd Backend
npm start
```
Si todo está bien, verás:
```
Conectado a MongoDB Atlas - base: ecommerce
Servidor en http://localhost:3000
```
### Terminal 2 — Frontend
```bash
cd Frontend
npm run dev
```
Abrí el navegador en la URL que muestra Vite (normalmente `http://localhost:5173`).
> **Importante:** usar siempre el puerto del **frontend** (5173) en el navegador. El puerto 3000 es solo la API.
---
## Base de datos (MongoDB Atlas)
- **Base:** `ecommerce`
- **Colecciones:**
  - `productos` → productos del catálogo
  - `pedidos` → pedidos enviados desde el carrito
---
## Funcionalidades implementadas
- [x] Backend con arquitectura MVC
- [x] CRUD completo de productos (API + formulario Alta)
- [x] Validación de productos con Joi
- [x] Conexión a MongoDB Atlas
- [x] Listado de productos en Inicio
- [x] Carrito con localStorage
- [x] Envío de pedidos al backend y persistencia en MongoDB
- [x] Contador de productos en el ícono del carrito (Redux)
- [x] Integración con Mercado Pago Checkout Pro (opcional)
---
## Links de entrega
- **GitHub:** https://github.com/aguselola/bootcampFullStack80978
- **Frontend (Render):** _https://bootcampfullstack80978-1.onrender.com_
- **Backend (Render):** _(https://bootcampfullstack80978.onrender.com)_

