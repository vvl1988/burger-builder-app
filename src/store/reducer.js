import * as actionTypes from "./actions";
import { INGREDIENT_PRICES } from "../constant";
const initState = {
  ingredients: { bacon: 0, cheese: 0, meat: 0, salad: 0 },
  totalPrice: 4,
};

const reducer = (state = initState, action) => {
  console.log(state);
  switch (action.type) {
    case actionTypes.INGREDIENT_ADDED:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ing]: state.ingredients[action.ing] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ing],
      };

    case actionTypes.INGREDIENT_REMOVED:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ing]: state.ingredients[action.ing] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ing]
      }
    default:
      return state;
  }
};

export default reducer;
