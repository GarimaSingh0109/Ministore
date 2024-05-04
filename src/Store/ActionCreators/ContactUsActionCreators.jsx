import { ADD_CONTACT_US, DELETE_CONTACT_US, GET_CONTACT_US, UPDATE_CONTACT_US } from "../Constants"

export function addContactUs(data) {
    return {
        type: ADD_CONTACT_US,
        payload: data
    }
}

export function getContactUs() {
    return {
        type: GET_CONTACT_US
    }
}

export function updateContactUs(data) {
    return {
        type: UPDATE_CONTACT_US,
        payload: data
    }
}

export function deleteContactUs(data) {
    return {
        type: DELETE_CONTACT_US,
        payload: data
    }
}