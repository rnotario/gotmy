import React, { Component } from "react";
import { languageService } from "../../../services";
import { LanguageItem } from "./LanguageItem";
import Card from "../../Card/Card";
import { Row } from "../../Flex/Row";

import AutoSuggest from "react-autosuggest";
// import theme from "react-autosuggest/"

import styles from "./Autocomplete.module.css";

export default class LanguageSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: [],
      userLanguages: this.props.value || [],
      suggestions: [],
      value: "",
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        userLanguages: nextProps.value || [],
        languages: nextProps.languages,
      };
    });
  };

  getLanguageItems() {
    return this.state.languages
      .filter((language) => {
        return (
          this.state.userLanguages &&
          this.state.userLanguages.includes(language.lang_ide)
        );
      })
      .map((language) => {
        return (
          <LanguageItem
            language={language}
            editable={this.props.editable}
            onDelete={this.props.onDelete}
          />
        );
      });
  }

  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : this.props.languages.filter((lang) => {
          return (
            !this.state.userLanguages.includes(lang.lang_ide) &&
            lang.lang_description.toLowerCase().slice(0, inputLength) ===
              inputValue
          );
        });
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = (suggestion) => suggestion.lang_description;

  // Use your imagination to render suggestions.
  renderSuggestion = (suggestion) => <span>{suggestion.lang_description}</span>;

  handleDelete = (clickedLanguage) => {
    this.props.onDelete(clickedLanguage);
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value, reason }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    this.props.onAdd(suggestion);
    this.setState({
      value: "",
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { suggestions, value } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Type a language",
      value,
      onChange: this.onChange,
    };

    return (
      <div>
        <label className={styles.label} htmlFor={this.props.name}>
          {this.props.label}
        </label>
        <Card
          style={{ padding: "5px", minHeight: "100px", marginTop: "0.2rem" }}
        >
          <Row>
            {this.getLanguageItems()}
            {this.props.editable && (
              <AutoSuggest
                theme={styles}
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onSuggestionSelected={this.onSuggestionSelected}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
              />
            )}
          </Row>
        </Card>
      </div>
    );
  }
}

LanguageSelector.defaultProps = {
  value: [],
  editable: true,
};
