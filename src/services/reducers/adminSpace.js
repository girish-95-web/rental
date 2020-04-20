import {
    ADD_SPACES_SUCCESS,
    ADD_SPACES_FAILED,
    GET_SPACE_TYPE_SUCCESS,
    GET_SPACE_TYPE_FAILED,
    GET_LISTING_TYPE_SUCCESS,
    GET_LISTING_TYPE_FAILED,
    GET_SPACE_SUCCESS,
    GET_SPACE_FAILED,
    GET_SPACE_DELETE_SUCCESS,
    GET_SPACE_DELETE_FAILED,
    EDIT_SPACES_SUCCESS,
    EDIT_SPACES_FAILED,
    GET_SPACE_DETAILS_SUCCESS,
    GET_SPACE_DETAILS_FAILED,
    GET_INITIALSTATE,
    GET_AMENITIES_SUCCESS,
    GET_AMENITIES_FAILED,
    ADD_SPACES_MEDIA_SUCCESS,
    ADD_SPACES_MEDIA_FAILED,
    GET_INITIALSTATE_SPACE_TYPE,
    ADD_SPACES_MEDIA_DELETE_SUCCESS,
    ADD_SPACES_MEDIA_DELETE_FAILED,
    GET_DASH_LISCENCE_SUCCESS,
    GET_DASH_LISCENCE_FAILED
} from "../../constants/type";
const initialState = {
    space: [],
    spaceListing: [],
    spaceType: [],
    spacemedia: [],
    deleteMedia: [],
    dashliscence:[]
}
const adminSpace = (state = initialState, action) => {
    switch (action.type) {
        case GET_INITIALSTATE_SPACE_TYPE:
            return {
                spaceType: []
            }
        case ADD_SPACES_MEDIA_DELETE_SUCCESS:
            return {
                ...state,
                deleteMedia: action.data
            }
        case ADD_SPACES_MEDIA_DELETE_FAILED:
            return {
                ...state,
                deleteMedia: action.error
            }
        case ADD_SPACES_SUCCESS:
            return {
                ...state,
                space: action.data,
            }
        case ADD_SPACES_FAILED:
            return {
                ...state,
                space: action.error,
            }
        case GET_SPACE_TYPE_SUCCESS:
            return {
                ...state,
                spaceType: action.data,
            }
        case GET_SPACE_TYPE_FAILED:
            return {
                ...state,
                spaceType: action.error,
            }
        case GET_LISTING_TYPE_SUCCESS:
            return {
                ...state,
                spaceListing: action.data,
            }
        case GET_LISTING_TYPE_FAILED:
            return {
                ...state,
                spaceListing: action.error,
            }
        case GET_SPACE_SUCCESS:
            return {
                ...state,
                space: action.data,
            }
        case GET_SPACE_FAILED:
            return {
                ...state,
                space: action.error,
            }
        case GET_SPACE_DELETE_SUCCESS:
            return {
                ...state,
                space: { propertyListing: state.space.propertyListing.filter(items => { return items.id !== action.id }), success: true, isvenueavailable: true }
            }
        case GET_SPACE_DELETE_FAILED:
            return {
                ...state,
                space: action.error,
            }
        case EDIT_SPACES_SUCCESS:
            return {
                ...state,
                space: action.data,
            }
        case EDIT_SPACES_FAILED:
            return {
                ...state,
                space: action.error,
            }
        case GET_SPACE_DETAILS_SUCCESS:
            return {
                ...state,
                space: action.data,
            }
        case GET_SPACE_DETAILS_FAILED:
            return {
                ...state,
                space: action.error,
            }
        case GET_AMENITIES_SUCCESS:
            return {
                ...state,
                amenities: action.data,
            }
        case GET_AMENITIES_FAILED:
            return {
                ...state,
                amenities: action.error,
            }
        case ADD_SPACES_MEDIA_SUCCESS:
            return {
                ...state,
                spacemedia: action.data,
            }
        case ADD_SPACES_MEDIA_FAILED:
            return {
                ...state,
                spacemedia: action.error,
            }
            case GET_DASH_LISCENCE_SUCCESS:
            return {
                ...state,
                dashliscence: action.data,
            }
        case GET_DASH_LISCENCE_FAILED:
            return {
                ...state,
                dashliscence: action.error,
            }
        case GET_INITIALSTATE:
            return {
                ...state,
                deleteMedia:[],
                spacemedia:[],
                // spaceListing:[],
            }
        default:
            return state
    }
}
export default adminSpace;