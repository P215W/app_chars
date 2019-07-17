import React from "react";
// import Checkbox from "./Checkbox/Checkbox";
import Button2 from "../Button2/Button2.js";
import styles from "./Checkboxes2.module.css";

const checkboxes = props => {

  return (
    <div className={styles.checkboxes}>
      <label>Replace Characters
      <div className={styles.checkboxesInRow}>
        {props.checkboxesData.map((c, index) => (
          // <Checkbox
          //   key={c.value}
          //   label={c.label}
          //   value={c.value}
          //   disabledStatus={c.nbrForStatus === c.value.length/2 ? true : ""}
          //   checked={props.boxWasChecked.bind(this, c.value, index)}
          // />
          <Button2
            key={c.value}
            label={c.label}
            isDisabled={c.nbrForStatus === c.value.length/2 ? true : ""}
            clickHandler={props.boxWasChecked.bind(this, c.value, index)}
        />
        ))}
      </div>
      </label>
    </div>
  );
};

export default checkboxes;
