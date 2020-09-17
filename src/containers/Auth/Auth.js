import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import createInputConfig from "../../components/UI/Input/createInputConfig";
import checkValidation from "../../components/UI/Input/checkValidation";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";

class Auth extends Component {
  state = {
    controls: {}, formIsValid: false
  };

  componentWillMount() {
    const email = createInputConfig("input", "email", "Mail Address", "", {
      required: true,
      isEmail: true,
    });

    const password = createInputConfig("input", "password", "Password", "", {
      required: true,
      minLength: 8,
    });

    const controls = { email: email, password: password };
    this.setState({ controls: controls });
  }

  inputChangedHandler = (event, inputID) => {
    const updatedControls = { ...this.state.controls };
    const updatedFormElement = { ...updatedControls[inputID] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    if (updatedFormElement.validation) {
      updatedFormElement.isValid = checkValidation(
        updatedFormElement.value,
        updatedFormElement.validation
      );
    }
    updatedControls[inputID] = updatedFormElement;

    let formIsValid = true;
    for (let id in updatedControls) {
      formIsValid = updatedControls[id].isValid && formIsValid;
    }

    this.setState({ controls: updatedControls, formIsValid: formIsValid });
  };


  render() {
    const inputElements = [];
    for (let key in this.state.controls) {
      inputElements.push({
        id: key,
        config: this.state.controls[key],
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
      </form>
    );
    return <div className={classes.Auth}>
        {form}
         <Button buttonType="Success" disabled={!this.state.formIsValid}>
          SIGN IN
        </Button>
    </div>;
  }
}

export default Auth;
