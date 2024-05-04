import { ADD_CHECKOUT_RED, DELETE_CHECKOUT_RED, GET_CHECKOUT_RED, UPDATE_CHECKOUT_RED } from "../Constants"
export default function CheckoutReducer(state = [], action) {
    let newState, index
    switch (action.type) {
        case ADD_CHECKOUT_RED:
            newState = [...state]
            newState.push(action.payload)
            return newState;

        case GET_CHECKOUT_RED:
            return action.payload.reverse()

        case UPDATE_CHECKOUT_RED:
            index = state.findIndex((x) => x.id === action.payload.id)
            state[index].name = action.payload.name
            return state

        case DELETE_CHECKOUT_RED:
            newState = state.filter((x) => x.id !== action.payload.id)
            return newState
        default:
            return state;
    }
}