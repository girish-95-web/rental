import { combineReducers } from 'redux';
import auth from './auth';
import adminSpace from './adminSpace';
import adminVenues from './adminVenues';
import homeSpaces from './homeSpaces';
import chat from './chat';
import adminReserve from './adminReserve'
import adminCollection from './adminCollection'
import adminCalender from './adminCalender'
export default combineReducers({
    auth,
    adminSpace,
    adminVenues,
    homeSpaces,
    chat,
    adminReserve,
    adminCollection,
    adminCalender
});