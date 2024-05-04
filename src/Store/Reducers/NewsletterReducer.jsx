import { ADD_NEWSLETTER_RED, DELETE_NEWSLETTER_RED, GET_NEWSLETTER_RED } from "../Constants"
export default function NewsletterReducer(state = [], action) {
    let newState, index
    switch (action.type) {
        case ADD_NEWSLETTER_RED:
            newState = [...state]
            newState.push(action.payload)
            return newState;

        case GET_NEWSLETTER_RED:
            return action.payload.reverse()

        case DELETE_NEWSLETTER_RED:
            newState = state.filter((x) => x.id !== action.payload.id)
            return newState
        default:
            return state;
    }
}