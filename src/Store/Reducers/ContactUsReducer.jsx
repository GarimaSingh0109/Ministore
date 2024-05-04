import { ADD_CONTACT_US_RED, DELETE_CONTACT_US_RED, GET_CONTACT_US_RED, UPDATE_CONTACT_US_RED } from "../Constants"
export default function ContactUsReducer(state = [], action) {
    let newState, index
    switch (action.type) {
        case ADD_CONTACT_US_RED:
            newState = [...state]
            newState.push(action.payload)
            return newState;

        case GET_CONTACT_US_RED:
            return action.payload.reverse()

        case UPDATE_CONTACT_US_RED:
            index = state.findIndex((x) => x.id === action.payload.id)
            state[index].name = action.payload.name
            return state

        case DELETE_CONTACT_US_RED:
            newState = state.filter((x) => x.id !== action.payload.id)
            return newState
        default:
            return state;
    }
}