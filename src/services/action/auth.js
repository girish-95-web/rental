import { SWITCH_ROLE, LOGIN, LOGOUT, FORGOT, SIGNUP, VERIFICATION, GET_USER, PWDUPDATE, RE_OTP, NEWPWD, USER_LOGGEDIN, UPDATE_USER, PASSWORD_CHANGE } from '../../constants/type';
export const login = (data) => ({
    type: LOGIN,
    data
})
export const logout = (data) => ({
    type: LOGOUT,
    data
})
export const forgot = (data) => ({
    type: FORGOT,
    data
})
export const signup = (data) => ({
    type: SIGNUP,
    data
})
export const userLoggedin = (token, userId, isAdmin) => ({
    type: USER_LOGGEDIN,
    token,
    userId,
    isAdmin
})
export const verification = (data) => ({
    type: VERIFICATION,
    data
})
export const pwdupdate = (data) => ({
    type: PWDUPDATE,
    data
})
export const newpwd = (data) => ({
    type: NEWPWD,
    data
})
export const reotp = (data) => ({
    type: RE_OTP,
    data
})
export const switchrole = (data) => ({
    type: SWITCH_ROLE,
    data
})
// export const search = (data) => ({
//     type: SEARCH,
//     data
// })
// export const listing = (data) => ({
//     type: LISTING,
//     data
// })
export const getuser = () => ({
    type: GET_USER,
})
export const updateuser = (data) => ({
    type: UPDATE_USER,
    data
})
export const updatepassword = (data) => ({
    type: PASSWORD_CHANGE,
    data
})