import { SET_CANTIDAD } from './types'

export const actionSetCantidad = cantidad => {
    return {
        type: SET_CANTIDAD,
        payload: cantidad
    }
}