import React from "react";

const checkboxes = props => {
    return (
        <div>
            <div>
                <input type="checkbox" id="check_ss" value={"ß ss"} onClick={props.clicked} />ß &#8594; ss   | 
                <input type="checkbox" id="check_ae" value={"ä ae Ä Ae"} onClick={props.clicked} />ä &#8594; ae  
            </div>
            <div>
                <input type="checkbox" id="check_oe" value={"ö oe Ö Oe"} onClick={props.clicked} />ö &#8594; oe  |
                <input type="checkbox" id="check_ue" value={"ü ue Ü Ue"} onClick={props.clicked} />ü &#8594; ue
            </div>
        </div>
    );  
};

export default checkboxes;