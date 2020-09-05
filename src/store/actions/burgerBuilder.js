import * as actionTypes from "./actionTypes";
import axios from "axios";
import { FIRE_BASE_URL } from "../../constant";

export const addIngredient = (ing) => {
  return { type: actionTypes.ADD_INGREDIENT, ing };
};

export const removeIngredient = (ing) => {
  return { type: actionTypes.REMOVE_INGREDIENT, ing };
};

const setIngredients = (ingredients) => {
  return { type: actionTypes.SET_INGREDIENT, ingredients };
};

const fetIngredientFailed = () => {
    return {type: actionTypes.FETCH_INGREDIENT_FAILED};
}

export const initIngredients = () => {
  return (dispatch) => {
    axios.get(FIRE_BASE_URL + "/ingredients.json").then((response) => {
      dispatch(setIngredients(response.data));
    })
    .catch(err => {
        dispatch(fetIngredientFailed());
    })
  };
};
