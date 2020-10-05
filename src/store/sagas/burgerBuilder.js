import {put} from 'redux-saga/effects';
import axios from 'axios';
import {FIRE_BASE_URL} from "../../shared/constant";
import * as actions from "../actions/index";

export function* initIngredientsSaga(action) {
    const response = yield axios.get(FIRE_BASE_URL + "/ingredients.json");
    try{
        yield put(actions.setIngredients(response.data));
    } catch(error){
        yield put(actions.fetIngredientFailed());
    }    
}