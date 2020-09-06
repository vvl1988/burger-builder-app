import * as actionTypes from "../actions/actionTypes";
const initState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return { ...state, purchased: false };
    case actionTypes.PURCHASE_BURGER_START:
    case actionTypes.FETCH_ORDER_START:
      return { ...state, loading: true };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true,
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
    case actionTypes.FETCH_ORDER_FAIL:
      return { ...state, loading: false };

    // case actionTypes.FETCH_ORDER_INIT:
    case actionTypes.FETCH_ORDER_SUCCESS:
      return { ...state, loading: false, orders: action.orders};

    default:
      return state;
  }
};

export default reducer;
