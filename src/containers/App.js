import React, { Component } from "react";
import "./App.css";
import Button from "../components/Button/Button";
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

    transformBtn: "Transform text",

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

    standardCheckboxes: [
      // {
      //   label: <span>ß &#8594; ss</span>,
      //   value: ["ß", "ss"],
      //   nbrForStatus: 0
      // },
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
    textareaWidth: 68
  };

  logOut = () => {
      const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      console.log("w: ", w, "h: ", h);
      if (w <= 500) {
        this.setState({
          textareaWidth: 35
        });
      }
  };


  
  componentDidMount () {
    this.logOut();
  };

  textareaOnChange = event => {
    const newPUnderTextarea = event.target.value;

    this.setState({
      pUnderTextarea: newPUnderTextarea,
      buttonWasClicked: false,
      isTyping: true
    });
  };

  transformHandler = () => {
    const text = this.state.pUnderTextarea;
    const arr = text.split(" ");
    // maps array to check for matches, and if so, transfrom text + wrap them inot span
    const newArr2 = arr.map((charElement, index, array) => {
      if (this.state.getTextReplacedAsArr.includes(charElement)) {
        // if (this.state.getTextReplacedAsArr.includes(array[index+1])) { ..
        /* return <span>{this.state.mapObject.get(charElement)} </span> before: there was a space between charElement and </span */
        // let foundWord = [charElement];
        // foundWord = [...foundWord, this.state.mapObject.get(charElement)];
        // let news = foundWord.split("");
        // return <span>{foundWord}</span>
        console.log("this.state.getTextReplacedAsArr", this.state.getTextReplacedAsArr);
        console.log("charElement: ", charElement);
        let news = this.state.mapObject.get(charElement);
        console.log("news: ", news);
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
    console.log("arrUnderTextarea: ", this.state.arrUnderTextarea);

    // set arrUnderTextarea equal to that new array
    this.setState({
      arrUnderTextarea: newArr3,
      buttonWasClicked: true,
      buttonWasClicked2: true,
      transformBtn: "RE-transform text",
      isTyping: false
    });
  };

  reTransformHandler = () => {
    const reTransformedText = this.state.pUnderTextarea;
    this.setState({
      arrUnderTextarea: reTransformedText,
      buttonWasClicked: false,
      transformBtn: "Transform text",
      styles: "h2M"
    });
  };

  clickhandlerTest = () => {
    console.log("CLICK geht hier");
    this.reTransformHandler();
    console.log(this.state);
  };

  joinWordWithAppendix = (word, arr) => {
    return arr.map(el => word + el);
  };

  handleMapPropChange = event => {
    // get string from left customInput
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

    console.log("customKeyArray: ", customKeyArray);
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
    console.log("customValueArray: ", customValueArray);

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
    // get the text from left (replaced / key) and right (by / value) input:
    // const getTextReplaced = this.state.getTextReplaced;
    // const getTextReplacedAsArr = getTextReplaced.split(); // before was .split (" ")
    // let getTextBy = this.state.getTextBy;

    event.preventDefault();
    // copy
    const peterpan = {...this.state.wordValue};
    const newWords = [...this.state.wordValueArr];
    // change
    newWords.push(peterpan);
    console.log("newWords: ", newWords);

    // update

    // problem: ich unpdate getTextRepalceasArr nicht. daher wier die zweite linke seite beim
    // suchen nicht miterstezt. 

    console.log("getTextReplacedAsArr 1st one: ", this.state.getTextReplacedAsArr);
    console.log("this.state.wordValueArr: ", this.state.wordValueArr);

    const keyValueArray = [
      ...this.state.customWordKeys,
      ...this.state.customWordValues
    ];

    const wordValueCopy = {
      ...this.state.wordValue
    };

    wordValueCopy.toBeReplaced = "";
    wordValueCopy.replacing = "";
 
      // adding code path
      console.log("adderCustomWord meldet sich");
      const getTextReplacedAsArrCopy = [
        ...this.state.getTextReplacedAsArr
      ];
      const getTextReplacedNewRun = [...this.state.customWordKeys];
      const searchForAndReplace = getTextReplacedAsArrCopy.concat(getTextReplacedNewRun);
      console.log("searchForAndReplace: ", searchForAndReplace);

      let newMap = this.state.mapObject;
      for (let i = 0; i < keyValueArray.length / 2; i++) {
        newMap.set(
          keyValueArray[i],
          keyValueArray[keyValueArray.length / 2 + i]
        );
      }
      console.log("createdNewWordMap: ", newMap);
      this.setState({
        mapObject: newMap,
        getTextReplacedAsArr: searchForAndReplace,
        customBoxChecked: true,
        wordValue: wordValueCopy,
        wordValueArr: newWords
      });
    // } 
    // else {
    //   // removing code path
    //   console.log("removerCustom meldet sich");
    //   const getTextReplacedAsArr = [];

    //   let newMap = this.state.mapObject;
    //   for (let i = 0; i < keyValueArray.length / 2; i++) {
    //     newMap.delete(
    //       keyValueArray[i],
    //       keyValueArray[keyValueArray.length / 2 + i]
    //     );
    //   }
    //   console.log("createNewMapAfterDel: ", newMap);
    //   this.setState({
    //     mapObject: newMap,
    //     getTextReplacedAsArr: getTextReplacedAsArr,
    //     customBoxChecked: false
    //   });
    // }
  };

  //works down here:
  // checkboxesHandlerAddingChars = (event, index) => {
  //   // get the value of the checbox
  //   const inputArray = event.target.value.split(" ");
  //   // let copyOfStandardCharsMapObject = this.state.standardCharsMapObject;

  //   let copyMap = this.state.standardCharsMapObject;
  //   let newMap;
  //   for (let i = 0; i <= inputArray.length - 1; i = i + 2) {
  //     newMap = copyMap.set(inputArray[i], inputArray[i + 1]);
  //   }
  //   this.setState({
  //     standardCharsMapObject: newMap
  //   });
  // };

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
    const inputArray = value; // gets strings from checkbox and puts them into an array
    // if uses the adding code
    if (!this.state.boxChecked[value]) {
      console.log("ADDING code meldet sich", value);
      console.log("index: ", index);
      let newMap = new Map (this.state.standardCharsMapObject);
      console.log("newMapPRE: ", newMap);
      for (let i = 0; i <= inputArray.length - 1; i = i + 2) {
        newMap.set(inputArray[i], inputArray[i + 1]);
      }
      console.log("newMapPOST: ", newMap);

      // get copy
      const newStandardCheckboxes = [...this.state.standardCheckboxes];
      if (index >= 0) {
        console.log("ARSCH DU!!!!!!!!!", index);
        newStandardCheckboxes[index].nbrForStatus = value.length/2;  // disables btn
        console.log("value.length/2: ", value.length/2);
      }

      this.setState({
        standardCharsMapObject: newMap,
        standardCheckboxes: newStandardCheckboxes
      });
      console.log(
        "standardCharsMapObject: ",
        this.state.standardCharsMapObject
      );
      // console.log("boxChecked " + value + " " + this.state.boxChecked[value]);
    } else {
      // else uses the removing code
      console.log("REMOVING code meldet sich");
      let newMap = this.state.standardCharsMapObject;
      // let newMap = new Map();
      console.log("newMapPRE: ", newMap);
      for (let i = 0; i <= inputArray.length - 1; i = i + 2) {
        newMap.delete(inputArray[i], inputArray[i + 1]);
      }
      console.log("newMapPOST: ", newMap);

      // get copy of value
      let copyOne = {
        ...this.state.boxChecked
      };
      // change the copy
      copyOne[value] = false;
      // update state with the copy
      console.log(copyOne);
      this.setState({
        boxChecked: copyOne,
        standardCharsMapObject: newMap
      });
      console.log(
        "standardCharsMapObject: ",
        this.state.standardCharsMapObject
      );
      // console.log("boxChecked " + value + " " + this.state.boxChecked[value]);
    }
  };

  handleCharDeletion = (inputMap, index) => {
      // else uses the removing code
      console.log("REMOVING code meldet sich");
      console.log("inputMap: ", inputMap);
      console.log("index: ", index);
      // let newMap = this.state.standardCharsMapObject;
      let newMap = new Map(this.state.standardCharsMapObject);
      console.log("newMapPRE: ", newMap);
      newMap.delete(inputMap.replaced, inputMap.replacing);
      console.log("newMapPOST: ", newMap);
      // get copy
      const newStandardCheckboxes = [...this.state.standardCheckboxes];
      const getIdx = newStandardCheckboxes.findIndex(el => {
        console.log("el: ", el);
        return el.value.includes(inputMap.replaced);
      });
      console.log("getIdx: ", getIdx);
      // change copy + update
      if (getIdx !== -1) {
        newStandardCheckboxes[getIdx].nbrForStatus = newStandardCheckboxes[getIdx].nbrForStatus - 1;
        console.log("newStandardCheckboxes[index].nbrForStatus: ", newStandardCheckboxes[getIdx].nbrForStatus);
      }
      this.setState({
        standardCharsMapObject: newMap,
        standardCheckboxes: newStandardCheckboxes
      });
      console.log(
        "standardCharsMapObject: ",
        this.state.standardCharsMapObject
      );
      // console.log("boxChecked " + value + " " + this.state.boxChecked[value]);
  }

  handleWordDeletion = mapObject => {
      // removing code path
      console.log("removerCustom meldet sich");
      console.log("mapObject: ", mapObject);
      console.log("mapObject.toBeReplaced: ", mapObject.toBeReplaced);
      console.log("this.state.mapObject: ", this.state.mapObject);

      // customWordAppendix: [",", ";", ".", ":", "-"],
      const customWordAppendCopy = [...this.state.customWordAppendix];
      const joinedStr = customWordAppendCopy.map(el => `${mapObject.toBeReplaced}${el}`);
      const fullyJoined = [mapObject.toBeReplaced, ...joinedStr];
      console.log("joinedStr: ", fullyJoined);
      let newMap = this.state.mapObject;
      console.log("createNewMapBEFOREDel: ", newMap);

      const logit = el => {
        console.log("elementjoinedYstr: ", el);
        newMap.delete(el);
      };
      fullyJoined.forEach(logit);

      // HIER ist es
      const getTextReplacedAsArrCopy = [...this.state.getTextReplacedAsArr];
      const wordsToReplace = getTextReplacedAsArrCopy.filter(
        el => (el = !fullyJoined.includes(el))
      );
      console.log("wordsToReplace: ", wordsToReplace);
      // HIER endet es

      // const keyValueArray = [
      //   ...this.state.customWordKeys,
      //   ...this.state.customWordValues
      // ];
      // console.log("keyValueArray: ", keyValueArray);
      // const getTextReplacedAsArr = [];

      // let newMap = this.state.mapObject;
      // for (let i = 0; i < keyValueArray.length / 2; i++) {
      //   newMap.delete(
      //     keyValueArray[i],
      //     // mapObject.toBeReplaced,
      //     keyValueArray[keyValueArray.length / 2 + i]
      //     // mapObject.replacing
      //   );


      const newWordValueArrCopy = [...this.state.wordValueArr];
            // }
            console.log("newWordValueArrCopy: ", newWordValueArrCopy);
      const shortenedWordArr = newWordValueArrCopy.filter(el => {
        console.log("el: ", el);
        return el.toBeReplaced !== mapObject.toBeReplaced;
      });
      console.log("shortenedWordArr: ", shortenedWordArr);

      this.setState({
        mapObject: newMap,
        getTextReplacedAsArr: wordsToReplace,
        wordValueArr: shortenedWordArr
      });
    }

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
    const charArrayUppercase = charArray.map(c => c.toUpperCase()); // add strings to consider capitalized chars too
    const inputArray = charArray.concat(charArrayUppercase); // build the inputArray for the method call
    this.checkboxesCharHandler(inputArray);

    this.setState({
      value: valueCopy
    });
  };

  copyToClipboardHandlers = () => {
    let newText = document.getElementById("changedTextarea").innerHTML;
    // let newText = text.replace(/(<span>)|(<\/span>)/g, "");
    // let newTextTrimmed = newText.trim();
    navigator.clipboard.writeText(newText).then(
      () => {
        console.log("Async clipboard api: Copied text succesfully: ", newText);
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
      newText: newText
    });
  };

  render() {
    /* ideas for transformText App:
    - problem wit the del -word- button: apparently i only delete the replacingWith-part (aka the right-side) of the word-pair, but not the toBeReplaced-part (aka the left-side). so thats why the wrd gets still replaced after clicking "Del", but it gets replaced with an empty space.
    so wquwasrion: question : how does the word replacement actually work?
- show a summary box (like order modal in app, btu constatnyl shown) where user sees chars/words and can remove some of the list
- apply nice css style for everything.
*/
    console.log("this.state.mapObject: ", this.state.mapObject);
    // fade out of the styling
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
      console.log(typeof this.state.arrUnderTextarea);
      let copyOfArrUnderTextarea = this.state.arrUnderTextarea;
      console.log("original: ", copyOfArrUnderTextarea);
      const altered = copyOfArrUnderTextarea.reduce((acc, curr) => {
        return acc.concat(curr);
      }, []);
      console.log("altered: ", altered);
      const getObjectVal = altered.map(el => {
        console.log("EL: ", el);
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
      console.log("getObjectVal: ", getObjectVal);
      // flatten the array from getObjectVal because additional arrays
      // will lead to commas in transformed text seen in the textarea

      const tester = element => {
        if (typeof element === "object") {
          console.log(element);
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
      console.log(getObjectValWithoutUndef);

      const getObjectValFlat = getObjectValWithoutUndef.reduce((acc, curr) => {
        return acc.concat(curr);
      }, []);
      console.log("getObjectValFlat: ", getObjectValFlat);
      const joinArray = getObjectValFlat.join("");
      const joinArrayTrimmed = joinArray.trim(); // removes whitespaces at start/end of text
      console.log("joinArray: ", joinArray, "----");
      stringOrArrayForTxtarea = joinArrayTrimmed;
    }

    let changedOutput = this.state.pUnderTextarea;
    if (this.state.buttonWasClicked) {
      changedOutput = this.state.arrUnderTextarea;
      console.log("changedOutput: ", changedOutput);
    }

    let btnHandler = this.transformHandler;
    if (this.state.buttonWasClicked) {
      btnHandler = this.reTransformHandler;
    }

    return (
      <div className="App">
        <Header />
        <Toolbar>
          <Checkboxes2 boxWasChecked={this.checkboxesCharHandler} checkboxesData={this.state.standardCheckboxes} />
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
            clicked={this.clickhandlerTest}
            ident="changedTextarea"
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
        {/* <Button label={this.state.transformBtn} clicked={btnHandler} />
        <Button
          label="Copy to Clipboard"
          clicked={this.copyToClipboardHandlers}
        /> */}
        <Button2
          label={this.state.transformBtn}
          clickHandler={btnHandler}
          isDisabled={false}
        />
        <Button2
          label="Copy to Clipboard"
          clickHandler={this.copyToClipboardHandlers}
          isDisabled={false}
        />
        <AlteredText
          styling={this.state.styles}
          ident="newText"
          content={changedOutput}
        />
      </div>
    );
  }
}

export default App;
