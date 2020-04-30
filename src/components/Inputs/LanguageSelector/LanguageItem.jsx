import React from "react";
import { Row } from "../../Flex/Row";

import cross from "../../../assets/img/cross.jpg";

export const LanguageItem = (props) => {
  function handleClick() {
    props.onDelete(props.language);
  }

  return (
    <Row
      style={{
        border: "1px solid #acacac",
        borderRadius: "5rem",
        padding: "5px",
        alignItems: "center",
        marginRight: "5px",
      }}
    >
      <img
        src={props.language.lang_image}
        alt="Language flag"
        style={{ width: "25px", marginRight: "10px" }}
      />
      <span style={{ marginRight: "10px" }}>
        {props.language.lang_description}
      </span>
      {props.editable && (
        <img
          src={cross}
          alt="Delete icon"
          style={{ width: "15px", cursor: "pointer" }}
          onClick={handleClick}
        />
      )}
    </Row>
  );
};
