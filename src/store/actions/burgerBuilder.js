import * as actionTypes from "./actionTypes";

export const addIngredient = (ing) => {
  return { type: actionTypes.ADD_INGREDIENT, ing };
};

export const removeIngredient = (ing) => {
  return { type: actionTypes.REMOVE_INGREDIENT, ing };
};

export const setIngredients = (ingredients) => {
  return { type: actionTypes.SET_INGREDIENT, ingredients };
};

export const fetIngredientFailed = () => {
  return { type: actionTypes.FETCH_INGREDIENT_FAILED };
};

export const initIngredients = () => {
  return { type: actionTypes.FETCH_INGREDIENTS };
};
