import React from 'react';
import styles from './Button.module.css';

const button = (props) => {
    return (
        <button className={styles.button} onClick={props.clicked}>{props.label}</button>
    );
};

export default button;