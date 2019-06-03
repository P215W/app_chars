import React from "react"; 

const customChar = props => {

    return(
        <div>
            <label>{props.label}</label>
            <input type="checkbox" onClick={props.checked} />
        </div> 
    );
}

export default customChar;