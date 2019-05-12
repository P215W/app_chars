import React from "react";
import styles from "./CustomChanges.module.css";

const customChanges = props => {
  return (
    <div className={styles.customChanges}>
      <input
        type="checkbox"
        id="check_free"
        value=""
        onClick={props.clickedForMap}
      />
      <input type="text" id="val0a" onChange={props.mapPropChanged} />
      &#8594;
      <input type="text" id="val0b" onChange={props.mapValueChanged} />
    </div>
  );
};

export default customChanges;
