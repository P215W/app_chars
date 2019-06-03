import React, { Component } from "react";
import "./App.css";
import Textarea from "../components/Textarea/Textarea";
import Button from "../components/Button/Button";
import AlteredText from "../components/AlteredText/AlteredText";
import CustomChanges from "../components/CustomChanges/CustomChanges";
import Checkboxes2 from "../components/Checkboxes2/Checkboxes2";
import Auxiliary from "../hoc/Auxiliary";

class App extends Component {
  state = {
    
    customWordKeys: [],
    customWordValues: [],

    getTextReplacedAsArr: [],

    standardCharsMapObject: new Map(),

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

    isCustomInputDisabled: true,
    
    customWordAppendix: [",", ";", ".", ":", "-"]

  };

  textareaOnChange = event => {
    const newPUnderTextarea = event.target.value;

    this.setState({
      pUnderTextarea: newPUnderTextarea,
      buttonWasClicked: false
    });
  };

  transformHandler = () => {
    const text = this.state.pUnderTextarea;
    const arr = text.split(" ");
    // maps array to check for matches, and if so, transfrom text + wrap them inot span
    const newArr2 = arr.map((charElement, index, array) => {
      console.log("charElement: ", charElement);
      console.log("state.getTextReplacedAsArr: ", this.state.getTextReplacedAsArr);
      if (this.state.getTextReplacedAsArr.includes(charElement)) {
        // if (this.state.getTextReplacedAsArr.includes(array[index+1])) { ..
        /* return <span>{this.state.mapObject.get(charElement)} </span> before: there was a space between charElement and </span */
        // let foundWord = [charElement];
        // foundWord = [...foundWord, this.state.mapObject.get(charElement)];
        // let news = foundWord.split("");
        // return <span>{foundWord}</span>
        let news = this.state.mapObject.get(charElement);
        return <Auxiliary><span>{news}</span> </Auxiliary>;
      } else {
        let charEl = `${charElement} `;
        return charEl.split("");
      }
    });

    console.log("newArr2: ", newArr2);

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
      transformBtn: "RE-transform text"
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
    console.log(this.state);
  };

  joinWordWithAppendix = (word, arr) => {
    return arr.map(el => word + el);
  };

  mapPropHandler = event => {
    // get string from left customInput
    const customKey = event.target.value;
    const appendixChars = [...this.state.customWordAppendix];
    const customKeyArray = [
      customKey, 
      ...this.joinWordWithAppendix(customKey, appendixChars)
    ];
    console.log("customKeyArray: ", customKeyArray);
    this.setState({
      customWordKeys: customKeyArray,
      isCustomInputDisabled: event.target.value.length <= 0
    });
  };

  // works down here
  // mapPropHandler = event => {
  //   // get text from left input
  //   const mapProp = event.target.value;
  //   console.log("mapProp: ", mapProp);
  //   // set the text to state
  //   this.setState({
  //     getTextReplaced: mapProp,
  //     isCustomInputDisabled: event.target.value.length <= 0
  //   });
  //   console.log("neuer State 1?", this.state.getTextReplaced); 
  // };

  mapValueHandler = event => {
    const customValue = `${event.target.value}`;
    const appendixChars = [...this.state.customWordAppendix];
    const customValueArray = [
      customValue, 
      ...this.joinWordWithAppendix(customValue, appendixChars)
    ];
    console.log("customValueArray: ", customValueArray);
    this.setState({
      customWordValues: customValueArray,
    });
  };

  createMapObject = event => {
      // get the text from left (replaced / key) and right (by / value) input:
      // const getTextReplaced = this.state.getTextReplaced;
      // const getTextReplacedAsArr = getTextReplaced.split(); // before was .split (" ")
      // let getTextBy = this.state.getTextBy;

    const keyValueArray = [...this.state.customWordKeys, ...this.state.customWordValues];

    if (!this.state.customBoxChecked) {   // adding code path
      console.log("addercustom meldt sich");
      const getTextReplacedAsArr = [...this.state.customWordKeys];

      let newMap = this.state.mapObject;
      for (let i = 0; i < keyValueArray.length / 2; i++) {
        newMap.set(keyValueArray[i], keyValueArray[keyValueArray.length / 2 + i]);
      }
      console.log("createNewMap: ", newMap); 
      this.setState({
        mapObject: newMap,
        getTextReplacedAsArr: getTextReplacedAsArr,
        customBoxChecked: true
      });
    } else {           // removing code path
        console.log("removerCustom meldet sich");
        const getTextReplacedAsArr = [];

        let newMap = this.state.mapObject;
        for (let i = 0; i < keyValueArray.length / 2; i++) {
          newMap.delete(keyValueArray[i], keyValueArray[keyValueArray.length / 2 + i]);
        }
        console.log("createNewMapAfterDel: ", newMap);
        this.setState({
          mapObject: newMap,
          getTextReplacedAsArr: getTextReplacedAsArr,
          customBoxChecked: false
        });
      }
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

  checkboxesHandlerAddingChars = value => {
    const inputArray = value.split(" ");  // gets strings from checkbox and puts them into an array
    // if uses the adding code
    if (!this.state.boxChecked[value]) {
      console.log("ADDING code meldet sich");
      let newMap = this.state.standardCharsMapObject;
      // let newMap = new Map();
      console.log("newMapPRE: ", newMap);
      for (let i = 0; i <= inputArray.length - 1; i = i + 2) {
        newMap.set(inputArray[i], inputArray[i + 1]);
      }
      console.log("newMapPOST: ", newMap);
  
      // get copy of value
      let copyOne = {
        ...this.state.boxChecked
      };
      // change the copy
      copyOne[value] = true;
      // update state with the copy
      console.log(copyOne);
      this.setState({
        boxChecked: copyOne,
        standardCharsMapObject: newMap
      });
      console.log("standardCharsMapObject: ", this.state.standardCharsMapObject);
      // console.log("boxChecked " + value + " " + this.state.boxChecked[value]);
    } else {     // else uses the removing code
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
        console.log("standardCharsMapObject: ", this.state.standardCharsMapObject);
        // console.log("boxChecked " + value + " " + this.state.boxChecked[value]);
    }
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

  // copyToClipboardHandlers = () => {
  //   let text = document.getElementById("newText").innerHTML;
  //   let newText = text.replace(/(<span>)|(<\/span>)/g, "");
  //   let newTextTrimmed = newText.trim();   // removes whitespaces at start/end of text
  //   navigator.clipboard.writeText(newTextTrimmed).then(
  //     () => {
  //       console.log("Async clipboard api: Copied text succesfully: ", newText);
  //     },
  //     err => {
  //       console.error(
  //         "Sorry, could not copy text to clipboard",
  //         err,
  //         "Text was: ",
  //         newText
  //       );
  //     }
  //   );

  //   this.setState({
  //     newText: newText
  //   });
  // };

  render() {
/* ideas for transformText App:
- make custom chars addable (like done already with customWords) 
- if new input comes in AFTER transform btn was clicked: textarea + buttontext + style must be changed as if we were in the pre-transformation-status
- apply nice css style for everything.
*/

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
          if (typeof(el.props.children) === "object") {
            return el.props.children.map(item => {
              if (typeof(item) === "object") {
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
        if(typeof(element) === "object") {
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

      const getObjectValFlat = getObjectValWithoutUndef
        .reduce((acc, curr) => {
            return acc.concat(curr);
        }, []);
      console.log("getObjectValFlat: ", getObjectValFlat);
      const joinArray = getObjectValFlat.join("");
      const joinArrayTrimmed = joinArray.trim();   // removes whitespaces at start/end of text
      console.log("joinArray: ", joinArray, "----");
      stringOrArrayForTxtarea = joinArrayTrimmed;
    }

    let changedOutput = this.state.pUnderTextarea;
    if (this.state.buttonWasClicked) {
      changedOutput = this.state.arrUnderTextarea;
    }

    let btnHandler = this.transformHandler;
    if (this.state.buttonWasClicked) {
      btnHandler = this.reTransformHandler;
    }

    return (
      <div className="App">
        <Textarea
          changed={this.textareaOnChange}
          value={stringOrArrayForTxtarea}
          clicked={this.clickhandlerTest}
          ident="changedTextarea"
        />
        <Checkboxes2 
          boxWasChecked={this.checkboxesHandlerAddingChars}
        />
        {/* <CustomChar /> */ }
        <CustomChanges
          clickedForMap={this.createMapObject}
          mapPropChanged={this.mapPropHandler}
          mapValueChanged={this.mapValueHandler}
          isCustomInputDisabled={this.state.isCustomInputDisabled}
        />
        <Button 
          label={this.state.transformBtn} 
          clicked={btnHandler}
        />
        <Button
          label="Copy to Clipboard!"
          clicked={this.copyToClipboardHandlers}
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
