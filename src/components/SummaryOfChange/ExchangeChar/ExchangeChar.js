import React from "react";

const exchangeChar = props => {
    return(
        <div>
            <p>{props.toBeReplaced} &#8594; {props.replacing}</p>
            <button onClick={props.handleDeletionForChar}>Del</button>
        </div>

    );
}


export default exchangeChar;