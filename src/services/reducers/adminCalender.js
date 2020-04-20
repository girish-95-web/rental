import { GET_CALENDER_SUCCESS, GET_CALENDER_FAILED } from './../../constants/type'
const initialState = {
    calender: []
}
const adminCalender = (state = initialState, action) => {
    switch (action.type) {
        case GET_CALENDER_SUCCESS:
            return {
                ...state,
                calender: action.data
            }
        case GET_CALENDER_FAILED:
            return {
                ...state,
                calender: action.error
            }
        default:
            return state
    }
}
export default adminCalender;