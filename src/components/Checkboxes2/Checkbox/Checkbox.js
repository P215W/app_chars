import React from 'react';

const checkbox = props => {
    return (
        <div>
            <label>{props.label}</label>
            <button onClick={props.checked} disabled={props.disabledStatus}>Add</button>
        </div> 
    );
};

export default checkbox;