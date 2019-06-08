import React from "react"; 

const customChar = props => {

    return(
        <div>
            <p>Custom Char</p>
            <input type="text" maxLength="1" size="18" placeholder="Character to be replaced" onChange={props.changed.bind(this, "toBeReplaced")} />
            &#8594;
            <input type="text" maxLength="20" size="18" placeholder="Replacing characters" onChange={props.changed.bind(this, "replacing")} />
            <input type="checkbox" onClick={props.clicked} />
        </div> 
    );
}

export default customChar;