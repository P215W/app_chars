import React from "react";
import styles from "./Checkbox.module.css";
import Button2 from "../../Button2/Button2.js";

const checkbox = props => {
  return (
    <div className={styles.checkbox}>
      {/* <button onClick={props.checked} disabled={props.disabledStatus}>{props.label}</button> */}
      <Button2
        label={props.label}
        clickHandler={props.checked}
        isDisabled={props.disabledStatus}
      />
    </div>
  );
};

export default checkbox;
