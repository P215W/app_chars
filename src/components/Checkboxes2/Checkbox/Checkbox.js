import React from 'react';

const checkbox = props => {
    return (
        <div>
            <label>{props.label}</label>
            <input type="checkbox" onClick={props.checked} />
        </div> 
    );
};

export default checkbox;