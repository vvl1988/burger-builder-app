import * as actionTypes from "../actions/actionTypes";
import { INGREDIENT_PRICES } from "../../constant";
const initState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ing]: state.ingredients[action.ing] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ing],
      };

    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ing]: state.ingredients[action.ing] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ing],
      };
    case actionTypes.SET_INGREDIENT:
      return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false
      };
    case actionTypes.FETCH_INGREDIENT_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
