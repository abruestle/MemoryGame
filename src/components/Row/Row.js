import React from "react";
import "./Row.css";

const Row = props =>
  <div className={`row${props.fluid ? "-fluid row-eq-height " : "row-eq-height "}`} {...props} />;

export default Row;
