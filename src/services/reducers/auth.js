import {
    LOGIN_SUCCESS,
    SIGNUP_SUCCESSFUL,
    SIGNUP_FAILED,
    FORGOT_SUCCESS,
    FORGOT_FAILED,
    NOT_VERIFIED,
    LOGIN_FAILED,
    OTP_SENT_SUCCESSFULLY,
    FAILED_TO_SEND_NEW_OTP,
    OTP_VERIFIED,
    FAILED_TO_VERIFY_OTP,
    PASSWORD_UPDATED_SUCCESSFULLY,
    FAILED_TO_UPDATE_PASSWORD,
    USER_LOGGEDIN,
    LOGOUT_SUCCESS,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    UPDATE_USER_FAILED,
    PASSWORD_CHANGE_SUCCESS,
    PASSWORD_CHANGE_FAILED,
    UPDATE_USER_SUCCESS,
    SWITCH_ROLE_SUCCESS,
    SWITCH_ROLE_FAILED,
    SWITCH_ROLE

} from "../../constants/type";
const initialState = {
    Verification: [],
    Logout: [],
    Login: [],
    Signup: [],
    Forgot: [],
    Reotp: [],
    Search: [],
    Pwdupdate: [],
    Newpwd: [],
    User: [],
    userpassword: [],
    tokenSuccess: false,
    userrole: [],
    isAdmin: false
}
const auth = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                Login: action.data,
            }
        case USER_LOGGEDIN:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                isAdmin: action.isAdmin,
                tokenSuccess: true,
            }
        case LOGIN_FAILED:
            return {
                ...state,
                Login: action.error,
            }

        case FORGOT_SUCCESS:
            return {
                ...state,
                Forgot: action.data,
            }
        case FORGOT_FAILED:
            return {
                ...state,
                Forgot: action.error,
            }
        case SIGNUP_SUCCESSFUL:
            return {
                ...state,
                Signup: action.data,
            }
        case SIGNUP_FAILED:
            return {
                ...state,
                Signup: action.error,

            }
        case NOT_VERIFIED:
            return {
                ...state,
                Verification: action.error,

            }
        case OTP_SENT_SUCCESSFULLY:
            return {
                ...state,
                Reotp: action.data,

            }
        case FAILED_TO_SEND_NEW_OTP:
            return {
                ...state,
                Reotp: action.error,
            }
        case OTP_VERIFIED:
            return {
                ...state,
                Pwdupdate: action.data,
            }
        case FAILED_TO_VERIFY_OTP:
            return {
                ...state,
                Pwdupdate: action.error,
            }
        case PASSWORD_UPDATED_SUCCESSFULLY:
            return {
                ...state,
                Newpwd: action.data,
            }
        case FAILED_TO_UPDATE_PASSWORD:
            return {
                ...state,
                Newpwd: action.error,
            }
        case LOGOUT_SUCCESS:
            localStorage.clear();
            console.log(initialState,"initialState===")
            return {
                ...initialState,
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                userdetails: action.data,
            }
        case GET_USER_FAILED:
            return {
                ...state,
                userdetails: action.error,
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                userupdate: action.data,
            }
        case UPDATE_USER_FAILED:
            return {
                ...state,
                userupdate: action.error,
            }
        case PASSWORD_CHANGE_SUCCESS:
            return {
                ...state,
                userpassword: action.data,
            }
        case PASSWORD_CHANGE_FAILED:
            return {
                ...state,
                userpassword: action.error,
            }
        case SWITCH_ROLE:
            return {
                ...state,
                isAdmin: localStorage.isAdmin
            }
        // case SWITCH_ROLE_SUCCESS:
        //     return {
        //         ...state,
        //         userpassword: action.data,
        //     }
        // case SWITCH_ROLE_FAILED:
        //     return {
        //         ...state,
        //         userpassword: action.error,
        //     }  
        default:
            return state
    }
}
export default auth;