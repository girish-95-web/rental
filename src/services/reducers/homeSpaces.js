import {
  HOME_LISTING_SUCCESS,
  HOME_LISTING_FAILED,
  GET_INITIALSTATE,
  GET_SPACE_DETAILS_SUCCESS,
  GET_SPACE_DETAILS_FAILED,
  RESERVATION_SUCCESS,
  RESERVATION_FAILED,
  GET_FAILED_TO_SEARCH,
  GET_SEARCH_RESULTS,
  UN_AUTHORIZED,
  UN_AUTHORIZED_INITIAL,
  GET_CARD_PAYMENT_SUCCESS,
  GET_CARD_PAYMENT_FAILED
} from "../../constants/type";
const initialState = {
  homeListing: [],
  spaceDetails: [],
  reservation: [],
  Search: [],
  cardPayment: [],
  unauthorized: false
};
const homeSpaces = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARD_PAYMENT_SUCCESS:
      return {
        ...state,
        cardPayment: action.data
      };
    case GET_CARD_PAYMENT_FAILED:
      return {
        ...state,
        cardPayment: action.error
      };
    case UN_AUTHORIZED:
      return {
        ...state,
        unauthorized: true
      };
    case UN_AUTHORIZED_INITIAL:
      return {
        ...state,
        unauthorized: false
      };
    case HOME_LISTING_SUCCESS:
      return {
        ...state,
        homeListing: action.data
      };
    case HOME_LISTING_FAILED:
      return {
        ...state,
        homeListing: action.error
      };
    case GET_SEARCH_RESULTS:
      return {
        ...state,
        Search: action.data
      };
    case GET_FAILED_TO_SEARCH:
      return {
        ...state,
        Search: action.error
      };
    // case LIST:
    //     return {
    //         ...state,
    //         List: action.data,
    //     }
    // case NO_LIST_FOUND:
    //     return {
    //         ...state,
    //         List: action.error,
    //     }
    case GET_SPACE_DETAILS_SUCCESS:
      return {
        ...state,
        spaceDetails: action.data
      };
    case GET_SPACE_DETAILS_FAILED:
      return {
        ...state,
        spaceDetails: action.error
      };
    case RESERVATION_SUCCESS:
      return {
        ...state,
        reservation: action.data
      };
    case RESERVATION_FAILED:
      return {
        ...state,
        reservation: action.error
      };

    case GET_INITIALSTATE:
      return {
        ...state,
        // homeListing: [],
        // spaceDetails: [],
        cardPayment:[],
        reservation: [],
        unauthorized: false
      };
    default:
      return state;
  }
};
export default homeSpaces;
