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
import cameraIcon from "../../assets/img/photo.png";
import calendarIcon from "../../assets/img/calendar.png";

import styles from "./ProfilePageEdit.module.css";

class ProfilePageEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.user,
      fullName: "",
    };
  }

  formatCity(data) {
    if (typeof data === "string" && data !== "") {
      return JSON.parse(data).city;
    } else if (typeof data === "object") {
      return data.city;
    }
    return "";
  }

  handleChange = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  };

  handleNameChange = (ev) => {
    const [firstName, ...lastName] = ev.target.value.split(" ");

    this.setState({
      user_name: firstName,
      user_lastname: lastName.join(" "),
      fullName: ev.target.value,
    });
  };

  getFullName = (user) => {
    if (user.user_lastname) {
      return `${user.user_name} ${user.user_lastname}`;
    } else {
      return user.user_name;
    }
  };

  handleDateChange = (date) => {
    const dateInMillis = date.valueOf();
    this.setState({
      user_birthdate: dateInMillis,
    });
  };

  handleCityChange = (option) => {
    this.setState({
      user_location: {
        city: option.value,
        lat: null,
        lng: null,
      },
    });
  };

  handlePictureChange = (ev) => {
    const file = ev.target.files[0];
    const reader = new FileReader();
    const _this = this;

    reader.onloadend = function () {
      _this.setState({
        user_avatar: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  handleLanguageAddition = (langTag) => {
    let newLang = this.props.languages.find(
      (lang) => lang.lang_ide === langTag.id
    );
    this.setState((prevState, props) => ({
      user_languages: [...prevState.user_languages, newLang.lang_ide],
    }));
  };

  handleLanguageDelete = (language) => {
    this.setState((prevState, props) => ({
      user_languages: prevState.user_languages.filter(
        (lang) => lang !== language.lang_ide
      ),
    }));
  };

  handleLanguageAddition = (language) => {
    // user_languages can be null (in case of a new user)
    this.setState((prevState, props) => {
      let userLanguages = prevState.user_languages || [];
      return {
        user_languages: [...userLanguages, language.lang_ide],
      };
    });
  };

  handleCancel = () => {
    this.props.history.push("/profile");
  };

  handleSave = () => {
    this.props.update(this.formatProfileData(), this.props.history);
  };

  formatProfileData = () => {
    // only send updated fields
    const formattedProfileData = {};

    for (let key in this.state) {
      if (this.state[key] !== this.props.user[key]) {
        formattedProfileData[key] = this.state[key];
      }
    }

    return formattedProfileData;
  };

  componentDidMount() {
    this.props.getMyProfile();
    this.props.getLanguages();
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      ...nextProps.user,
      fullName: this.getFullName(nextProps.user || {}),
    });
  };

  getActiveLanguages = () => {
    return this.props.languages.filter((lang) => {
      return (
        this.state.user_languages &&
        this.state.user_languages.includes(lang.lang_ide)
      );
    });
  };

  formatLanguages = (languages) => {
    return languages.map((language) => {
      return {
        id: language.lang_ide,
        name: language.lang_description,
      };
    });
  };

  render() {
    return (
      <Fragment>
        <Column>
          <Card style={{ width: "700px" }}>
            <h1 className={styles.title}>Public information</h1>
            <Row style={{ alignItems: "start" }}>
              <ProfilePicture
                onChange={this.handlePictureChange}
                image={this.state.user_avatar}
                icon={cameraIcon}
                iconAlt="Camera icon"
              />
              <Column style={{ marginLeft: "20px" }}>
                <Input
                  style={{ marginBottom: "15px" }}
                  type="text"
                  name="user_name"
                  label="Name and Lastname"
                  value={this.state.fullName}
                  onChange={this.handleNameChange}
                />
                <Input
                  style={{ marginBottom: "15px" }}
                  type="text"
                  name="user_username"
                  label="Choose your username"
                  value={this.state.user_username}
                  onChange={this.handleChange}
                />
                <Row style={{ marginBottom: "15px" }}>
                  <CustomSelect
                    name="user_location"
                    label="Country"
                    value={this.formatCity(this.state.user_location)}
                    onChange={this.handleCityChange}
                    displayField="city"
                    valueField="city"
                  />
                  {/* <DatePicker calendarIcon={calendarIcon} /> */}
                  <DateInput
                    style={{ marginLeft: "15px" }}
                    type="text"
                    label="Birthday (private)"
                    name="user_birthdate"
                    value={this.state.user_birthdate}
                    onChange={this.handleDateChange}
                  />
                </Row>
              </Column>
            </Row>
            <TextArea
              style={{ marginBottom: "15px" }}
              name="user_aboutme"
              label="Biography"
              value={this.state.user_aboutme}
              onChange={this.handleChange}
            />
            <LanguageSelector
              name="user_languages"
              label="Choose your languages"
              value={this.state.user_languages}
              languages={this.props.languages}
              onDelete={this.handleLanguageDelete}
              onAdd={this.handleLanguageAddition}
            />
          </Card>
        </Column>

        <div className={styles.buttonContainer}>
          <Button
            style={{
              backgroundColor: "#acacac",
              padding: "0.5rem 1rem",
              width: "100px",
            }}
            text="Cancel"
            onClick={this.handleCancel}
          />
          <Button
            style={{
              width: "100px",
              marginLeft: "10px",
              padding: "0.5rem 1rem",
            }}
            text="Save"
            onClick={this.handleSave}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userData.currentUser,
  languages: state.languageData.languages,
});

const mapDispatchToProps = (dispatch) => ({
  update: (user, history) => dispatch(userActions.updateProfile(user, history)),
  getMyProfile: () => dispatch(userActions.getProfile()),
  getLanguages: () => dispatch(languageActions.getAll()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfilePageEdit));
