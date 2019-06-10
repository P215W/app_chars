import React from "react";

const exchangeWord = props => {
    return(
        <p>{props.toBeReplaced} &#8594; {props.replacing}</p>
    );
}

export default exchangeWord;