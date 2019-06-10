import React from "react";
import ExchangeChar from "./ExchangeChar/ExchangeChar";
import ExchangeWord from "./ExchangeWord/ExchangeWord";

const summaryOfChange = props => {

    // CHARS-mapObject to Array for mapping within JSX
    const arrForSummaryOfChange = [];
    props.characters.forEach((value, key, map) => {
        arrForSummaryOfChange.push({replaced: key, replacing: value});
    });
    console.log("arrForSummaryOfChange: ", arrForSummaryOfChange);

    return(
        <div>
            <h2>You will exchange these characters:</h2>
            <div>{arrForSummaryOfChange.map((element, index) => (
                <ExchangeChar key={`${element.replaced+index}`} toBeReplaced={element.replaced} replacing={element.replacing} />
            ))}
            </div>
            <h2>These words will be exchanged:</h2>
            <div>{props.arrForRenderingChangedWords.map((element, index) => (
                <ExchangeWord key={`${element.toBeReplaced}+${index}`} toBeReplaced={element.toBeReplaced} replacing={element.replacing} />
            ))}
            </div>
        </div>
    );
}

export default summaryOfChange;