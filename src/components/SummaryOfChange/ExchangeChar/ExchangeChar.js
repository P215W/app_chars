import React from "react";
import Button2 from "../../Button2/Button2.js";
import styles from "./ExchangeChar.module.css";

const exchangeChar = props => {
  return (
    <div className={styles.exchangeChar}>
      <span>
        {props.toBeReplaced} &#8594; {props.replacing}
      </span>
      <Button2
        label="Exclude"
        clickHandler={props.handleDeletionForChar}
        isDisabled={false}
      />
    </div>
  );
};

export default exchangeChar;
