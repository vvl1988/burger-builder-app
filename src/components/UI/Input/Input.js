import React from "react";
import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;
  switch (props.elementType) {
    case "input":
      inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.defaultValue} />;
      break;
    case "textarea":
      inputElement = <textarea className={classes.Input} {...props.elementConfig} value={props.defaultValue} />;
      break;
    case "select":
        inputElement = <select className={classes.Input} {...props.elementConfig} value={props.defaultValue} />;
        break;
    default:
      inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.defaultValue} />;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
