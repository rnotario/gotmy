import React from "react";

import styles from "./Flex.module.css";

export const Row = (props) => {
  return (
    <div className={`${styles.flex} ${styles.row}`} style={props.style }>{props.children}</div>
  );
};
