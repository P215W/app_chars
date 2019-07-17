import React from "react";
import styles from "./CustomChar.module.css";

const customChar = props => {
  return (
    <div className={styles.customChar}>
      <form>
        <label>Replace More Char's
        <div>
          <input
            type="text"
            maxLength="1"
            size="9"
            placeholder="to be replaced"
            value={props.valueLeft}
            onChange={props.handleChange.bind(this, "toBeReplaced")}
          />
        &#8594;
        <input
          type="text"
          maxLength="20"
          size="9"
          placeholder="replacing"
          value={props.valueRight}
          onChange={props.handleChange.bind(this, "replacing")}
        />
        <input
          type="submit"
          value="Add"
          onClick={props.handleSubmit}
          disabled={props.valueLeft.length <= 0 ? true : ""}
        />
        </div>
        </label>
      </form>
    </div>
  );
};

export default customChar;
