import * as actions from "../actions/index";
import { put, delay, call } from "redux-saga/effects";
import { FIRE_BASE_API } from "../../shared/constant";
import axios from "axios";

export function* logoutSaga(action) {
  // yield localStorage.removeItem("token");
  // yield localStorage.removeItem("userId");
  // yield localStorage.removeItem("expirationDate");
  // we can use call method to call a method of an object with the param like below.
  //if many params, seperated them by ","
  yield call([localStorage, 'removeItem'], "token");
  yield call([localStorage, 'removeItem'], "userId");
  yield call([localStorage, 'removeItem'], "expirationDate");
  yield put(actions.didLogOut());
}

export function* checkAuthTimeOutSaga(action) {
  yield delay(action.expiredTime);
  yield put(actions.logOut());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let authUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
    FIRE_BASE_API;
  if (!action.isSignUp) {
    authUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
      FIRE_BASE_API;
  }
  try {    
    // const response = yield axios.post(authUrl, authData);
    const response = yield call([axios, 'post'],authUrl, authData)
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(actions.checkAuthTimeOut(+response.data.expiresIn * 1000));
    const expirationDate = yield new Date(
      new Date().getTime() + +response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("userId", response.data.localId);
    yield localStorage.setItem("expirationDate", expirationDate);
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* checkAuthStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (token) {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );
    if (expirationDate > new Date()) {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      const expTime = yield expirationDate.getTime() - new Date().getTime();
      yield put(actions.checkAuthTimeOut(expTime));
    } else {
      yield put(actions.logOut());
    }
  } else {
    yield put(actions.logOut());
  }
}
