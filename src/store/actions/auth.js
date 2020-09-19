import axios from "axios";
import * as ActionTypes from "./actionTypes";
import { FIRE_BASE_API } from "../../constant";

const authStart = () => {
  return { type: ActionTypes.AUTH_START };
};

const authSuccess = (idToken, userId) => {
  return { type: ActionTypes.AUTH_SUCCESS, idToken: idToken, userId: userId };
};

const authFail = (error) => {
  return { type: ActionTypes.AUTH_FAILED, error: error };
};

const logOut = () => {
  return { type: ActionTypes.LOG_OUT };
};

const checkAuthTimeOut = (expiredTime) => {
  console.log(expiredTime);
  return (dispatch) => {
    setTimeout(()=>dispatch(logOut()), expiredTime*1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = { email, password, returnSecureToken: true };
    let authUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
      FIRE_BASE_API;
    if (!isSignUp) {
      authUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        FIRE_BASE_API;
    }
    axios
      .post(authUrl, authData)
      .then((response) => {
        console.log(response);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeOut(+response.data.expiresIn));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(authFail(error.response.data.error));
      });
  };
};
