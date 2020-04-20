import { call, put, takeLatest, all } from "redux-saga/effects";
import Api from "../../lib/api";
import {
    CHAT_LIST,
    CHAT_LIST_FAILURE,
    CHAT_LIST_SUCCESS,
    CHAT_WINDOW,
    CHAT_WINDOW_SUCCESS,
    CHAT_WINDOW_FAILURE,
    SEND_MESSAGE,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAILURE,
    CHECK_HISTORY_SUCCESS,
    CHECK_HISTORY_FAILURE,
    CHECK_HISTORY,
    GET_PROPERTY,
    GET_PROPERTY_SUCCESS,
    GET_PROPERTY_FAILURE
} from "../../constants/type";

  function getMessagelist(data) {
    var params={toid:data.otheruserid,propertyInfoId:data.propertyInfoId}
    console.log('testing the messagelist',data)
    return Api.post(
      'chat/getMessagelist',params
    );
  //  var params={toid:data.otheruserid,propertyInfoId:data.propertyInfoId}
  //   if(data.isAdmin){
  //     return Api.post(
  //       'chat/getMessagelist',params
  //     );
  //   }else{
  //     return Api.post(
  //       'chat/guestMessagelist',params
  //     );
  //   }
    
  }
  function getMessageSend(data) {
    return Api.post(
        'chat/getMessageSend',data
      );
  }
  function getChatStatus(data) {
    return Api.post(
      'chat/getchatstatus',data
    );
  }
  // function getchatlistapi(data) {
  //   if(data.isAdmin){
  //     return Api.get(
  //       'chat/hostchatlist/',data.propertyInfoId
  //     );
  //     }else{
  //     return Api.get(
  //       'chat/guestChatList'
  //   );
  //   } 
  //   }
    function getchatlistapi(data) {
      console.log('before failrue',data);
      if(data.isAdmin){
        return Api.get(
          'chat/hostchatlist/'+data.propertyInfoId
        );
        }else{
        return Api.get(
          'chat/getguestchatlist/'+data.propertyInfoId
      );
      } 
      } 
function* chatlist(action) {
    try {
      console.log('here is the role',action)
        const resp = yield call(getchatlistapi,action.data);
        yield put({ type: CHAT_LIST_SUCCESS, data: resp })
    }
    catch (resp) {
        yield put({ type: CHAT_LIST_FAILURE, error: resp })
    }
  }

function* chatwindow(action) {
  try {
      //  console.log('checking for the messages',action.data)
      //  const resp = yield call(getMessagelist,{toid:action.data,propertyInfoId:1});
      const resp = yield call(getMessagelist,action.data);
      yield put({ type: CHAT_WINDOW_SUCCESS, data: resp })
  }
  catch (resp) {
    console.log('are we in window')
      yield put({ type: CHAT_WINDOW_FAILURE, error: resp })
  }
} 
function* sendmessage(action) {
  try {
        const resp = yield call(getMessageSend,action.data);
      yield put({ type: SEND_MESSAGE_SUCCESS, data: resp })
  }
  catch (resp) {
    // console.log('are we in window')
      yield put({ type: SEND_MESSAGE_FAILURE, error: resp })
  }
} 
function* checkHistory(action){
  try {
    
    const resp = yield call(getChatStatus,action.data);
    yield put({ type: CHECK_HISTORY_SUCCESS, data: resp })
}
catch (resp) {
// console.log('are we in window')
  yield put({ type: CHECK_HISTORY_FAILURE, error: resp })
}
}

function getPropertyList(data) {
  console.log('check for the initializer-->',data);
  if(data.isAdmin){
    return Api.get(
      'chat/hostlist'
    );
  }else{
    return Api.get(
      'chat/guestInfoIdlist'
    );
  }
  
}

function* getProperty(action){
  try{
    const resp = yield call(getPropertyList,action.data)
    //console.log('testing for the property list',resp)
    yield put({ type: GET_PROPERTY_SUCCESS, data: resp })
  }catch(resp){ 
    yield put({ type: GET_PROPERTY_FAILURE, error: resp })
  }
}
function* chat() {
    yield all([
      takeLatest(CHAT_LIST, chatlist),
      takeLatest(CHAT_WINDOW, chatwindow),
      takeLatest(SEND_MESSAGE, sendmessage),
      takeLatest(CHECK_HISTORY, checkHistory),
      takeLatest(GET_PROPERTY, getProperty)
    ])
  }
  export default chat;