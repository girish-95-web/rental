import { call, put, takeLatest, all } from "redux-saga/effects";
import Api from "../../lib/api";
import {
  HOME_LISTING,
  HOME_LISTING_SUCCESS,
  HOME_LISTING_FAILED,
  GET_SPACE_DETAILS,
  RESERVATION,
  RESERVATION_SUCCESS,
  RESERVATION_FAILED,
  GET_SEARCH_RESULTS,
  GET_FAILED_TO_SEARCH,
  GET_SEARCH,
  UN_AUTHORIZED,
  GET_CARD_PAYMENT,
  GET_CARD_PAYMENT_SUCCESS,
  GET_CARD_PAYMENT_FAILED
} from "../../constants/type";
// get space
function homelistingApi(action) {
  return Api.post("homelisting/", action.data);
}
function* homelisting(action) {
  try {
    const resp = yield call(homelistingApi, action);
    yield put({ type: HOME_LISTING_SUCCESS, data: resp });
  } catch (resp) {
    yield put({ type: HOME_LISTING_FAILED, error: resp });
  }
}
function spacedetailsApi(action) {
  return Api.get("rentalproperties/space/" + action.data);
}
function* spacedetails(action) {
  try {
    const resp = yield call(spacedetailsApi, action);
    yield put({ type: HOME_LISTING_SUCCESS, data: resp });
  } catch (resp) {
    yield put({ type: HOME_LISTING_FAILED, error: resp });
  }
}
function reservationApi(data, id) {
  return Api.post("spacebooking/add", data);
}
function* reservation(action) {
  try {
    const resp = yield call(reservationApi, action.data);
    yield put({ type: RESERVATION_SUCCESS, data: resp });
    if (resp.status === 401) {
      yield put({ type: UN_AUTHORIZED, data: resp });
    }
  } catch (resp) {
    yield put({ type: RESERVATION_FAILED, error: resp });
  }
}
function searchApi(data) {
  return Api.post("rentalproperties/filter", data.data);
}
function* search(action) {
  try {
    const resp = yield call(searchApi, action);
    yield put({ type: GET_SEARCH_RESULTS, data: resp });
  } catch (resp) {
    yield put({ type: GET_FAILED_TO_SEARCH, error: resp });
  }
}
function cardPaymentApi(data) {
  console.log(data,"data===")
  return Api.post("payment", data.data);
}
function* cardPayment(action) {
  try {
    const resp = yield call(cardPaymentApi, action);
    yield put({ type: GET_CARD_PAYMENT_SUCCESS, data: resp });
  } catch (resp) {
    yield put({ type: GET_CARD_PAYMENT_FAILED, error: resp });
  }
}
function* homeSpace() {
  yield all([
    takeLatest(HOME_LISTING, homelisting),
    takeLatest(GET_SPACE_DETAILS, spacedetails),
    takeLatest(RESERVATION, reservation),
    takeLatest(GET_SEARCH, search),
    takeLatest(GET_CARD_PAYMENT, cardPayment)
  ]);
}
export default homeSpace;
