import {
  HOME_LISTING,
  GET_INITIALSTATE,
  GET_SPACE_DETAILS,
  RESERVATION,
  GET_SEARCH,
  UN_AUTHORIZED_INITIAL,
  GET_CARD_PAYMENT
} from "../../constants/type";
export const homelisting = data => ({
  type: HOME_LISTING,
  data
});
export const initialState = () => ({
  type: GET_INITIALSTATE
});
export const cardPaymentForm = data => ({
  type: GET_CARD_PAYMENT,
  data
});
export const spacedetails = data => ({
  type: GET_SPACE_DETAILS,
  data
});
export const reservation = data => ({
  type: RESERVATION,
  data
});
export const search = data => ({
  type: GET_SEARCH,
  data
});
export const unAuthorizedinitial = () => ({
  type: UN_AUTHORIZED_INITIAL
});
