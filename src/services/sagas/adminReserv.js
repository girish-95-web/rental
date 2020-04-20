import { call, put, takeLatest, all } from "redux-saga/effects";
import Api from "../../lib/api";
import {
    GET_RESERVE,
    GET_RESERVE_SUCCESS,
    GET_RESERVE_FAILED,
    UN_AUTHORIZED, 
    CANCEL_RESERVATION, 
    CANCEL_RESERVATION_SUCCESS, 
    CANCEL_RESERVATION_FAILED,
    REVIEW_FAILED,
    REVIEW, 
    REVIEW_SUCCESS,
} from "../../constants/type";
// Venue setup
function getReserveApi(data) {
    console.log('data',data)
    return Api.get(
        `spacebooking/guest/`+
        data.data+`?page=${data.page}`
    );
}
function* getReserve(action) {
    try {
        const resp = yield call(getReserveApi, action);
        yield put({ type: GET_RESERVE_SUCCESS, data: resp })
    }
    catch (resp) {
        yield put({ type: GET_RESERVE_FAILED, error: resp })
    }
}
//cancel reservation
function cancelreservationApi(data) {
    return Api.get(
        'spacebooking/bookingcancel/'+ data,
        data
    );
}
function* cancelreservation(action) {
    try {
        const resp = yield call(cancelreservationApi, action.data);
        yield put({ type: CANCEL_RESERVATION_SUCCESS, data: resp })
        if(resp.status === 401){
            yield put({ type: UN_AUTHORIZED, data: resp })
        }
    }
    catch (resp) {
        yield put({ type: CANCEL_RESERVATION_FAILED, error: resp })
    }
}

//review
function reviewApi(data) {
    return Api.post(
        'review/',
        data
    );
}
function* review(action) {
    try {
        const resp = yield call(reviewApi, action.data);
        yield put({ type: REVIEW_SUCCESS, data: resp })
    }
    catch (resp) {
        yield put({ type: REVIEW_FAILED, error: resp })
    }
}
function* adminReserve() {
    yield all([
        takeLatest(GET_RESERVE, getReserve),
        takeLatest(CANCEL_RESERVATION,cancelreservation),
        takeLatest(REVIEW,review)
    ])
}
export default adminReserve;