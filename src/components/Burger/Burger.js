import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const burger = (props) => (
  <div className={classes.Burger}>
    <BurgerIngredient type="bread-top" />
    <BurgerIngredient type="salad" />
    <BurgerIngredient type="meat" />
    <BurgerIngredient type="cheese" />
    <BurgerIngredient type="salad" />
    <BurgerIngredient type="bread-bottom" />
  </div>
);

export default burger;
