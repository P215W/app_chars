import React from "react";
import styles from "./CustomChanges.module.css";

const customChanges = props => {
  return (
    <div className={styles.customChanges}>
      <form>
        <p>Replace Words</p>
        <div>
          <input
            type="text"
            id="val0a"
            placeholder="to be replaced"
            size="9"
            value={props.valueLeft}
            onChange={props.handleMapPropChange}
          />{" "}
          &#8594;{" "}
          <input
            type="text"
            id="val0b"
            placeholder="replacing"
            size="9"
            value={props.valueRight}
            onChange={props.handleMapValueChange}
          />
          <input
            type="submit"
            value="Add"
            id="check_free"
            onClick={props.handleSubmit}
            disabled={props.valueLeft.length <= 0 ? true : ""}
          />
        </div>
      </form>
    </div>
  );
};

export default customChanges;
