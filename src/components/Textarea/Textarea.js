import React from 'react';
import styles from "./Textarea.module.css";

const textarea = props => {
    return (
        <div className={[props.isTyping ? "" : styles.tooltip, styles.textarea].join(" ")} >
            <span className={styles.tooltiptext}>{props.isTyping ? null : <span>Click &amp; insert text to begin or restart text transformation</span>}</span>
            <textarea
                cols={props.textareaWidth}
                rows="12"
                onChange={props.changed}
                onClick={props.clicked}
                value={props.value}
                id={props.ident}
            />
        </div>
    );
};

export default textarea;