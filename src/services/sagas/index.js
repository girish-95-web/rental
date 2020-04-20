import { all } from 'redux-saga/effects'
import auth from './auth';
import adminSpace from './adminSpace';
import adminVenues from './adminVenues';
import homeSpaces from './homeSpaces';
import chat from './chat';
import adminReserve from './adminReserv'
import adminCollection from './adminCollection'
import adminCalender from './adminCalender'
export default function* rootSaga() {
    yield all([
      auth(),
      adminSpace(),
      adminVenues(),
      homeSpaces(),
      chat(),
      adminReserve(),
      adminCollection(),
      adminCalender()
    ])
}