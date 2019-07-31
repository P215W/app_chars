import React from "react";
import Button2 from "../../Button2/Button2.js";
import styles from "./ExchangeWord.module.css";

const exchangeWord = props => {
  return (
    <div className={styles.exchangeWord}>
      <p>
        {props.toBeReplaced} &#8594; {props.replacing}
      </p>
      <Button2
        label="Exclude"
        clickHandler={props.handleDeletionForWord}
        isDisabled={false}
      />
    </div>
  );
};

export default exchangeWord;
