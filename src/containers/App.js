import React, { Component } from "react";
import "./App.css";
import AlteredText from "../components/AlteredText/AlteredText";
import CustomChanges from "../components/CustomChanges/CustomChanges";
import CustomChar from "../components/CustomChar/CustomChar";
import Checkboxes2 from "../components/Checkboxes2/Checkboxes2";
import Auxiliary from "../hoc/Auxiliary";
import Header from "../components/Header/Header.js";
import Toolbar from "./Toolbar/Toolbar.js";
import MainContent from "./MainContent/MainContent.js";
import Textarea from "../components/Textarea/Textarea";
import SummaryOfChange from "../components/SummaryOfChange/SummaryOfChange.js";
import Button2 from "../components/Button2/Button2.js";

class App extends Component {
  state = {
    customWordKeys: [],
    customWordValues: [],

    getTextReplacedAsArr: [],

    standardCharsMapObject: new Map(),

    arrForSummaryOfChange: {},

    mapObject: new Map(),

    styles: "h2M",

    pUnderTextarea: "",

    arrUnderTextarea: [],

    buttonWasClicked: false,
    buttonWasClicked2: true,

    newText: "",

    boxChecked: {
      "ß ss": false,
      "ä ae Ä Ae": false,
      "ö oe Ö Oe": false,
      "ü ue Ü Ue": false
    },

    customBoxChecked: false,

    customChar: {
      toBeReplaced: "",
      replacing: ""
    },
    value: {
      toBeReplaced: "",
      replacing: ""
    },

    wordValue: {
      toBeReplaced: "",
      replacing: ""
    },
    customWordAppendix: [",", ";", ".", ":", "-"],

    wordValueArr: [],

    isTyping: false,

    isTransformBtnDisabled: true,

    isClipboardBtnDisabled: true,
    clipboardBtnLabel: "Copy to Clipboard",

    standardCheckboxes: [
      {
        label: <span>ä &#8594; ae</span>,
        value: ["ä", "ae", "Ä", "Ae"],
        nbrForStatus: 0
      },
      {
        label: <span>ö &#8594; oe</span>,
        value: ["ö", "oe", "Ö", "Oe"],
        nbrForStatus: 0
      },
      {
        label: <span>ü &#8594; ue</span>,
        value: ["ü", "ue", "Ü", "Ue"],
        nbrForStatus: 0
      },
      {
        label: <span>ß &#8594; ss</span>,
        value: ["ß", "ss"],
        nbrForStatus: 0
      }
    ],
    textareaWidth: 59
  };

  logOut = () => {
    const w = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    // gets viewport height if needed 
    // const h = Math.max(
    //   document.documentElement.clientHeight,
    //   window.innerHeight || 0
    // );

    // for logging out the current viewport width & height
    // console.log("w: ", w, "h: ", h);
    if (w <= 500) {
      this.setState({
        textareaWidth: 35
      });
    }
  };

  componentDidMount() {
    this.logOut();
  }

  textareaOnChange = event => {
    const newPUnderTextarea = event.target.value;
    let isNotTransformable = true;
    if (newPUnderTextarea.length >= 1) {
      isNotTransformable = false;
    }

    this.setState({
      pUnderTextarea: newPUnderTextarea,
      buttonWasClicked: false,
      isTyping: true,
      isTransformBtnDisabled: isNotTransformable
    });
  };

  transformHandler = () => {
    const text = this.state.pUnderTextarea;
    const arr = text.split(" ");
    // maps array to check for matches, and if so, transfrom text + wrap them into span
    const newArr2 = arr.map((charElement, index, array) => {
      if (this.state.getTextReplacedAsArr.includes(charElement)) {
        let news = this.state.mapObject.get(charElement);
        return (
          <Auxiliary>
            <span>{news}</span>{" "}
          </Auxiliary>
        );
      } else {
        let charEl = `${charElement} `;
        return charEl.split("");
      }
    });

    const newArr3 = newArr2.map(el2 => {
      if (el2.type === "span") {
        return [el2];
      } else if (React.isValidElement(el2)) {
        return [el2];
      } else {
        return el2.map(el3 => {
          if (this.state.standardCharsMapObject.has(el3)) {
            return <span>{this.state.standardCharsMapObject.get(el3)}</span>;
          } else {
            return el3;
          }
        });
      }
    });

    // set arrUnderTextarea equal to that new array:
    this.setState({
      arrUnderTextarea: newArr3,
      buttonWasClicked: true,
      buttonWasClicked2: true,
      isTyping: false,
      isTransformBtnDisabled: true,
      isClipboardBtnDisabled: false,
      clipboardBtnLabel: "Copy to Clipboard"
    });
  };

  reTransformHandler = () => {
    const reTransformedText = this.state.pUnderTextarea;
    this.setState({
      arrUnderTextarea: reTransformedText,
      buttonWasClicked: false,
      styles: "h2M"
    });
  };

  joinWordWithAppendix = (word, arr) => {
    return arr.map(el => word + el);
  };

  handleMapPropChange = event => {
    // get string from left customInput:
    const customKey = event.target.value;
    const appendixChars = [...this.state.customWordAppendix];
    const customKeyArray = [
      customKey,
      ...this.joinWordWithAppendix(customKey, appendixChars)
    ];

    const wordValueCopy = {
      ...this.state.wordValue
    };
    wordValueCopy.toBeReplaced = event.target.value;

    this.setState({
      customWordKeys: customKeyArray,
      wordValue: wordValueCopy
    });
  };

  handleMapValueChange = event => {
    const customValue = `${event.target.value}`;
    const appendixChars = [...this.state.customWordAppendix];
    const customValueArray = [
      customValue,
      ...this.joinWordWithAppendix(customValue, appendixChars)
    ];

    const wordValueCopy = {
      ...this.state.wordValue
    };
    wordValueCopy.replacing = event.target.value;

    this.setState({
      customWordValues: customValueArray,
      wordValue: wordValueCopy
    });
  };

  handleSubmitForCustomChanges = event => {

    event.preventDefault();
    const peterpan = { ...this.state.wordValue };
    const newWords = [...this.state.wordValueArr];
    newWords.push(peterpan);
    const keyValueArray = [
      ...this.state.customWordKeys,
      ...this.state.customWordValues
    ];

    const wordValueCopy = {
      ...this.state.wordValue
    };

    wordValueCopy.toBeReplaced = "";
    wordValueCopy.replacing = "";

    // adding code path:
    const getTextReplacedAsArrCopy = [...this.state.getTextReplacedAsArr];
    const getTextReplacedNewRun = [...this.state.customWordKeys];
    const searchForAndReplace = getTextReplacedAsArrCopy.concat(
      getTextReplacedNewRun
    );

    let newMap = this.state.mapObject;
    for (let i = 0; i < keyValueArray.length / 2; i++) {
      newMap.set(keyValueArray[i], keyValueArray[keyValueArray.length / 2 + i]);
    }
    this.setState({
      mapObject: newMap,
      getTextReplacedAsArr: searchForAndReplace,
      customBoxChecked: true,
      wordValue: wordValueCopy,
      wordValueArr: newWords
    });
  };

  handleChangeCustomChar = (targetId, event) => {
    const customCharCopy = {
      ...this.state.customChar
    };
    customCharCopy[targetId] = event.target.value;

    const valueCopy = {
      ...this.state.value
    };
    valueCopy[targetId] = event.target.value;

    this.setState({
      customChar: customCharCopy,
      value: valueCopy
    });
  };

  checkboxesCharHandler = (value, index) => {
    const inputArray = value;                 // gets strings from checkbox & puts them into an array
    if (!this.state.boxChecked[value]) {      // if uses the adding code
      let newMap = new Map(this.state.standardCharsMapObject);
      for (let i = 0; i <= inputArray.length - 1; i = i + 2) {
        newMap.set(inputArray[i], inputArray[i + 1]);
      }

      // get copy
      const newStandardCheckboxes = [...this.state.standardCheckboxes];
      if (index >= 0) {
        newStandardCheckboxes[index].nbrForStatus = value.length / 2; // disables btn
      }

      this.setState({
        standardCharsMapObject: newMap,
        standardCheckboxes: newStandardCheckboxes
      });
    } else {        // else uses the removing code
      let newMap = this.state.standardCharsMapObject;
      for (let i = 0; i <= inputArray.length - 1; i = i + 2) {
        newMap.delete(inputArray[i], inputArray[i + 1]);
      }
      // get copy of value
      let copyOne = {
        ...this.state.boxChecked
      };
      // change copy + update state
      copyOne[value] = false;

      this.setState({
        boxChecked: copyOne,
        standardCharsMapObject: newMap
      });
    }
  };

  handleCharDeletion = (inputMap, index) => {
    let newMap = new Map(this.state.standardCharsMapObject);
    newMap.delete(inputMap.replaced, inputMap.replacing);
    // get copy
    const newStandardCheckboxes = [...this.state.standardCheckboxes];
    const getIdx = newStandardCheckboxes.findIndex(el => {
      return el.value.includes(inputMap.replaced);
    });
    // change copy + update
    if (getIdx !== -1) {
      newStandardCheckboxes[getIdx].nbrForStatus =
        newStandardCheckboxes[getIdx].nbrForStatus - 1;

    }

    this.setState({
      standardCharsMapObject: newMap,
      standardCheckboxes: newStandardCheckboxes
    });
  };

  handleWordDeletion = mapObject => {     // removing code path
    const customWordAppendCopy = [...this.state.customWordAppendix];
    const joinedStr = customWordAppendCopy.map(
      el => `${mapObject.toBeReplaced}${el}`
    );
    const fullyJoined = [mapObject.toBeReplaced, ...joinedStr];
    let newMap = this.state.mapObject;

    const logit = el => {
      newMap.delete(el);
    };
    fullyJoined.forEach(logit);

    const getTextReplacedAsArrCopy = [...this.state.getTextReplacedAsArr];
    const wordsToReplace = getTextReplacedAsArrCopy.filter(
      el => (el = !fullyJoined.includes(el))
    );

    const newWordValueArrCopy = [...this.state.wordValueArr];
    const shortenedWordArr = newWordValueArrCopy.filter(el => {
      return el.toBeReplaced !== mapObject.toBeReplaced;
    });

    this.setState({
      mapObject: newMap,
      getTextReplacedAsArr: wordsToReplace,
      wordValueArr: shortenedWordArr
    });
  };

  handleSubmitCustomChar = event => {
    event.preventDefault();
    const charPair = {
      // get char input object from state
      ...this.state.customChar
    };

    const valueCopy = {
      ...this.state.value
    };
    valueCopy.toBeReplaced = "";
    valueCopy.replacing = "";

    const charArray = Object.values(charPair).map(c => c.toLowerCase());
    const charArrayUppercase = charArray.map(c => c.toUpperCase());   // add strings to consider capitalized chars too
    const inputArray = charArray.concat(charArrayUppercase);  // build the inputArray for checkboxesCharHandler
    this.checkboxesCharHandler(inputArray);

    this.setState({
      value: valueCopy
    });
  };

  copyToClipboardHandlers = () => {
    let newText = document.getElementById("changedTextarea").innerHTML;
    navigator.clipboard.writeText(newText).then(
      () => {
        // console.log("Async clipboard api: Copied text succesfully: ", newText);
      },
      err => {
        console.error(
          "Sorry, could not copy text to clipboard",
          err,
          "Text was: ",
          newText
        );
      }
    );

    this.setState({
      newText: newText,
      clipboardBtnLabel: "Copied successfully",
      isClipboardBtnDisabled: true
    });
  };

  render() {

    // fade out of green text styling
    if (this.state.buttonWasClicked && this.state.buttonWasClicked2) {
      setTimeout(() => {
        this.setState({
          styles: "h22M",
          buttonWasClicked2: false
        });
      }, 500);
    }

    let stringOrArrayForTxtarea = this.state.pUnderTextarea;
    if (this.state.buttonWasClicked) {
      let copyOfArrUnderTextarea = this.state.arrUnderTextarea;
      const altered = copyOfArrUnderTextarea.reduce((acc, curr) => {
        return acc.concat(curr);
      }, []);
      const getObjectVal = altered.map(el => {
        if (typeof el === "object") {
          if (typeof el.props.children === "object") {
            return el.props.children.map(item => {
              if (typeof item === "object") {
                return item.props.children;
              }
              return item;
            });
          }
          return el.props.children;
        } else {
          return el;
        }
      });

      const tester = element => {
        if (typeof element === "object") {
          if (element[0] === undefined) {
            return;
          } else {
            return element;
          }
        } else {
          return element;
        }
      };

      const getObjectValWithoutUndef = getObjectVal.filter(tester);
      const getObjectValFlat = getObjectValWithoutUndef.reduce((acc, curr) => {
        return acc.concat(curr);
      }, []);
      const joinArray = getObjectValFlat.join("");
      const joinArrayTrimmed = joinArray.trim();  // removes whitespaces at start/end of text
      stringOrArrayForTxtarea = joinArrayTrimmed;
    }

    let changedOutput = this.state.pUnderTextarea;
    if (this.state.buttonWasClicked) {
      changedOutput = this.state.arrUnderTextarea;
    }

    return (
      <div className="App">
        <Header />
        <Toolbar>
          <Checkboxes2
            boxWasChecked={this.checkboxesCharHandler}
            checkboxesData={this.state.standardCheckboxes}
          />
          <CustomChar
            valueLeft={this.state.value.toBeReplaced}
            valueRight={this.state.value.replacing}
            handleSubmit={this.handleSubmitCustomChar}
            handleChange={this.handleChangeCustomChar}
          />
          <CustomChanges
            valueLeft={this.state.wordValue.toBeReplaced}
            valueRight={this.state.wordValue.replacing}
            handleMapPropChange={this.handleMapPropChange}
            handleMapValueChange={this.handleMapValueChange}
            handleSubmit={this.handleSubmitForCustomChanges}
          />
        </Toolbar>
        <MainContent>
          <Textarea
            textareaWidth={this.state.textareaWidth}
            changed={this.textareaOnChange}
            isTyping={this.state.isTyping}
            value={stringOrArrayForTxtarea}
            clicked={this.reTransformHandler}
            clicked2={this.scrollHandler}
            ident="changedTextarea"
            transformClick={this.transformHandler}
            disabledStat={this.state.isTransformBtnDisabled}
          />
          <SummaryOfChange
            characters={this.state.standardCharsMapObject}
            words={this.state.mapObject}
            arrForRenderingChangedWords={this.state.wordValueArr}
            handleDeletionForChar={this.handleCharDeletion}
            handleDeletionForWord={this.handleWordDeletion}
            forMethodTesting={this.state.forMethodTesting}
          />
        </MainContent>
        <AlteredText
          styling={this.state.styles}
          ident="newText"
          content={changedOutput}
          isTransformed={this.state.buttonWasClicked}
          callScrollHandler={this.scrollHandler}
        />
        { !this.state.buttonWasClicked ? null : <Button2
                label={this.state.clipboardBtnLabel}
                clickHandler={this.copyToClipboardHandlers}
                isDisabled={this.state.isClipboardBtnDisabled}
        /> }
      </div>
    );
  }
}

export default App;