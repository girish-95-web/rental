import { CHAT_LIST, CHAT_WINDOW,SEND_MESSAGE,CHECK_HISTORY,GET_PROPERTY,UPDATE_CHAT_MESSAGES } from '../../constants/type'
export const getchatlist=(data)=>({
    type:CHAT_LIST,
    data
})
export const getchatwindow=(data)=>({
    type:CHAT_WINDOW,
    data
})
export const sendmessageadmin=(data)=>({
    type:SEND_MESSAGE,
    data
})
export const checkForPreviousChat=(data)=>({
    type:CHECK_HISTORY,
    data
})
export const getpropertylist=(data)=>({
    type:GET_PROPERTY,
    data
})
export const getlatestmessage=(data)=>({
    type:UPDATE_CHAT_MESSAGES,
    data
})