import React, { Fragment } from "react";

import styles from "./TextArea.module.css";

const TextArea = (props) => {
  return (
    <div className={styles.container} style={props.style}>
      <label className={styles.label} htmlFor={props.name}>
        {props.label}
      </label>
      <textarea
        disabled={!props.editable}
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

TextArea.defaultProps = {
  editable: true
}

export default TextArea;
