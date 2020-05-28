import React, { Fragment } from "react";
import moment from "moment";

import DatePicker from "react-datepicker";

import styles from "./DateInput.module.css";
import calendar from "../../../assets/img/calendar.png";

require("react-datepicker/dist/react-datepicker.css");

const DateInput = (props) => {
  function formatDate(dateInMillis) {
    return moment(+dateInMillis).format("YYYY-MM-DD");
  }

  // Open calendar when clicking anywhere in the row (image included)
  function handleClick() {
    document.querySelector(`#${props.name}`).click();
  }

  return (
    <div className={styles.container} style={props.style}>
      <label className={styles.label} htmlFor={props.name}>
        {props.label}
      </label>
      <div className={styles.row} onClick={handleClick}>
        <DatePicker
          className={styles.plain}
          selected={new Date(+props.value)}
          onChange={props.onChange}
          name={props.name}
          id={props.name}
          disabled={!props.editable}
          dateFormat="dd/MM/yyyy"
        />
        <div className={styles.calendar_icon}>
          <img
            src={calendar}
            alt="Calendar icon"
            className={styles.calendar_icon_image}
          />
        </div>
      </div>
    </div>
  );
};

DateInput.defaultProps = {
  value: new Date().valueOf(),
  editable: true,
};

export default DateInput;
