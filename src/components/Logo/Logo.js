import React from "react";
import AELogo from "../../assets/AElogo.png";
import styles from "./Logo.module.css";

const logo = props => {

    return (
        <div className={styles.logo}>
            <img src={AELogo} alt="SpecChar App - " />
        </div>
        // <img className={styles.logo} src={AELogo} alt="SpecChar App - " />
    );
};

export default logo;