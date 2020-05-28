import React from "react";

import styles from "./ProfilePicture.module.css";

const ProfilePicture = (props) => {
  return (
    <div className={styles.container} style={props.style}>
      <div
        className={styles.profileImageContainer}
      >
        <img
          src={props.image}
          alt="Profile picture"
          className={styles.profileImage}
        />
      </div>
      <label htmlFor="file-upload">
        <div className={styles.iconContainer}>
          <img
            src={props.icon}
            alt={props.iconAlt}
            className={styles.iconImage}
          />
        </div>
      </label>
      <input
        onChange={props.onChange}
        style={{ display: "none" }}
        id="file-upload"
        type="file"
        disabled={!props.editable}
      />
    </div>
  );
};

ProfilePicture.defaultProps = {
  editable: true
}

export default ProfilePicture;
