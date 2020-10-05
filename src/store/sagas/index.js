import {takeEvery, all, takeLatest} from 'redux-saga/effects';
import {logoutSaga, checkAuthTimeOutSaga, authUserSaga, checkAuthStateSaga} from './auth';
import {initIngredientsSaga} from './burgerBuilder';
import {purchaseBurgerSaga, fetchOrdersSaga} from './order';
import * as ActionTypes from '../actions/actionTypes';

export function* watchAuth(){
    // yield takeEvery(ActionTypes.AUTH_INITIATE_LOG_OUT, logoutSaga);
    // yield takeEvery(ActionTypes.AUTH_CHECK_TIME_OUT, checkAuthTimeOutSaga);
    // yield takeEvery(ActionTypes.AUTH_USER, authUserSaga);
    // yield takeEvery(ActionTypes.AUTH_CHECK_LOGIN_STATE, checkAuthStateSaga);
    //we can use "all" to call many task in parallel
    //for the code below, it does not make any sense, only an example usage of "all"
    //We use this in case many async task rune in parallel, example: 3 axios to fetch some data from server that no need to waint each other to be completed
    yield all([
        takeEvery(ActionTypes.AUTH_INITIATE_LOG_OUT, logoutSaga),
        takeEvery(ActionTypes.AUTH_CHECK_TIME_OUT, checkAuthTimeOutSaga),
        takeEvery(ActionTypes.AUTH_USER, authUserSaga),
        takeEvery(ActionTypes.AUTH_CHECK_LOGIN_STATE, checkAuthStateSaga)
    ]);
}

export function* watchBurgerBuilder(){
    yield takeEvery(ActionTypes.FETCH_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder(){
    //beside takeEvery to run the code whenever an action was dispatch,
    //we also have takeLatest to rune the code  at the last dispatched action that cancel all previous actions
    //for purchasing burger, in case user accidently click many time on purchase button, if we use take latest insteadof takeEvery,
    //we only rune the code one time
    yield takeLatest(ActionTypes.PURCHASE_BURGER_INIT, purchaseBurgerSaga);
    yield takeEvery(ActionTypes.FETCH_ORDERS_INIT, fetchOrdersSaga);
}