import { put, takeEvery } from "redux-saga/effects"

import { addRecord, deleteRecord, getRecord, updateRecord } from "./Services/CheckoutServices"
import { ADD_CHECKOUT, ADD_CHECKOUT_RED, DELETE_CHECKOUT, DELETE_CHECKOUT_RED, GET_CHECKOUT, GET_CHECKOUT_RED, UPDATE_CHECKOUT, UPDATE_CHECKOUT_RED } from "../Constants"

function* getSaga() {
    let response = yield getRecord()
    yield put({ type: GET_CHECKOUT_RED, payload: response })
}

function* addSaga(action) {
    let response = yield addRecord(action.payload)
    yield put({ type: ADD_CHECKOUT_RED, payload: response })
}

function* updateSaga(action) {
    yield updateRecord(action.payload)
    yield put({ type: UPDATE_CHECKOUT_RED, payload: action.payload })
}

function* deleteSaga(action) {
    yield deleteRecord(action.payload)
    yield put({ type: DELETE_CHECKOUT_RED, payload: action.payload })
}

export default function* checkoutSagas() {
    yield takeEvery(GET_CHECKOUT, getSaga)
    yield takeEvery(ADD_CHECKOUT, addSaga)
    yield takeEvery(UPDATE_CHECKOUT, updateSaga)
    yield takeEvery(DELETE_CHECKOUT, deleteSaga)
}