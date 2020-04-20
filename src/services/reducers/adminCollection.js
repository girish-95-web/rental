import {ADD_TO_COLLECTION_SUCCESS, ADD_TO_COLLECTION_FAILED, DELETE_FROM_COLLECTION_SUCCESS, DELETE_FROM_COLLECTION_FAILED, GET_COLLECTION_SUCCESS, GET_COLLECTION_FAILED} from './../../constants/type'
const initialState={
    collection:[]
}
const adminCollection = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_COLLECTION_SUCCESS:
        return {
            ...state,
            collection: action.data
        }
    case ADD_TO_COLLECTION_FAILED:
        return {
            ...state,
            collection: action.error
        }
        case GET_COLLECTION_SUCCESS:
        return {
            ...state,
            collection: action.data
        }
    case GET_COLLECTION_FAILED:
        return {
            ...state,
            collection: action.error
        }
        default:
            return state
    }
    }
    export default adminCollection;