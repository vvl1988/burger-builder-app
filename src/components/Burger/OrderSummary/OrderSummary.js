import React, { Component } from "react";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  // Should be a functional component, just make it to be class-base component for debug purpose
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span> :{" "}
          {this.props.ingredients[igKey]}
        </li>
      )
    );

    return (
      <React.Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          Total Price: <strong>{this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button buttonType="Danger" clicked={this.props.purchaseCanceled}>
          CANCEL
        </Button>
        <Button buttonType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </React.Fragment>
    );
  }
}

export default OrderSummary;
