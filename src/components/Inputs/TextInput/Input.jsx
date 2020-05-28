import React, { Fragment } from "react";

import styles from "./Input.module.css"

const Input = (props) => {
  return (
    <div className={styles.container} style={props.style}>
      <label className={styles.label} htmlFor={props.name}>
        {props.label}
      </label>
      <input
        className={styles.input}
        type={props.type}
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        disabled={!props.editable}
      />
    </div>
  );
};

Input.defaultProps = {
  editable: true
}

export default Input;
