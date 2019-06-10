import React from "react";

const customChar = props => {
  return (
    <div>
      <form>
        <label>
          Change Another Character:{" "}
          <input
            type="text"
            maxLength="1"
            size="10"
            placeholder="to be replaced"
            value={props.valueLeft}
            onChange={props.handleChange.bind(this, "toBeReplaced")}
          />
        </label>
        &#8594;
        <input
          type="text"
          maxLength="20"
          size="10"
          placeholder="replacing"
          value={props.valueRight}
          onChange={props.handleChange.bind(this, "replacing")}
        />
        <input
          type="submit"
          value="Add"
          onClick={props.handleSubmit}
          disabled={props.valueLeft.length <= 0 ? true : ""}
        />
      </form>
    </div>
  );
};

export default customChar;
