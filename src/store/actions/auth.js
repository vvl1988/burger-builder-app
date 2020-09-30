import axios from "axios";
import * as ActionTypes from "./actionTypes";
import { FIRE_BASE_API } from "../../shared/constant";

const authStart = () => {
  return { type: ActionTypes.AUTH_START };
};

const authSuccess = (idToken, userId) => {
  return { type: ActionTypes.AUTH_SUCCESS, idToken: idToken, userId: userId };
};

const authFail = (error) => {
  return { type: ActionTypes.AUTH_FAILED, error: error };
};

export const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  return { type: ActionTypes.LOG_OUT };
};

const checkAuthTimeOut = (expiredTime) => {
  console.log(expiredTime);
  return (dispatch) => {
    setTimeout(()=>dispatch(logOut()), expiredTime);
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
        dispatch(checkAuthTimeOut(+response.data.expiresIn * 1000));
        const expirationDate = new Date(new Date().getTime() + +response.data.expiresIn * 1000);
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("expirationDate", expirationDate);
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {type: ActionTypes.SET_AUTH_REDIRECT_PATH, path: path}
}

export const checkAuthState = () => {
  return (dispatch) =>{
    const token = localStorage.getItem("token");
    if(token){
      const expirationDate = new Date(localStorage.getItem("expirationDate"));      
      if (expirationDate > new Date()){        
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId))
        const expTime = expirationDate.getTime() - new Date().getTime();
        console.log(expTime);
        dispatch(checkAuthTimeOut(expTime))
      } else{
        dispatch(logOut());
      }
    } else {
      dispatch(logOut());
    }
  }
}
