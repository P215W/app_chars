import React from "react";

const exchangeWord = props => {
    return(
        <div>
            <p>{props.toBeReplaced} &#8594; {props.replacing}</p>
            <button onClick={props.handleDeletionForWord}>Del</button>
        </div>
    );
}

export default exchangeWord;