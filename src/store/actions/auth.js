import * as ActionTypes from "./actionTypes";

export const authStart = () => {
  return { type: ActionTypes.AUTH_START };
};

export const authSuccess = (idToken, userId) => {
  return { type: ActionTypes.AUTH_SUCCESS, idToken: idToken, userId: userId };
};

export const authFail = (error) => {
  return { type: ActionTypes.AUTH_FAILED, error: error };
};

export const logOut = () => {
  // localStorage.removeItem("token");
  // localStorage.removeItem("userId");
  // localStorage.removeItem("expirationDate");
  return { type: ActionTypes.AUTH_INITIATE_LOG_OUT };
};

export const didLogOut = () => {
  return { type: ActionTypes.LOG_OUT };
}

export const checkAuthTimeOut = (expiredTime) => {
  return {type: ActionTypes.AUTH_CHECK_TIME_OUT, expiredTime: expiredTime};
};

export const auth = (email, password, isSignUp) => {
  return {type:ActionTypes.AUTH_USER, email:email, password: password, isSignUp:isSignUp}
};

export const setAuthRedirectPath = (path) => {
  return {type: ActionTypes.SET_AUTH_REDIRECT_PATH, path: path}
}

export const checkAuthState = () => {
  return {type: ActionTypes.AUTH_CHECK_LOGIN_STATE};
}
