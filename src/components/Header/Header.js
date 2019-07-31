import React from "react";
import Logo from "../../components/Logo/Logo.js";
import styles from "./Header.module.css";

const header = props => {
  return (
    <div className={styles.header}>
      <Logo />
      <div>
        Exchange characters and words in any text and copy &amp; paste the new
        text
      </div>
    </div>
  );
};

export default header;
