import React, { Component } from "react";
import "./App.css";
import Textarea from "../components/Textarea/Textarea";
import Checkboxes from "../components/Checkboxes/Checkboxes";
import Button from "../components/Button/Button";
import AlteredText from "../components/AlteredText/AlteredText";
import CustomChanges from "../components/CustomChanges/CustomChanges";
import Checkboxes2 from "../components/Checkboxes2/Checkboxes2";

class App extends Component {
  state = {
    wishedChar: [{ replaced: "a", by: "AA" }, { replaced: "b", by: "BB" }],

    getTextReplacedAsArr: [],

    standardCharsMapObject: new Map(),

    mapObject: new Map(),

    transformBtn: "Transform text",

    stringToArray: [],

    stylezzM: "h2M",

    stylezz2: "h22",

    anotherStateProperty: "Value not to be touched!",

    preTextarea: [],

    isTextTransformed: false,

    charForChange: [], // regExp: /[äöüß]/gi,

    pUnderTextarea: "",

    arrUnderTextarea: [],

    buttonWasClicked: false,
    buttonWasClicked2: true,

    newText: ""
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
    const newArr2 = arr.map(charElement => {
      if (this.state.getTextReplacedAsArr.includes(charElement)) {
        /* return <span>{this.state.mapObject.get(charElement)} </span> before: there was a space between charElement and </span */
        // let foundWord = [charElement];
        // foundWord = [...foundWord, this.state.mapObject.get(charElement)];
        // let news = foundWord.split("");
        // return <span>{foundWord}</span>
        let news = this.state.mapObject.get(charElement);
        console.log(`Die ${news} besagen heute, dass.`);


        return <span>{news} </span>; // (  // *5: all this comments refer to making the replaced word highlight solely, so without highlightung the whitespace as well.  strategy: 1) decoment, aka. put the first span in a wreapping span, which includes a whitespace after the first span. but you then only highlight the innner span. 2) to ghighligh only the iner span, you have to give it a className. 3) Adjust the while h22M style thing, aka. the method which hast the setTimeout.
        // return (
        //   <span><span className={this.state.stylezzM}>{news}</span> </span>
        // );
      } else {
        let charEl = `${charElement} `;
        return charEl.split("");
      }
    });

    console.log("newArr2: ", newArr2);

    const newArr3 = newArr2.map(el2 => {
      if (el2.type === "span") {
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
      stylezzM: "h2M"
    });
  };

  createMapObject = event => {
    // get the text from left (replaced) and right (by) field:
    const getTextReplaced = this.state.getTextReplaced;
    const getTextReplacedAsArr = getTextReplaced.split(); // before was .split (" ")
    // other one:
    const getTextBy = this.state.getTextBy;
    // const getTextByAsArr = getTextBy.split(" ");
    // getTextByAsArr.push(" ");

    const copyMap = this.state.mapObject;
    const newMap = copyMap.set(getTextReplaced, getTextBy);
    // just as a test
    this.setState({
      mapObject: newMap,
      getTextReplacedAsArr: getTextReplacedAsArr
    });
    console.log("mapObject: ", this.state.mapObject);
  };

  mapPropHandler = event => {
    // get the text from left fiereld
    const mapProp = event.target.value;
    // set the text to state
    this.setState({
      getTextReplaced: mapProp
    });
  };

  mapValueHandler = event => {
    const mapValue = `${event.target.value}`; // before there was a space here.
    // set the text to state
    this.setState({
      getTextBy: mapValue
    });
  };

  //works down here: 
  // checkboxesHandlerAddingChars = (event, index) => {
  //   // get the value of the checbox
  //   console.log("EVENT: ", event);
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
    // get the value of the checkbox
    const inputArray = value.split(" ");
    let copyMap = this.state.standardCharsMapObject;
    let newMap;
    for (let i = 0; i <= inputArray.length - 1; i = i + 2) {
      newMap = copyMap.set(inputArray[i], inputArray[i + 1]);
    }
    this.setState({
      standardCharsMapObject: newMap
    });
  };

  copyToClipboardHandlers = () => {
    let text = document.getElementById("newText").innerHTML;
    let newText = text.replace(/(<span>)|(<\/span>)/g, "");
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
- apply nice css style for everything.
- avoid highlithign whitespaces: search for *5 in this file here.
- make tesxtarea changeable, meaining after chaning the text, u can type into the textarea and trigger a change again
*/

    // fade out of the styling
    if (this.state.buttonWasClicked && this.state.buttonWasClicked2) {
      setTimeout(() => {
        this.setState({
          stylezzM: "h22M",
          buttonWasClicked2: false
        });
      }, 500);
    }

    let stringOrArrayForTxtarea = this.state.pUnderTextarea;
    if (this.state.buttonWasClicked) {
      console.log(typeof this.state.arrUnderTextarea);
      console.log(this.state.arrUnderTextarea);
      let copyOfArrUnderTextarea = this.state.arrUnderTextarea;
      console.log("original: ", copyOfArrUnderTextarea);
      const altered = copyOfArrUnderTextarea.reduce((acc, curr) => {
        return acc.concat(curr);
      }, []);
      console.log("altered: ", altered);
      const getObjectVal = altered.map(el => {
        if (typeof el === "object") {
          return el.props.children;
        } else {
          return el;
        }
      });
      console.log("getObjectVal: ", getObjectVal);
      const joinArray = getObjectVal.join("");
      console.log("joinArray: ", joinArray, "----");
      stringOrArrayForTxtarea = joinArray;
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
        />
        <Checkboxes2 boxWasChecked={this.checkboxesHandlerAddingChars} />
        <CustomChanges
          clickedForMap={this.createMapObject}
          mapPropChanged={this.mapPropHandler}
          mapValueChanged={this.mapValueHandler}
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
          styling={this.state.stylezzM}
          ident="newText"
          content={changedOutput}
        />
      </div>
    );
  }
}

export default App;
