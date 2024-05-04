import { ADD_NEWSLETTER, DELETE_NEWSLETTER, GET_NEWSLETTER } from "../Constants"

export function addNewsletter(data) {
    return {
        type: ADD_NEWSLETTER,
        payload: data
    }
}

export function getNewsletter() {
    return {
        type: GET_NEWSLETTER
    }
}

export function deleteNewsletter(data) {
    return {
        type: DELETE_NEWSLETTER,
        payload: data
    }
}