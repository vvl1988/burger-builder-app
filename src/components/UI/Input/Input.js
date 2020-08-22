import React from "react";
import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;
  const inputClass = [classes.InputElement];
  if(!props.isValid && props.shouldValidate && props.touched){
    inputClass.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = <input className={inputClass.join(' ')} {...props.elementConfig} value={props.defaultValue} onChange={props.changed}/>;
      break;
    case "textarea":
      inputElement = <textarea className={inputClass.join(' ')} {...props.elementConfig} value={props.defaultValue} onChange={props.changed}/>;
      break;
    case "select":
      inputElement = 
      <select className={inputClass.join(' ')} value={props.defaultValue} key={props.elementConfig.key}onChange={props.changed}>
          {props.elementConfig.options.map(cfg => (<option value={cfg.value} key={cfg.value}>{cfg.displayValue}</option>))}
      </select>;
      break;
    default:
      inputElement = <input className={inputClass.join(' ')} {...props.elementConfig} value={props.defaultValue} onChange={props.changed}/>;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
