import React, { Fragment } from "react";

import styles from "./TextArea.module.css";

const TextArea = (props) => {
  return (
    <div className={styles.container} style={props.style}>
      <label className={styles.label} htmlFor={props.name}>
        {props.label}
      </label>
      <textarea
        className={styles.input}
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      ></textarea>
    </div>
  );
};

export default TextArea;
