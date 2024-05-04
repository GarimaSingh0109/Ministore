import { put, takeEvery } from "redux-saga/effects"

import { addRecord, deleteRecord, getRecord, updateRecord } from "./Services/MaincategoryServices"
import { ADD_MAINCATEGORY, ADD_MAINCATEGORY_RED, DELETE_MAINCATEGORY, DELETE_MAINCATEGORY_RED, GET_MAINCATEGORY, GET_MAINCATEGORY_RED, UPDATE_MAINCATEGORY, UPDATE_MAINCATEGORY_RED } from "../Constants"

function* getSaga() {
    let response = yield getRecord()
    yield put({ type: GET_MAINCATEGORY_RED, payload: response })
}

function* addSaga(action) {
    let response = yield addRecord(action.payload)
    yield put({ type: ADD_MAINCATEGORY_RED, payload: response })
}

function* updateSaga(action) {
    yield updateRecord(action.payload)
    yield put({ type: UPDATE_MAINCATEGORY_RED, payload: action.payload })
}

function* deleteSaga(action) {
    yield deleteRecord(action.payload)
    yield put({ type: DELETE_MAINCATEGORY_RED, payload: action.payload })
}

export default function* maincategorySagas() {
    yield takeEvery(GET_MAINCATEGORY, getSaga)
    yield takeEvery(ADD_MAINCATEGORY, addSaga)
    yield takeEvery(UPDATE_MAINCATEGORY, updateSaga)
    yield takeEvery(DELETE_MAINCATEGORY, deleteSaga)
}