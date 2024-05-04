import { put, takeEvery } from "redux-saga/effects"

import { addRecord, deleteRecord, getRecord } from "./Services/NewsletterServices"
import { ADD_NEWSLETTER, ADD_NEWSLETTER_RED, DELETE_NEWSLETTER, DELETE_NEWSLETTER_RED, GET_NEWSLETTER, GET_NEWSLETTER_RED } from "../Constants"

function* getSaga() {
    let response = yield getRecord()
    yield put({ type: GET_NEWSLETTER_RED, payload: response })
}

function* addSaga(action) {
    let response = yield addRecord(action.payload)
    yield put({ type: ADD_NEWSLETTER_RED, payload: response })
}

function* deleteSaga(action) {
    yield deleteRecord(action.payload)
    yield put({ type: DELETE_NEWSLETTER_RED, payload: action.payload })
}

export default function* newsletterSagas() {
    yield takeEvery(GET_NEWSLETTER, getSaga)
    yield takeEvery(ADD_NEWSLETTER, addSaga)
    yield takeEvery(DELETE_NEWSLETTER, deleteSaga)
}