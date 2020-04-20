import { call, put, takeLatest, all } from "redux-saga/effects";
import Api from "../../lib/api";
import {ADD_TO_COLLECTION_SUCCESS, ADD_TO_COLLECTION_FAILED, ADD_TO_COLLECTION, GET_COLLECTION, GET_COLLECTION_SUCCESS, GET_COLLECTION_FAILED} from './../../constants/type'

//add to collection api
function addcollectionApi(data) {
    return Api.get(
        'favourite/'+
        data
    );
}
function* addcollection(action) {
    try {
        const resp = yield call(addcollectionApi, action.data);
        yield put({ type: GET_COLLECTION_SUCCESS, data: resp })
    }
    catch (resp) {
        yield put({ type: ADD_TO_COLLECTION_FAILED, error: resp })
    }
}

//get collection api
function getcollectionApi(data) {
    return Api.get(
        `favourite?pageNumber=${data}`
    );
}
function* getcollection(action) {
    try {
        const resp = yield call(getcollectionApi, action.data);
        yield put({ type: GET_COLLECTION_SUCCESS, data: resp })
    }
    catch (resp) {
        yield put({ type: GET_COLLECTION_FAILED, error: resp })
    }
}

function* adminCollection() {
    yield all([
        takeLatest(ADD_TO_COLLECTION,addcollection),
        takeLatest(GET_COLLECTION,getcollection)
    ])
}
export default adminCollection;