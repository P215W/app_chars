import React from "react";
import styles from "./MainContent.module.css";

const mainContent = props => {
  return <div className={styles.mainContent}>{props.children}</div>;
};

export default mainContent;
