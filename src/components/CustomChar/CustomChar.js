import React from "react"; 

const customChar = props => {

    return(
        <div>
            <p>Custom Char</p>
            <input type="text" onChange={props.changed.bind(this, "toBeReplaced")} />
            &#8594;
            <input type="text" onChange={props.changed.bind(this, "replacing")} />
            <input type="checkbox" onClick={props.clicked} />
        </div> 
    );
}

export default customChar;