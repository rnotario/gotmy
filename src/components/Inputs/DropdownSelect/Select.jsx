import React, { Fragment } from "react";

import Select from "react-select";

import styles from "./Select.module.css"

const CustomSelect = (props) => {
  function getOptions() {
    return props.options.map((option) => {
      return {
        value: option[props.valueField],
        label: option[props.displayField]
      }
    });
  }

  return (
    <div className={styles.container} style={props.style}>
      <label className={styles.label}>
        {props.label}
      </label>
      <Select
        styles={customStyles}
        value={getOptions().filter(option => props.value === option.value)}
        onChange={props.onChange}
        options={getOptions()}
      />
    </div>
  );
};

const customStyles = {
  control: () => ({
    display: "flex",
    fontSize: "14px",
    padding: "1.5px",
    width: 200,
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px"
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: "none"
  }),
  container: (provided, state) => ({
    ...provided,
    border: "1px solid #dcdcdc",
    borderRadius: "5rem",
    outline: "none",
    // padding: "12px",
    width: "100%",
  })
}

CustomSelect.defaultProps = {
  options: [
    {
      city: "Barcelona, Spain",
      lat: null,
      lng: null,
    },
    {
      city: "Madrid, Spain",
      lat: null,
      lng: null,
    },
    {
      city: "S/C de Tenerife, Spain",
      lat: null,
      lng: null,
    },
  ],
  displayField: "city",
  value: "Barcelona, Spain"
};

export default CustomSelect;
