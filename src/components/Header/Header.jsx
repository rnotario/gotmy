import React from "react";
import logo from "../../assets/img/logo.png";

import styles from "./Header.module.css"

const Header = (props) => {
  return (
    <header className={styles.header} style={props.style }>
      <img src={logo} alt="gotmy logo" className={styles.logo} />
    </header>
  );
};

export default Header;
