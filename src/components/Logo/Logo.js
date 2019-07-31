import React from "react";
import AELogo from "../../assets/AElogo.png";
import styles from "./Logo.module.css";

const logo = props => {
  return (
    <div className={styles.logo}>
      <img src={AELogo} alt="SpecChar App - " />
    </div>
  );
};

export default logo;
