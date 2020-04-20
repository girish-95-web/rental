import {
    VENUE_SETUP_SUCCESS,
    VENUE_SETUP_FAILED,
    GET_INITIALSTATE,
    GET_VENUE_FAILED,
    GET_VENUE_SUCCESS
} from "../../constants/type";
const initialState = {
    venue: []
}
const adminVenues = (state = initialState, action) => {
    switch (action.type) {
        case VENUE_SETUP_SUCCESS:
            return {
                ...state,
                venue: action.data,
            }
        case VENUE_SETUP_FAILED:
            return {
                ...state,
                venue: action.error,
            }
        case GET_VENUE_SUCCESS:
            return {
                ...state,
                venuedetails: action.data,
            }
        case GET_VENUE_FAILED:
            return {
                ...state,
                venuedetails: action.error,
            }
        case GET_INITIALSTATE:
            return {
                venue: [],
                venuedetails:[]
            }
        default:
            return state
    }
}
export default adminVenues;