import { ADD_TESTIMONIAL_RED, DELETE_TESTIMONIAL_RED, GET_TESTIMONIAL_RED, UPDATE_TESTIMONIAL_RED } from "../Constants"
export default function TestimonialReducer(state = [], action) {
    let newState, index
    switch (action.type) {
        case ADD_TESTIMONIAL_RED:
            newState = [...state]
            newState.push(action.payload)
            return newState;

        case GET_TESTIMONIAL_RED:
            return action.payload.reverse()

        case UPDATE_TESTIMONIAL_RED:
            index = state.findIndex((x) => x.id === action.payload.id)
            state[index].name = action.payload.name
            state[index].star = action.payload.star
            state[index].message = action.payload.message
            state[index].pic = action.payload.pic
            return state

        case DELETE_TESTIMONIAL_RED:
            newState = state.filter((x) => x.id !== action.payload.id)
            return newState
        default:
            return state;
    }
}