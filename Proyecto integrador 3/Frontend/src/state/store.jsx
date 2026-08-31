import { configureStore } from '@reduxjs/toolkit'
import { carritoReducer } from './reducers'

export const store = configureStore({
    reducer: {
        carrito: carritoReducer
    },
    preloadedState: {
        carrito: {
            cantidad: 0
        }
    }
})