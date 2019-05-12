import React from 'react';
import Checkbox from "./Checkbox/Checkbox";

const checkboxesData = [
    { label: <span>ß &#8594; ss</span>, value: "ß ss" },
    { label: <span>ä &#8594; ae</span>, value: "ä ae Ä Ae"},
    { label: <span>ö &#8594; oe</span>, value: "ö oe Ö Oe"},
    { label: <span>ü &#8594; ue</span>, value: "ü ue Ü Ue" }
];

const checkboxes = props => {
    return (
        <div>
            {checkboxesData.map((c, index) => (
                <Checkbox key={c.value} label={c.label} value={c.value} checked={props.boxWasChecked.bind(this, c.value)} />
            ))}
        </div>
    );
};

export default checkboxes;