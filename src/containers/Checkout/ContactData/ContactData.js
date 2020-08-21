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
      ""
    );
    const street = this.createInputElementConfig("input", "text", "Street", "");
    const zipCode = this.createInputElementConfig(
      "input",
      "text",
      "ZIP Code",
      ""
    );
    const country = this.createInputElementConfig(
      "input",
      "text",
      "Country",
      ""
    );
    const email = this.createInputElementConfig(
      "input",
      "email",
      "Your Mail",
      ""
    );
    const deliveryMethod = {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "",
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

  createInputElementConfig(elementType, type, placeholder, defaultValue) {
    return {
      elementType: elementType,
      elementConfig: {
        type: type,
        placeholder: placeholder,
      },
      value: defaultValue,
    };
  }
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Loi",
        address: {
          street: "Khai Tay 2",
          zipCode: "50000",
          country: "VietNam",
        },
        email: "lvv1988@gmail.com",
      },
      deliveryMethod: "fastest",
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

  inputChangedHandler =(event, inputID) => {
    const updatedOrderForm = {...this.state.orderForm};
    const updatedFormElement = {...updatedOrderForm[inputID]};
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputID] = updatedFormElement;
    this.setState({orderForm: updatedOrderForm});
    console.log(this.state);
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
      <form>
        {inputElements.map((el) => {
          return (
            <Input
              key={el.id}
              elementType={el.config.elementType}
              elementConfig={el.config.elementConfig}
              defaultValue={el.config.defaultValue}
              changed={(event)=>this.inputChangedHandler(event, el.id)}
            />
          );
        })}
        <Button buttonType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
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
