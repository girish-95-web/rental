import {
    GET_RESERVE_SUCCESS,
    GET_RESERVE_FAILED,
    GET_INITIALSTATE,
    CANCEL_RESERVATION_SUCCESS, 
    CANCEL_RESERVATION_FAILED,
    DELETE_INITIALSTATE,
    REVIEW_SUCCESS, 
    REVIEW_FAILED
} from "../../constants/type";
const initialState = {
    reserve: [],
    reservationCancel:[],
    deletedMessage:false,
    review: []
}
const adminReserve = (state = initialState, action) => {
    switch (action.type) {
        case GET_RESERVE_SUCCESS:
            return {
                ...state,
                reserve: action.data,
            }
        case GET_RESERVE_FAILED:
            return {
                ...state,
                reserve: action.error,
            }
        case CANCEL_RESERVATION_SUCCESS:
            return {
                ...state,
                reserve:{guestlisting:state.reserve.guestlisting.filter(items=>{ return items.id !== action.data.bookingcancel.id}), success:true},
                reservationCancel:action.data
            }
        case CANCEL_RESERVATION_FAILED:
            return {
                ...state,
                reservationCancel: action.error
            }
            case REVIEW_SUCCESS:
            return {
                ...state,
                review: action.data
            }
        case REVIEW_FAILED:
            return {
                ...state,
                review: action.error
            }
        case DELETE_INITIALSTATE:
            return {
                ...state,
                reservationCancel:[]
            }
        case GET_INITIALSTATE:
            return {
                reserve: []
            }
        default:
            return state
    }
}
export default adminReserve;