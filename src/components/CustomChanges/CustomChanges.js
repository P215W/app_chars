import React from "react";
import styles from "./CustomChanges.module.css";

const customChanges = props => {
  return (
    <div className={styles.customChanges}>
      <p>Custom Word</p>
      <input type="text" id="val0a" onChange={props.mapPropChanged} />
      &#8594;
      <input type="text" id="val0b" onChange={props.mapValueChanged} />
      <input
        type="checkbox"
        id="check_free"
        disabled={props.isCustomInputDisabled ? true : ""}
        value=""
        onClick={props.clickedForMap}
      />
    </div>
  );
};

export default customChanges;
