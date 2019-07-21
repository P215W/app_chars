import React from "react";
import Button2 from "../../Button2/Button2.js";

const checkbox = props => {
  return (
    <div>
      <Button2
        label={props.label}
        clickHandler={props.checked}
        isDisabled={props.disabledStatus}
      />
    </div>
  );
};

export default checkbox;
