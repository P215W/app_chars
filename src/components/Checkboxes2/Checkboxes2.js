import React from "react";
import Button2 from "../Button2/Button2.js";
import styles from "./Checkboxes2.module.css";

const checkboxes = props => {
  return (
    <div className={styles.checkboxes}>
      <p>Replace Characters</p>
      <div className={styles.checkboxesInRow}>
        {props.checkboxesData.map((c, index) => (
          <Button2
            key={c.value}
            label={c.label}
            isDisabled={c.nbrForStatus === c.value.length / 2 ? true : ""}
            clickHandler={props.boxWasChecked.bind(this, c.value, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default checkboxes;
