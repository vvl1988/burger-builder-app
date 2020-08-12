import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <BuildControl label="1" />
    <BuildControl label="2" />
    <BuildControl label="3" />
    <BuildControl label="4" />
  </div>
);

export default buildControls;
