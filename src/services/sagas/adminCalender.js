import { call, put, takeLatest, all } from "redux-saga/effects";
import Api from "../../lib/api";
import {GET_CALENDER,GET_CALENDER_SUCCESS,GET_CALENDER_FAILED} from './../../constants/type'

//get api
function calenderApi(data){
    return Api.get(
        'spacebooking/listing',
        data
    )
}
function* calender(action){
    try {
        const resp=yield call(calenderApi,action.data)
        yield put({type:GET_CALENDER_SUCCESS,data:resp})
    } catch (resp) {
        yield put({type:GET_CALENDER_FAILED,error:resp})
    }
}
function* adminCalender() {
    yield all([
        takeLatest(GET_CALENDER,calender)
    ])
}
export default adminCalender;