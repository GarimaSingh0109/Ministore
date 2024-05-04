import { ADD_CART_RED, DELETE_CART_RED, GET_CART_RED, UPDATE_CART_RED } from "../Constants"
export default function CartReducer(state = [], action) {
    let newState, index
    switch (action.type) {
        case ADD_CART_RED:
            newState = [...state]
            newState.push(action.payload)
            return newState;

        case GET_CART_RED:
            return action.payload.reverse()

        case UPDATE_CART_RED:
            index = state.findIndex((x) => x.id === action.payload.id)
            state[index].name = action.payload.name
            return state

        case DELETE_CART_RED:
            newState = state.filter((x) => x.id !== action.payload.id)
            return newState
        default:
            return state;
    }
}