import {  ADD_TO_COLLECTION, GET_COLLECTION } from './../../constants/type'
export const addcollection = (data) => ({
    type:ADD_TO_COLLECTION,
    data
})
export const getcollection = (data) => ({
    type:GET_COLLECTION,
    data
})