import { call, put, takeLatest, all } from "redux-saga/effects";
import Api from "../../lib/api";
import {
    ADD_SPACES,
    ADD_SPACES_SUCCESS,
    ADD_SPACES_FAILED,
    GET_SPACE_TYPE,
    GET_SPACE_TYPE_SUCCESS,
    GET_SPACE_TYPE_FAILED,
    GET_LISTING_TYPE,
    GET_LISTING_TYPE_SUCCESS,
    GET_LISTING_TYPE_FAILED,
    GET_SPACE,
    GET_SPACE_SUCCESS,
    GET_SPACE_FAILED,
    GET_SPACE_DELETE,
    GET_SPACE_DELETE_SUCCESS,
    GET_SPACE_DELETE_FAILED,
    EDIT_SPACES_FAILED,
    EDIT_SPACES,
    GET_SPACE_DETAILS,
    GET_SPACE_DETAILS_FAILED,
    GET_SPACE_DETAILS_SUCCESS,
    GET_AMENITIES_FAILED,
    GET_AMENITIES_SUCCESS,
    GET_AMENITIES,
    ADD_SPACES_MEDIA,
    ADD_SPACES_MEDIA_SUCCESS,
    ADD_SPACES_MEDIA_FAILED,
    ADD_SPACES_MEDIA_DELETE,
    ADD_SPACES_MEDIA_DELETE_SUCCESS,
    ADD_SPACES_MEDIA_DELETE_FAILED,
    GET_DASH_LISCENCE,
    GET_DASH_LISCENCE_SUCCESS,
    GET_DASH_LISCENCE_FAILED
} from "../../constants/type";
// get space
function getspaceApi(data) {
    return Api.get(
        `rentalproperties?page=${data.data}`
    );
}
function* getspace(data) {
    try {
        const resp = yield call(getspaceApi,data);
        yield put({ type: GET_SPACE_SUCCESS, data: resp })
    }
    catch (resp) {
        yield put({ type: GET_SPACE_FAILED, error: resp })
    }
}
// delete space
function spaceDeleteApi(action) {
    return Api.delete(
        'rentalproperties/'+action.data
    );
}
function* spaceDelete(action) {
    try {
        const resp = yield call(spaceDeleteApi,action);
        yield put({ type: GET_SPACE_DELETE_SUCCESS, data: resp, id:action.data })
    }
    catch (resp) {
        yield put({ type: GET_SPACE_DELETE_FAILED, error: resp })
    }
}
// add space
function addSpaceApi(data) {
    return Api.post(
        'rentalproperties/',
        data
    );
}
function* addSpace(action) {
    try {
        const resp = yield call(addSpaceApi, action.data);
        yield put({ type: ADD_SPACES_SUCCESS, data: resp })
        yield put({ type: ADD_SPACES_MEDIA, data: action.datafile, id: resp.addspace.id})
    }
    catch (resp) {
        yield put({ type: ADD_SPACES_FAILED, error: resp })
    }
}
// add space media
function addSpacemediaApi(data){
    return Api.put(
        'rentalproperties/media/'+data.id,
        data.data
    )
 }
function* addspacemedia(action) {
    try {
        const resp = yield call(addSpacemediaApi, action);
        yield put({ type: ADD_SPACES_MEDIA_SUCCESS, data: resp })
    }
    catch (resp) {
        yield put({ type: ADD_SPACES_MEDIA_FAILED, error: resp })
    }
}
// GET space type
function getSpaceTypeApi(data) {
    return Api.get(
        'rentalproperties/space/'+data.data,
        data
    );
}
function* getSpaceType(action) {
    try {
        const resp = yield call(getSpaceTypeApi, action);
        yield put({ type: GET_SPACE_TYPE_SUCCESS, data: resp })
    }
    catch (resp) {
        yield put({ type: GET_SPACE_TYPE_FAILED, error: resp })
    }
}
// GET listing type
function getListingTypeApi() {
    return Api.get(
        'rentalproperties/getAll/'
    );
}
function* getListingType() {
    try {
        const resp = yield call(getListingTypeApi);
        yield put({ type: GET_LISTING_TYPE_SUCCESS, data: resp })
    }
    catch (resp) {
        yield put({ type: GET_LISTING_TYPE_FAILED, error: resp })
    }
}
// EDIT space
function editSpaceApi(data) {
    return Api.put(
        'rentalproperties/'+data.id,
        data.data
    );
}
function* editSpace(action) {
    try {
        const resp = yield call(editSpaceApi, action);
        yield put({ type: GET_SPACE_DETAILS_SUCCESS, data: resp })
        yield put({ type: ADD_SPACES_MEDIA, data: action.datafile, id: resp.propertyDetail.id})
    }
    catch (resp) {
        yield put({ type: EDIT_SPACES_FAILED, error: resp })
    }
}
// get space details
function getspacedetailsApi(data) {
    return Api.get(
        'rentalproperties/'+data.data,
    );
}
function* getspacedetails(action) {
    try {
        const resp = yield call(getspacedetailsApi, action);
        yield put({ type: GET_SPACE_DETAILS_SUCCESS, data: resp })
    }
    catch (resp) {
        yield put({ type: GET_SPACE_DETAILS_FAILED, error: resp })
    }
}
// GET amenities
function getamenitiesApi() {
    return Api.get(
        'rentalproperties/getamenities'
    );
}
function* getamenities() {
    try {
        const resp = yield call(getamenitiesApi);
        yield put({ type: GET_AMENITIES_SUCCESS, data: resp })
    }
    catch (resp) {
        yield put({ type: GET_AMENITIES_FAILED, error: resp })
    }
}
// delete media
function deleteSpacemediaApi(action) {
    return Api.delete(
        'rentalproperties/media/'+action.id
    );
}
function* deleteSpacemedia(action) {
    try {
        const resp = yield call(deleteSpacemediaApi, action);
        yield put({ type: ADD_SPACES_MEDIA_DELETE_SUCCESS, data: resp })
    }
    catch (resp) {
        yield put({ type: ADD_SPACES_MEDIA_DELETE_FAILED, error: resp })
    }
}
// get dash liscence
function dashliscenceApi() {
    return Api.get(
        'rentalproperties/dashlicense/dash'
    );
}
function* dashliscence() {
    try {
        const resp = yield call(dashliscenceApi);
        yield put({ type: GET_DASH_LISCENCE_SUCCESS, data: resp })
    }
    catch (resp) {
        yield put({ type: GET_DASH_LISCENCE_FAILED, error: resp })
    }
}

function* adminSpace() {
    yield all([
        takeLatest(ADD_SPACES, addSpace),
        takeLatest(GET_SPACE_TYPE, getSpaceType),
        takeLatest(GET_LISTING_TYPE, getListingType),
        takeLatest(GET_SPACE, getspace),
        takeLatest(GET_SPACE_DELETE, spaceDelete),
        takeLatest(EDIT_SPACES, editSpace),
        takeLatest(GET_SPACE_DETAILS, getspacedetails),
        takeLatest(GET_AMENITIES, getamenities),
        takeLatest(ADD_SPACES_MEDIA,addspacemedia),
        takeLatest(ADD_SPACES_MEDIA_DELETE,deleteSpacemedia),
        takeLatest(GET_DASH_LISCENCE,dashliscence)
    ])
}
export default adminSpace;