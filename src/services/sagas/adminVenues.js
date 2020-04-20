import { call, put, takeLatest, all } from "redux-saga/effects";
import Api from "../../lib/api";
import {
    VENUE_SETUP_FAILED,
    VENUE_SETUP,
    GET_VENUE_SUCCESS,
    GET_VENUE_FAILED,
    GET_VENUE
} from "../../constants/type";
// Venue setup
function venuesetupApi(data) {
    return Api.post(
        'venue/add',
        data.data
    );
}
function* venueSetup(action) {
    try {
        const resp = yield call(venuesetupApi, action);
        yield put({ type: GET_VENUE_SUCCESS, data: resp })
    }
    catch (resp) {
        yield put({ type: VENUE_SETUP_FAILED, error: resp })
    }
}
// Get Venue
function getvenueApi() {
    return Api.get(
        'venue/get',
    );
}
function* getVenue() {
    try {
        const resp = yield call(getvenueApi);
        yield put({ type: GET_VENUE_SUCCESS, data: resp })
    }
    catch (resp) {
        yield put({ type: GET_VENUE_FAILED, error: resp })
    }
}
function* adminVenues() {
    yield all([
        takeLatest(VENUE_SETUP, venueSetup),
        takeLatest(GET_VENUE, getVenue)
    ])
}
export default adminVenues;