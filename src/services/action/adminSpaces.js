import { ADD_SPACES, GET_LISTING_TYPE, GET_SPACE_TYPE, GET_SPACE_DELETE, GET_SPACE, EDIT_SPACES, GET_SPACE_DETAILS, GET_INITIALSTATE, GET_AMENITIES, ADD_SPACES_MEDIA,GET_INITIALSTATE_SPACE_TYPE,ADD_SPACES_MEDIA_DELETE, GET_DASH_LISCENCE} from '../../constants/type';

export const addspace = (data, datafile) => ({
    type: ADD_SPACES,
    data,
    datafile
})
export const initialStateSpaceType = () =>({
    type: GET_INITIALSTATE_SPACE_TYPE
})
export const getSpaceType = (data) => ({
    type: GET_SPACE_TYPE,
    data
})
export const getListingType = (data) => ({
    type: GET_LISTING_TYPE,
    data
})
export const getspace = (data) => ({
    type: GET_SPACE,
    data
})
export const spaceDelete = (data) => ({
    type: GET_SPACE_DELETE,
    data
})
export const editspace = (id,data,datafile) => ({
    type: EDIT_SPACES,
    id,
    data,
    datafile
})
export const getspacedetails = (data) => ({
    type: GET_SPACE_DETAILS,
    data
})
export const initialState = () => ({
    type: GET_INITIALSTATE
})
export const getamenities = (data) => ({
    type: GET_AMENITIES,
    data
})
export const addspacemedia = (data,id) => ({
    type: ADD_SPACES_MEDIA,
    data,
    id
})
export const deleteSpaceMedia = (id) => ({
    type: ADD_SPACES_MEDIA_DELETE,
    id
})
export const dashliscence = () => ({
    type: GET_DASH_LISCENCE,
})