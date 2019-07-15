import React from "react";
import Checkbox from "./Checkbox/Checkbox";

const checkboxes = props => {

  return (
    <div>
      {props.checkboxesData.map((c, index) => (
        <Checkbox
          key={c.value}
          label={c.label}
          value={c.value}
          disabledStatus={c.nbrForStatus === c.value.length/2 ? true : ""}
          checked={props.boxWasChecked.bind(this, c.value, index)}
        />
      ))}
      <p>{props.checkboxesData[0].active}</p>
    </div>
  );
};

export default checkboxes;
