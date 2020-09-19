import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initState = {
  token: null,
  userId: null,
  loading: false,
  error:null
};

const authStart = (state, action) => {
  return updateObject(state, {error:null, loading:true});
}

const authSuccess = (state, action) => {
  return updateObject(state, {loading: false, error:null, token: action.idToken, userId: action.userId})
}

const authFail = (state, action) => {
  return updateObject(state, {error:action.error, loading:false});
}

const authLogOut = (state, action) => {
  return updateObject(state, {userId: null, token:null});
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:return authSuccess(state, action);
    case actionTypes.AUTH_FAILED:return authFail(state, action);
    case actionTypes.LOG_OUT:return authLogOut(state, action);
    default:
        return state;
  }
};

export default reducer;
