import React from 'react';

const textarea = (props) => {
    return (
        <textarea
            placeholder="Insert text here"
            cols="100"
            rows="20"
            onChange={props.changed}
            value={props.value}
        />
    );
};

export default textarea;