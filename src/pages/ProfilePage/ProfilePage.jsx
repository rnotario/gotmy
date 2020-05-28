import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Row } from "../../components/Flex/Row";
import { Column } from "../../components/Flex/Column";
import {
  Input,
  CustomSelect,
  DateInput,
  TextArea,
  LanguageSelector,
} from "../../components/Inputs";

import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";

import { userActions, languageActions } from "../../actions";
import userIcon from "../../assets/img/user.png";
import calendarIcon from "../../assets/img/calendar.png";

import styles from "./ProfilePage.module.css";

class ProfilePage extends Component {
  formatCity(data) {
    if (typeof data === "string" && data !== "") {
      return JSON.parse(data).city;
    } else if (typeof data === "object") {
      return data.city;
    }
    return "";
  }

  componentDidMount() {
    this.props.getMyProfile();
    this.props.getLanguages();
  }

  handleEdit = () => {
    this.props.history.push("/profile/edit");
  };

  render() {
    return (
      <Fragment>
        <Column>
          <Card style={{ width: "700px" }}>
            <h1 className={styles.title}>Public information</h1>
            <Row style={{ alignItems: "start" }}>
              <ProfilePicture
                image={this.props.user.user_avatar}
                icon={userIcon}
                iconAlt="User icon"
                editable={false}
              />
              <Column style={{ marginLeft: "20px" }}>
                <Input
                  style={{ marginBottom: "15px" }}
                  type="text"
                  name="user_name"
                  label="Name and Lastname"
                  value={[
                    this.props.user.user_name,
                    this.props.user.user_lastname,
                  ].join(" ")}
                  editable={false}
                />
                <Input
                  style={{ marginBottom: "15px" }}
                  type="text"
                  name="user_username"
                  label="Choose your username"
                  value={this.props.user.user_username}
                  editable={false}
                />
                <Row style={{ marginBottom: "15px" }}>
                  <Input
                    style={{ marginBottom: "15px" }}
                    type="text"
                    label="Country"
                    value={this.formatCity(this.props.user.user_location)}
                    editable={false}
                  />
                  <DateInput
                    style={{ marginLeft: "15px" }}
                    type="text"
                    label="Birthday (private)"
                    name="user_birthdate"
                    value={this.props.user.user_birthdate}
                    editable={false}
                  />
                </Row>
              </Column>
            </Row>
            <TextArea
              style={{ marginBottom: "15px" }}
              name="user_aboutme"
              label="Biography"
              value={this.props.user.user_aboutme}
              editable={false}
            />
            <LanguageSelector
              name="user_languages"
              label="Choose your languages"
              value={this.props.user.user_languages}
              languages={this.props.languages}
              onDelete={this.handleLanguageDelete}
              onAdd={this.handleLanguageAddition}
              editable={false}
            />
          </Card>
        </Column>
        <div className={styles.buttonContainer}>
          <Button
            style={{
              width: "100px",
              marginLeft: "10px",
              padding: "0.5rem 1rem",
            }}
            text="Edit"
            onClick={this.handleEdit}
          />
        </div>
      </Fragment>
    );
  }
}

ProfilePage.defaultProps = {
  user: {},
  languages: [],
};

const mapStateToProps = (state) => ({
  user: state.userData.currentUser,
  languages: state.languageData.languages,
});

const mapDispatchToProps = (dispatch) => ({
  getMyProfile: () => dispatch(userActions.getProfile()),
  getLanguages: () => dispatch(languageActions.getAll()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfilePage));
