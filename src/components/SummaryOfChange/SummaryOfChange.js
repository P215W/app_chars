import React from "react";
import ExchangeChar from "./ExchangeChar/ExchangeChar";
import ExchangeWord from "./ExchangeWord/ExchangeWord";

const summaryOfChange = props => {
  // CHARS-mapObject to Array for mapping within JSX

  const arrForSummaryOfChangeChars = [];
  props.characters.forEach((value, key, map) => {
    arrForSummaryOfChangeChars.push({ replaced: key, replacing: value });
  });
  console.log("arrForSummaryOfChange: ", arrForSummaryOfChangeChars);

  // words down here
  const arrForSummaryOfChangeWords = [];
  props.words.forEach((value, key, map) => {
    arrForSummaryOfChangeWords.push({ replaced: key, replacing: value });
  });
  console.log("arrForSummaryOfChangeChars: ", arrForSummaryOfChangeChars);
  // end

  return (
    <div>
      <h2>You will exchange these characters:</h2>
      <div>
        {arrForSummaryOfChangeChars.map((element, index) => (
          <ExchangeChar
            key={`${element.replaced}+${index}`}
            toBeReplaced={element.replaced}
            replacing={element.replacing}
            handleDeletionForChar={props.handleDeletionForChar.bind(this, element, index)}
          />
        ))}
      </div>
      <h2>These words will be exchanged:</h2>
      <div>
        {props.arrForRenderingChangedWords.map((element, index) => (
          <ExchangeWord
            key={`${element.toBeReplaced}+${index}`}
            toBeReplaced={element.toBeReplaced}
            replacing={element.replacing}
            handleDeletionForWord={props.handleDeletionForWord.bind(this, element)}
          />
        ))}
      </div>
    </div>
  );
};

export default summaryOfChange;
