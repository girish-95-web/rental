import {
    GET_RESERVE,
    CANCEL_RESERVATION, 
    REVIEW,
    GET_INITIALSTATE
} from "../../constants/type";
export const getReserve = (data, page) => ({
    type: GET_RESERVE,
    page,
    data
})
export const cancelreservation = (data) => ({
    type: CANCEL_RESERVATION,
    data
})
export const review = (data) => ({
    type: REVIEW,
    data
})
export const initialState = () => ({
    type: GET_INITIALSTATE
})