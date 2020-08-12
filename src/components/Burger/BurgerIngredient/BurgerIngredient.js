import React, { Component } from "react";
import PropTypes from "prop-types";

import classes from "./BurgerIngredient.module.css";

class BurgerIngredient extends Component {
  render() {
    let ingredientClass = "";
    switch (this.props.type) {
      case "bread-bottom":
        ingredientClass = classes.BreadBottom;
        break;
      case "bread-top":
        ingredientClass = classes.BreadTop;
        break;
      case "meat":
        ingredientClass = classes.Meat;
        break;
      case "cheese":
        ingredientClass = classes.Cheese;
        break;
      case "salad":
        ingredientClass = classes.Salad;
        break;
      case "bacon":
        ingredientClass = classes.Bacon;
        break;
      default:
        break;
    }

    const ingredient = <div className={ingredientClass}></div>;
    return ingredient;
  }
}
BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};
export default BurgerIngredient;
