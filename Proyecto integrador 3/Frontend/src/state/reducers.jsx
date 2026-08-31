import { SET_CANTIDAD } from './types'

export const carritoReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_CANTIDAD:
            return { ...state, cantidad: action.payload }
        default:
            return state
    }
}