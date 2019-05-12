import React from "react";

const alteredText = props => {
  return (
    <div className={props.styling} id={props.ident}>
      {props.content}
    </div>
  );
};

export default alteredText;
