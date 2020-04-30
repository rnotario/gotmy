import React, { Component, Fragment } from "react";
import { userActions } from "../../actions";
import { connect } from "react-redux";

import Card from "../../components/Card/Card";

import logo from "../../assets/img/login.png";
import Button from "../../components/Button/Button";
import { Input } from "../../components/Inputs";

import styles from "./LoginPage.module.css";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleInputChange = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  };

  handleSubmit = (ev) => {
    ev.preventDefault();

    const { email, password } = this.state;
    this.props.login({ email, password });
  };

  render() {
    return (
      <Card style={{width: "700px"}}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome to</h1>
          <img
            className={styles.logo}
            src={logo}
            alt="gotmy alternate logo"
          />
        </div>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <div className={styles.formGroup}>
            <Input
              type="text"
              name="email"
              label="Email address"
              value={this.state.email}
              onChange={this.handleInputChange}
              placeholder="enter email"
            />
          </div>
          <div className={styles.formGroup}>
            <Input
              type="password"
              name="password"
              label="Password"
              value={this.state.password}
              onChange={this.handleInputChange}
              placeholder="enter password"
            />
          </div>
          <Button text="Continue" />
        </form>
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(userActions.login(user)),
});

export default connect(null, mapDispatchToProps)(LoginPage);
