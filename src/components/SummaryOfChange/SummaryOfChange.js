import React from "react";
import ExchangeChar from "./ExchangeChar/ExchangeChar";
import ExchangeWord from "./ExchangeWord/ExchangeWord";
import styles from "./SummaryOfChange.module.css";

const summaryOfChange = props => {
  // CHARS-mapObject to Array for mapping as JSX:
  const arrForSummaryOfChangeChars = [];
  props.characters.forEach((value, key, map) => {
    arrForSummaryOfChangeChars.push({ replaced: key, replacing: value });
  });

  // words down here:
  const arrForSummaryOfChangeWords = [];
  props.words.forEach((value, key, map) => {
    arrForSummaryOfChangeWords.push({ replaced: key, replacing: value });
  });

  return (
    <div className={styles.summaryOfChange}>
      <div className={styles.wordSummary}>
        <span>You'll exchange these characters:</span>
        {arrForSummaryOfChangeChars.length > 0 ? (
          <div className={styles.charCards}>
            {arrForSummaryOfChangeChars.map((element, index) => (
              <ExchangeChar
                key={`${element.replaced}+${index}`}
                toBeReplaced={element.replaced}
                replacing={element.replacing}
                handleDeletionForChar={props.handleDeletionForChar.bind(
                  this,
                  element,
                  index
                )}
              />
            ))}
          </div>
        ) : (
          <p>-</p>
        )}
      </div>
      <div>
        <span>You'll exchange these words:</span>
        {props.arrForRenderingChangedWords.length > 0 ? (
          <div className={styles.charCards}>
            {props.arrForRenderingChangedWords.map((element, index) => (
              <ExchangeWord
                key={`${element.toBeReplaced}+${index}`}
                toBeReplaced={element.toBeReplaced}
                replacing={element.replacing}
                handleDeletionForWord={props.handleDeletionForWord.bind(
                  this,
                  element
                )}
              />
            ))}
          </div>
        ) : (
          <p>-</p>
        )}
      </div>
    </div>
  );
};

export default summaryOfChange;
