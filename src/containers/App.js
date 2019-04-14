import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor (props) {
    console.log("[App.js] constructor");
    super(props);
  }

  state = {

    persons: [
      { key: "agfhghgh", name: "Marc", age: 30 },
      { key: "agfhghgh2", name: "Anna", age: 25 },
      { key: "agfhghgh3", name: "Paul", age: 3 }
    ],

    personasState: false,

    anotherStateProperty: "Value not to be touched!",

    textarea: "4",

    preTextarea: "",

    isTextTransformed: false,

    charForChange: [], // regExp: /[äöüß]/gi,

  }

  togglePersonasHandler = () => {
    let doesShow = this.state.personasState;
    this.setState( {personasState: !doesShow} );
  }

  switchNameHandler = (name) => {
    console.log("was klicked");
    this.setState( {
      persons: [
        { name: name, age: 30 },
        { name: "Anna", age: 20 },
        { name: "Paul", age: 3 }
      ]
    } );
  }

  nameChangedHandler = (event, index) => {
    console.log("Eventmeta", event.target);
    console.log("indexxx", index);
    this.setState({
      persons: [
        { key: "agfhghgh", name: event.target.value, age: 30 },
        { key: "agfhghgh2", name: "Anna", age: 25 },
        { key: "agfhghgh3", name: "Paul", age: 3 }
      ]
    });
  }

  removePersonHandler = (index) => {
    // remove the person from the array
    const copyPersonas = [...this.state.persons];
    const newPersonas = copyPersonas.slice(0, index).concat(copyPersonas.slice(index+1));
    this.setState({
      persons: newPersonas
    })
  }

  textareaHandler = (event) => {
    console.log("textareaHandler was called!!!");
    this.setState({
      textarea: event.target.value
    });
  }

  /*  works here 
  transformHandler = (event) => {
    const text = this.state.textarea;
    const textTransformed = text.replace(/[äöüß]/gi, (str) => {
      switch (str) {
        case "ß":
          return "ss";
        case "Ö":
          return "Oe";
        case "ö":
          return "oe";
        case "Ä":
          return "Ae";
        case "ä":
          return "ae";
        case "Ü":
          return "Ue";  
        case "ü":
          return "ue";  
        default:
          break;
      }
    });
    this.setState({
      textarea: textTransformed
    })
  }
  */

 transformHandler = (event, prevState) => {
   console.log("ich transformiere dies: ", this.state.charForChange);
   if (!this.state.isTextTransformed) {
    const text = this.state.textarea;
    let charForChange = this.state.charForChange.join(''); // es fehlen die brackets!! []
  // maybe add here join/split to make array into string
    let charForChangeWithBrackets = `[${charForChange}]`;
    let toReplace = new RegExp(charForChangeWithBrackets, "gi");
    console.log("Klappt es mit join??", toReplace); 
    const textTransformed = text.replace(toReplace, (str) => {
      switch (str) {
        case "ß":
          return "ss";
        case "Ö":
          return "Oe";
        case "ö":
          return "oe";
        case "Ä":
          return "Ae";
        case "ä":
          return "ae";
        case "Ü":
          return "Ue";  
        case "ü":
          return "ue";  
        default:
          break;
      }
    });
    this.setState({
      textarea: textTransformed,
      preTextarea: text,
      isTextTransformed: true
    });
  } else {
    console.log(this.state.isTextTransformed);
    console.log(this.state.textarea);
    this.setState((prevState) => {
      console.log("hier?", prevState);
      return { 
        textarea: prevState.preTextarea, // prevState.textarea,
        isTextTransformed: false
      };
    });
  }
 };

 checkboxHandler = (event) => {
    console.log("checkboxH", event.target); // ist dsa targt einfach undefinded weil ich jetz 2 targetss habe ? 
    console.log(event.target.value);  // exp "ß"
    let copyChar = [...this.state.charForChange];
    let expandedChar = [...copyChar, event.target.value];
    /*
    this.setState((prevState, event) => {
    return {
     charForChange: [...this.charForChange, event.target.value]
    }
   });
   */
  this.setState({
    charForChange: expandedChar
  });
  console.log("neue chars", this.state.charForChange);
 }
 


  copyToClipboardHandlers = () => {
    let text = document.getElementById("t-area").value;
    navigator.clipboard.writeText(text).then(() => {
      console.log("Async clipboard api: Copied text succesfully: ", text);
      }, (err) => {
      console.error("Sorry, could not copy text to clipboard", err, "Text was: ", text); 
    });
  };

  
  static getDerivedStateFromProps (props, state) {
    console.log("[App.js] getDerivedStateFromProps");
    return state;
  }

  // render ()
  componentDidMount () {
    console.log("[App.js] componentDidMount");
  } 
  
  render() {
    console.log("[App.js] render");
   

    const style = {
      "color": "green",
      ":hover": {
        "color": "red",
        "font-size": "10px"
      },
      "@media (minWidth: 400px)": {
          "font-size": "50px"
      }
    }



    let btnText = "Transform";
    if (this.state.isTextTransformed) {
      btnText = "Transform back to original";
    }

/* ideas for transformText App:
- learn how to deploy changes
- create file txt file (via node? via next? ) that can be downloaded directly by user 
- apply nice css style for everything.
- show changes of lettes with css color effects
*/

    return (
      
        <div className="App">
          <p><textarea id="t-area" type="text" cols="90" rows="18" value={this.state.textarea} onChange={this.textareaHandler} /></p>
          <p>ß -> ss:<input type="checkbox" id="check_ss" value="ß" onClick={this.checkboxHandler}></input>
          ä -> ae:<input type="checkbox" id="check_ae" value="äÄ" onClick={this.checkboxHandler}></input>
          ö -> oe:<input type="checkbox" id="check_oe" value="öÖ" onClick={this.checkboxHandler}></input>
          ü -> ue:<input type="checkbox" id="check_ue" value="üÜ" onClick={this.checkboxHandler}></input>
          </p>
          <p>{this.state.textarea}</p>
          <button onClick={this.transformHandler}>{btnText}</button>
          <button onClick={this.copyToClipboardHandlers}>copyToClipboard</button>
        </div>
    );
  }
} 

export default App;