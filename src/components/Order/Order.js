import React from "react";
import classes from "./Order.module.css";

const order = (props) => {
  const ingredients = [];
  for (let key in props.ingredients) {
    ingredients.push({
      name: key,
      amount: props.ingredients[key],
    });
  }
  const ingredientsOutput = ingredients.map((ing) => {
    return (
      <span key={ing.name} 
      style={{ 
          textTransform: "capitalize",
          display:'inline-block',
          margin: '0 8px',
          border:'1px solid #ccc',
          padding:'5px'

           }}>
        {ing.name}({ing.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p> Ingredients: {ingredientsOutput}</p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)} </strong>
      </p>
    </div>
  );
};

export default order;
