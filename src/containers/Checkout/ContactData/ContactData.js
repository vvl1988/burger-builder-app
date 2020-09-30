import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import Input from "../../../components/UI/Input/Input";
import * as actions from "../../../store/actions/index";
import createInputConfig from "../../../components/UI/Input/createInputConfig";
import checkValidation from "../../../components/UI/Input/checkValidation";

class ContactData extends Component {
  state = {
    orderForm: null,
    formIsValid: false,
  };

  componentWillMount() {
    const name = createInputConfig("input", "text", "Your Name", "", {
      required: true,
    });
    const street = createInputConfig("input", "text", "Street", "", {
      required: true,
    });
    const zipCode = createInputConfig("input", "text", "ZIP Code", "", {
      required: true,
      minLength: 5,
      maxLength: 5,
      isNumeric: true,
    });
    const country = createInputConfig("input", "text", "Country", "", {
      required: true,
    });
    const email = createInputConfig("input", "email", "Your Mail", "", {
      required: true,
      isEmail: true,
    });
    const deliveryMethod = {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      validation: {},
      isValid: true,
      value: "fastest",
    };

    const orderForm = {
      name: name,
      street: street,
      zipCode: zipCode,
      country: country,
      email: email,
      deliveryMethod: deliveryMethod,
    };
    this.setState({ orderForm: orderForm });
  }

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementID in this.state.orderForm) {
      formData[formElementID] = this.state.orderForm[formElementID].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: formData,
      userId: this.props.userId
    };
    this.props.purchaseBurger(order, this.props.token);
  };

  inputChangedHandler = (event, inputID) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputID] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    if (updatedFormElement.validation) {
      updatedFormElement.isValid = checkValidation(
        updatedFormElement.value,
        updatedFormElement.validation
      );
    }
    updatedOrderForm[inputID] = updatedFormElement;

    let formIsValid = true;
    for (let id in updatedOrderForm) {
      formIsValid = updatedOrderForm[id].isValid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const inputElements = [];
    for (let key in this.state.orderForm) {
      inputElements.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {inputElements.map((el) => {
          return (
            <Input
              key={el.id}
              isValid={el.config.isValid}
              touched={el.config.touched}
              shouldValidate={el.config.validation}
              elementType={el.config.elementType}
              elementConfig={el.config.elementConfig}
              defaultValue={el.config.defaultValue}
              changed={(event) => this.inputChangedHandler(event, el.id)}
            />
          );
        })}
        <Button buttonType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    price: state.burger.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    purchaseBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
