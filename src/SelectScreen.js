import React from "react";

const SelectScreen = props => {
  return (
    <div className="selectScreen">
      <h1>Pick one</h1>
      <button value="Europe" onClick={props.selectWorldPart}>
        Europe
      </button>
      <button value="Africa" onClick={props.selectWorldPart}>
        Africa
      </button>
      <button value=""></button>
      <button value=""></button>
    </div>
  );
};

export default SelectScreen;
