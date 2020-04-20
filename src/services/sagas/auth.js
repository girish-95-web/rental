import { call, put, takeLatest, all } from "redux-saga/effects";
import Api from "../../lib/api";

import {
  LOGIN,
  LOGOUT,
  SIGNUP,
  FORGOT,
  VERIFICATION,
  VERIFIED,
  NOT_VERIFIED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESSFUL,
  SIGNUP_FAILED,
  FORGOT_SUCCESS,
  FORGOT_FAILED,
  PASSWORD_UPDATED_SUCCESSFULLY,
  FAILED_TO_UPDATE_PASSWORD,
  PWDUPDATE,
  RE_OTP,
  OTP_SENT_SUCCESSFULLY,
  FAILED_TO_SEND_NEW_OTP,
  OTP_VERIFIED,
  USER_LOGGEDIN,
  FAILED_TO_VERIFY_OTP,
  NEWPWD,
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_USER_FAILED,
  UPDATE_USER,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE,
  PASSWORD_CHANGE_FAILED,
  UPDATE_USER_SUCCESS
} from "../../constants/type";


// Logout Get APi
function postLogoutApi() {
  return Api.get(
    `auth/logout`
  );
}
function* logout() {
  try {
    const resp = yield call(postLogoutApi);
    if (resp.success === true) {
      localStorage.clear()
      yield put({ type: LOGOUT_SUCCESS, data: resp })
    } else {
      yield put({ type: LOGOUT_FAILED, error: resp })
    }
  } catch (resp) {
    yield put({ type: LOGOUT_FAILED, error: resp })
  }
}

//Login API
function postLoginApi(data) {
  return Api.post(
    `auth/login`,
    data.data

  );
}
function* login(action) {
  try {
    const resp = yield call(postLoginApi, action);
    localStorage.userJWT = resp.token;
    localStorage.userId = resp.user.id;
    localStorage.isAdmin = resp.user.role;
    yield put({ type: LOGIN_SUCCESS, data: resp })
    yield put({ type: USER_LOGGEDIN, token: resp.token,userId: resp.user.id,isAdmin: resp.user.role })
    yield put({ type: GET_USER })
  } catch (resp) {
    yield put({ type: LOGIN_FAILED, error: resp })
  }
}

// ForgotPassword API
function postForgotPasswordApi(data) {
  return Api.post(
    `auth/forgetPassword`,
    data.data
  );
}
function* forgot(action) {
  try {
    const resp = yield call(postForgotPasswordApi, action);
    yield put({ type: FORGOT_SUCCESS, data: resp })
  } catch (resp) {
    yield put({ type: FORGOT_FAILED, error: resp })
  }
}
// Signup API
function postSignupApi(data) {
  return Api.post(
    'auth/register',
    data.data
  );
}
function* signup(action) {
  try {
    const resp = yield call(postSignupApi, action);
    yield put({ type: SIGNUP_SUCCESSFUL, data: resp })
  } catch (resp) {
    yield put({ type: SIGNUP_FAILED, error: resp })
  }
}

// Verification API
function postVerificationApi(data) {
  return Api.post(
    'auth/verification',
    data.data
  );
}
function* verification(action) {
  try {
    const resp = yield call(postVerificationApi, action);
    localStorage.userJWT = resp.token;
    localStorage.userId = resp.user.id;
    localStorage.isAdmin = resp.user.role;
    yield put({ type: VERIFIED, data: resp })
    yield put({ type: USER_LOGGEDIN, token: resp.token,userId: resp.user.id,isAdmin: resp.user.role })
    yield put({ type: GET_USER })
  } catch (resp) {
    yield put({ type: NOT_VERIFIED, error: resp })
  }
}

// Password Update OTP API

function postPwdupdateApi(data) {
  return Api.post(
    'auth/verifyForget',
    {
      otp: data.data.otp,
      user: data.data.user,
    }
  );
}
function* pwdupdate(action) {
  try {
    const resp = yield call(postPwdupdateApi, action);
    localStorage.userJWT = resp.token;
    yield put({ type: OTP_VERIFIED, data: resp })
  }
  catch (resp) {
    yield put({ type: FAILED_TO_VERIFY_OTP, error: resp })
  }
}

// Password Update API

function postNewpwdApi(data) {
  return Api.post(
    'auth/updatePassword',
    data.data
  );
}
function* newpwd(action) {
  try {
    const resp = yield call(postNewpwdApi, action);
    yield put({ type: PASSWORD_UPDATED_SUCCESSFULLY, data: resp })
  }
  catch (resp) {
    yield put({ type: FAILED_TO_UPDATE_PASSWORD, error: resp })
  }
}

//Resend otp API
function postReotp(data) {
  return Api.post(
    'auth/resendotp',
    { user: data.data }
  );
}
function* reotp(action) {
  try {
    const resp = yield call(postReotp, action);
    yield put({ type: OTP_SENT_SUCCESSFULLY, data: resp })
  }
  catch (resp) {
    yield put({ type: FAILED_TO_SEND_NEW_OTP, error: resp })
  }
}
//GET User
function getuserApi() {
  return Api.get(
    'auth/getprofile',
  );
}
function* getuser() {
  try {
    const resp = yield call(getuserApi);
    yield put({ type: GET_USER_SUCCESS, data: resp })
  }
  catch (resp) {
    yield put({ type: GET_USER_FAILED, error: resp })
  }
}
// EDIT profile
function editprofileApi(data) {
  return Api.post(
    'auth/updateprofile',
    data.data
  );
}

function* updateuser(action) {
  try {
    const resp = yield call(editprofileApi, action);
    yield put({ type: GET_USER_SUCCESS, data: resp, profile: true })
  }
  catch (resp) {
    yield put({ type: UPDATE_USER_FAILED, error: resp })
  }
}
function editpasswordApi(data) {
  return Api.put(
    'auth/changepassword',
    {
      oldpassword: data.data.oldpassword,
      newpassword: data.data.newpassword
    }
  );
}
function* updatepassword(action) {
  try {
    const resp = yield call(editpasswordApi, action);
    yield put({ type: PASSWORD_CHANGE_SUCCESS, data: resp, profile: true })
  }
  catch (resp) {
    yield put({ type: PASSWORD_CHANGE_FAILED, error: resp })
  }
}
function* auth() {
  yield all([
    takeLatest(LOGOUT, logout),
    takeLatest(LOGIN, login),
    takeLatest(SIGNUP, signup),
    takeLatest(FORGOT, forgot),
    takeLatest(VERIFICATION, verification),
    takeLatest(PWDUPDATE, pwdupdate),
    takeLatest(RE_OTP, reotp),
    takeLatest(NEWPWD, newpwd),
    takeLatest(GET_USER, getuser),
    takeLatest(UPDATE_USER, updateuser),
    takeLatest(PASSWORD_CHANGE, updatepassword)
  ])
}
export default auth;