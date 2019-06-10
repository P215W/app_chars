import React from "react";
import styles from "./CustomChanges.module.css";

const customChanges = props => {
  return (
    <div className={styles.customChanges}>
      <form>
        <label>Change Word: {" "}
          <input type="text" id="val0a" placeholder="to be replaced" value={props.valueLeft} onChange={props.handleMapPropChange} />
        </label>
        &#8594;
        <input type="text" id="val0b" placeholder="replacing" value={props.valueRight} onChange={props.handleMapValueChange} />
        <input
          type="submit"
          value="Add"
          id="check_free"
          onClick={props.handleSubmit}
          disabled={props.valueLeft.length <= 0 ? true : ""}
        />
      </form>
    </div>
  );
};

export default customChanges;
