import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) =>{
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderID: id,
        orderData
    }
}

export const purchaseBurgerfail = (error) =>{
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    }
}

export const purchaseBurgerStart = ()=>{
    return{
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios
        .post("/orders.json", orderData)
        .then((respond) => {
            dispatch(purchaseBurgerSuccess(respond.data.name, orderData));
        })
        .catch((error) => {
            dispatch(purchaseBurgerfail(error));
        });
    }
}