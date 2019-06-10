import React from "react";

const exchangeChar = props => {
    return(
        <p>{props.toBeReplaced} &#8594; {props.replacing}</p>
    );
}


export default exchangeChar;