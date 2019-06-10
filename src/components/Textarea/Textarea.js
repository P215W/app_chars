import React from 'react';
import styles from "./Textarea.module.css";

const textarea = (props) => {
    return (
        <div className={props.isTyping ? "" : styles.tooltip}>
            <span className={styles.tooltiptext}>{props.isTyping ? null : <span>Not done yet?<br />Click and type to re-start text transformation.</span>}</span>
            <textarea
                placeholder="Insert text here"
                cols="100"
                rows="20"
                onChange={props.changed}
                onClick={props.clicked}
                value={props.value}
                id={props.ident}
            />
        </div>
    );
};

export default textarea;