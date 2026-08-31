# Arcana Cósmica - Proyecto Integrador Etapa 3

Ecommerce full stack de productos esotéricos: sahumerios, cristales, tarot, velas y más.

**Autora:** Agustina Flore

---

## ¿Qué es este proyecto?

**Arcana Cósmica** es una tienda online donde el usuario puede:

- Ver productos en la página de inicio
- Dar de alta, editar y eliminar productos (panel Alta)
- Agregar productos al carrito
- Enviar el pedido al backend, que lo guarda en MongoDB Atlas
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

---

## Instalación

Clonar el repositorio y luego instalar dependencias en cada carpeta.

### Backend

```bash
cd Backend
npm install
```

### Frontend

```bash
cd Frontend
npm install
```

---

## Variables de entorno

Crear un archivo `.env` en cada carpeta (no se sube a GitHub).

### Backend (`Backend/.env`)

```
PORT=3000
MODO_PERSISTENCIA=MONGODB
STRCNX=mongodb+srv://usuario:password@cluster.mongodb.net/...
BASE=ecommerce
MP_ACCESS_TOKEN=tu_access_token_de_mercadopago
```

### Frontend (`Frontend/.env`)

```
VITE_APP_MP_PUBLIC_KEY=tu_public_key_de_mercadopago
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

## API — Endpoints del backend

### Productos

| Método   | Ruta                    | Descripción              |
|----------|-------------------------|--------------------------|
| `GET`    | `/api/productos`        | Listar todos los productos |
| `GET`    | `/api/productos/:id`    | Obtener un producto por ID |
| `POST`   | `/api/productos`        | Crear un producto        |
| `PUT`    | `/api/productos/:id`    | Actualizar un producto   |
| `DELETE` | `/api/productos/:id`    | Eliminar un producto     |

### Carrito / Pedidos

| Método   | Ruta                                  | Descripción                        |
|----------|---------------------------------------|------------------------------------|
| `POST`   | `/api/carrito`                        | Guardar pedido en MongoDB          |
| `POST`   | `/api/carrito/mp/create_preference`   | Crear preferencia de Mercado Pago  |

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

- **GitHub:** _(completar con tu link)_
- **Glitch:** _(completar con tu link)_

---

## Notas

- El frontend usa un **Proxy** para mapear `producto.id` → `producto._id` (compatibilidad con MongoDB).
- Mercado Pago funciona en **modo prueba** con credenciales de test y tarjetas de prueba.
- Para pagos en local, después de pagar usar el botón **"Volver a la tienda"** en Mercado Pago.
