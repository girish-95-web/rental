import {
    DELETE_INITIALSTATE
} from "../../constants/type";
export const deleteInitial = (data) => ({
    type: DELETE_INITIALSTATE,
    data,
})