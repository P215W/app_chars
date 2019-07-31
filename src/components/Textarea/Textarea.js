import React from "react";
import Button2 from "../Button2/Button2";
import styles from "./Textarea.module.css";

const textarea = props => {
  return (
    <div
      className={[props.isTyping ? "" : styles.tooltip, styles.textarea].join(
        " "
      )}
    >
      <span className={styles.tooltiptext}>
        {props.isTyping ? null : (
          <span>
            Click &amp; insert text to begin or restart text transformation
          </span>
        )}
      </span>
      <textarea
        cols={props.textareaWidth}
        onChange={props.changed}
        onClick={props.clicked}
        value={props.value}
        id={props.ident}
      />
      <div>
        <Button2
          label="Transform text"
          clickHandler={props.transformClick}
          isDisabled={props.disabledStat}
        />
      </div>
    </div>
  );
};

export default textarea;
