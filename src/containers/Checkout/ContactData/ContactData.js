import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: null,
    loading: false,
  };

  componentWillMount() {
    const name = this.createInputElementConfig(
      "input",
      "text",
      "Your Name",
      "",
      { required: true }
    );
    const street = this.createInputElementConfig(
      "input",
      "text",
      "Street",
      "",
      { required: true }
    );
    const zipCode = this.createInputElementConfig(
      "input",
      "text",
      "ZIP Code",
      "",
      { required: true, minLength: 5, maxLength: 5 }
    );
    const country = this.createInputElementConfig(
      "input",
      "text",
      "Country",
      "",
      { required: true }
    );
    const email = this.createInputElementConfig(
      "input",
      "email",
      "Your Mail",
      "",
      { required: true }
    );
    const deliveryMethod = {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
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

  createInputElementConfig(
    elementType,
    type,
    placeholder,
    defaultValue,
    validation
  ) {
    return {
      elementType: elementType,
      elementConfig: {
        type: type,
        placeholder: placeholder,
      },
      validation: validation,
      isValid: false,
      value: defaultValue,
      touched: false,
    };
  }
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElementID in this.state.orderForm) {
      formData[formElementID] = this.state.orderForm[formElementID].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: formData,
    };
    axios
      .post("/orders.json", order)
      .then((result) => {
        console.log(result);
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  inputChangedHandler = (event, inputID) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputID] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    if (updatedFormElement.validation) {
      updatedFormElement.isValid = this.checkValidation(
        updatedFormElement.value,
        updatedFormElement.validation
      );
    }
    updatedOrderForm[inputID] = updatedFormElement;
    console.log(updatedFormElement);
    this.setState({ orderForm: updatedOrderForm });
  };

  checkValidation(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = isValid && value.trim() !== "";
    }

    if (rules.minLength) {
      isValid = isValid && value.length >= rules.minLength;
    }

    if (rules.maxLength) {
      isValid = isValid && value.length <= rules.maxLength;
    }

    return isValid;
  }

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
        <Button buttonType="Success">ORDER</Button>
      </form>
    );
    if (this.state.loading) {
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

export default ContactData;
