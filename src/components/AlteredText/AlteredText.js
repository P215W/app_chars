import React from "react";
import styles from "./AlteredText.module.css";

const alteredText = props => {
  return (
    <div className={[props.styling, styles.alteredText].join(" ")} id={props.ident} key={props.ident}>
      {props.content}
    </div>
  );
};

export default alteredText;
