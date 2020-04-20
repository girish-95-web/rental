import {
    CHAT_LIST_FAILURE,
    CHAT_LIST_SUCCESS,
    CHAT_WINDOW_SUCCESS,
    CHAT_WINDOW_FAILURE,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAILURE,
    CHECK_HISTORY_SUCCESS,
    CHECK_HISTORY_FAILURE,
    GET_PROPERTY_SUCCESS,
    GET_PROPERTY_FAILURE,
    UPDATE_CHAT_MESSAGES
} from "../../constants/type";
const initialState = {
    chats: {},
    messages: {},
    isMessageSent: false,
    previousHistory: false,
    propertylist:[] 
}
const chat = (state = initialState, action) => {
    switch (action.type) {
        case CHAT_LIST_SUCCESS:
            return {
                ...state,
                chats: action.data,
            }
        case CHAT_LIST_FAILURE:
            return {
                ...state,
                chats: action.error,
            }
        case CHAT_WINDOW_FAILURE:
                
                return {
                    ...state,
                    messages: action.error,
        }
        case CHAT_WINDOW_SUCCESS:
            console.log('we are printing the previous chat history',state)
            return {
                ...state,
                messages: action.data,
            }
        case SEND_MESSAGE_SUCCESS:
            return{
                ...state,
                message :action.data,
                isMessageSent:true
            } 
        case SEND_MESSAGE_FAILURE:
                return{
                    ...state,
                    message :action.error
                } 
        case CHECK_HISTORY_SUCCESS:
        return{
            ...state,
            previousHistory :action.data
        }
        case CHECK_HISTORY_FAILURE:
        return{
            ...state,
           // message :action.data,
            previousHistory:false
        }
        case GET_PROPERTY_SUCCESS:
        return{
            ...state,
            propertylist:action.data
        }    
        case GET_PROPERTY_FAILURE:
            return{
                ...state,
            propertylist:action.error    
            }
        case UPDATE_CHAT_MESSAGES:
        console.log('inn the reducer',state.messages.chatList) 
        console.log('inn the reducer 1',action.data)   
        return {
            ...state,
            //messages: state.messages.concat(action.data)
          messages: {chatList:[...state.messages.chatList,action.data]}
           
            }    
        default:
            return state
    }
}
export default chat;
