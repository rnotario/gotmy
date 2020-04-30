import React from "react";

import styles from "./Flex.module.css";

export const Column = (props) => {
  return (
    <div className={`${styles.flex} ${styles.column}`} style={props.style }>{props.children}</div>
  );
};

