import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
import { INGREDIENT_PRICES } from "../../shared/constant";
const initState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ing]: state.ingredients[action.ing] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ing],
    building: true
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ing]: state.ingredients[action.ing] - 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ing],
    building: true
  };
  return updateObject(state, updatedState);
};

const setIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: 4,
    error: false,
    building: false
  });
};

const fetIngredientFailed = (state, action) => {
  return updateObject(state, { error: true });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENT:
      return setIngredient(state, action);
    case actionTypes.FETCH_INGREDIENT_FAILED:
      return fetIngredientFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
