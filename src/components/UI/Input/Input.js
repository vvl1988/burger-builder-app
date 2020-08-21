import React from "react";
import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;
  switch (props.elementType) {
    case "input":
      inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.defaultValue} onChange={props.changed}/>;
      break;
    case "textarea":
      inputElement = <textarea className={classes.Input} {...props.elementConfig} value={props.defaultValue} onChange={props.changed}/>;
      break;
    case "select":
      inputElement = 
      <select className={classes.InputElement} value={props.defaultValue} key={props.elementConfig.key}onChange={props.changed}>
          {props.elementConfig.options.map(cfg => (<option value={cfg.value} key={cfg.value}>{cfg.displayValue}</option>))}
      </select>;
      break;
    default:
      inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.defaultValue} onChange={props.changed}/>;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
