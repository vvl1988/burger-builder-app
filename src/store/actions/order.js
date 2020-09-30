import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderID: id,
    orderData,
  };
};

export const purchaseBurgerfail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((respond) => {
        dispatch(purchaseBurgerSuccess(respond.data.name, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerfail(error));
      });
  };
};

export const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
  };
};

export const fetchOrderfail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error,
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrderInit = () => {
  return {
    type: actionTypes.FETCH_ORDERS_INIT,
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrderStart());
    const queryParams= '?auth=' + token +'&orderBy="userId"&equalTo="' + userId +'"';
    axios
      .get("/orders.json" + queryParams)
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        dispatch(fetchOrderSuccess(fetchedOrders));
      })
      .catch((err) => {
        dispatch(fetchOrderfail(err));
      });
  };
};
