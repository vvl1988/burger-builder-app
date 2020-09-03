import * as actionTypes from './actionTypes';

export const addIngredient = (ing)=> {
    return {type: actionTypes.ADD_INGREDIENT, ing};
}

export const removeIngredient = (ing)=> {
    return {type: actionTypes.REMOVE_INGREDIENT, ing};
}