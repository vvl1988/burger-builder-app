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

export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json", orderData)
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
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders,
  };
};

export const fetchOrderfail = (error) => {
  return {
    type: actionTypes.FETCH_ORDER_FAIL,
    error,
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START,
  };
};

export const fetchOrderInit = () => {
  return {
    type: actionTypes.FETCH_ORDER_INIT,
  };
};

export const fetchOrders = () => {
  return (dispatch) => {
    dispatch(fetchOrderStart());
    axios
      .get("/orders.json")
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
