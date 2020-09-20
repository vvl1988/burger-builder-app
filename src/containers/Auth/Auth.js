import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import createInputConfig from "../../components/UI/Input/createInputConfig";
import checkValidation from "../../components/UI/Input/checkValidation";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions/index";
import classes from "./Auth.module.css";

class Auth extends Component {
  state = {
    controls: {},
    formIsValid: false,
    isSignUp: true,
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

  componentDidMount() {
    if(!this.props.isBuildingBurger && this.props.redirectPath !== "/"){
      this.props.onSetRedirectPath();
    }
  }

  inputChangedHandler = (event, inputID) => {
    const updatedControls = {
      ...this.state.controls,
      [inputID]: {
        ...this.state.controls[inputID],
        value: event.target.value,
        touched: true,
        isValid: checkValidation(
          event.target.value,
          this.state.controls[inputID].validation
        ),
      },
    };

    let formIsValid = true;
    for (let id in updatedControls) {
      formIsValid = updatedControls[id].isValid && formIsValid;
    }

    this.setState({ controls: updatedControls, formIsValid: formIsValid });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  changeAuthMethodHandler = () => {
    this.setState((prevState) => ({ isSignUp: !prevState.isSignUp }));
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
      <form onSubmit={this.submitHandler}>
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
          {this.state.isSignUp ? "SIGN UP" : "SIGN IN"}
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
        authRedirect = <Redirect to={this.props.redirectPath}/>;
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        {form}
        <Button buttonType="Danger" clicked={this.changeAuthMethodHandler}>
          Switch to {this.state.isSignUp ? "Sign In" : "Sign Up"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    isBuildingBurger: state.burger.building,
    redirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
