import React, { Component, Fragment } from "react";
import { userActions } from "../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Card from "../../components/Card/Card";

import logo from "../../assets/img/login.png";
import Button from "../../components/Button/Button";
import { Input } from "../../components/Inputs";

import styles from "./RegistrationPage.module.css";

class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
    };
  }

  handleInputChange = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value,
      error: "",
    });
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    this.validateFields();

    if (!this.state.error) {
      const { email, password, password2 } = this.state;
      this.props.register({ email, password, password2 }, this.props.history);
    }
  };

  validateFields = () => {
    const { email, password, password2 } = this.state;
    let error;

    if (
      !email ||
      !email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i
      )
    ) {
      error = "You must enter a valid email";
    } else if (!password) {
      error = "You must enter a password";
    } else if (password !== password2) {
      error = "Passwords don't match";
    }

    if (error) {
      this.setState({
        error,
      });
    }
  };

  // Clientside message will have preference and will prevent from sending request to server
  getErrorMessage = () => {
    return (
      this.state.error || (this.props.error && this.props.error[0].message)
    );
  };

  render() {
    return (
      <Card style={{ width: "700px" }}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome to</h1>
          <img className={styles.logo} src={logo} alt="gotmy alternate logo" />
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
          <div className={styles.formGroup}>
            <Input
              type="password"
              name="password2"
              label="Repeat password"
              value={this.state.password2}
              onChange={this.handleInputChange}
              placeholder="repeat password"
            />
          </div>
          <div className={styles.error}>{this.getErrorMessage()}</div>
          <Button text="Continue" />
        </form>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.userData.error,
});

const mapDispatchToProps = (dispatch) => ({
  register: (user, history) => dispatch(userActions.register(user, history)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RegistrationPage));
