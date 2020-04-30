import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import LoginPage from "./pages/LoginPage/LoginPage";

import "./App.css";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProfilePageEdit from "./pages/ProfilePageEdit/ProfilePageEdit";


function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={LoginPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegistrationPage} />
        <Route path="/profile" exact component={ProfilePage} />
        <Route path="/profile/edit" exact component={ProfilePageEdit} />
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(App);
