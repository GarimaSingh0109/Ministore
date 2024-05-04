import { ADD_PRODUCT_RED, DELETE_PRODUCT_RED, GET_PRODUCT_RED, UPDATE_PRODUCT_RED } from "../Constants"
export default function ProductReducer(state = [], action) {
    let newState, index
    switch (action.type) {
        case ADD_PRODUCT_RED:
            newState = [...state]
            newState.push(action.payload)
            return newState;

        case GET_PRODUCT_RED:
            return action.payload.reverse()

        case UPDATE_PRODUCT_RED:
            index = state.findIndex((x) => x.id === action.payload.id)
            state[index].name = action.payload.name
            state[index].maincategory = action.payload.maincategory
            state[index].subcategory = action.payload.subcategory
            state[index].brand = action.payload.brand
            state[index].color = action.payload.color
            state[index].size = action.payload.size
            state[index].baseprice = action.payload.baseprice
            state[index].discount = action.payload.discount
            state[index].finalprice = action.payload.finalprice
            state[index].stock = action.payload.stock
            state[index].pic = action.payload.pic
            return state

        case DELETE_PRODUCT_RED:
            newState = state.filter((x) => x.id !== action.payload.id)
            return newState
        default:
            return state;
    }
}