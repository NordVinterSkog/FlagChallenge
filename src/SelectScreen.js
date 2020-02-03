import React from "react";
import africa from "./img/africa.png";
import america from "./img/america.png";
import australia from "./img/australia.png";
import asia from "./img/asia.png";
import europe from "./img/europe.png";
import world from "./img/world.png";
import "./SelectScreen.css";

const SelectScreen = props => {
  return (
    <div className="selectScreen">
      <h1>Choose a category!</h1>
      <button value="Europe" onClick={props.selectWorldPart}>
        Europe
        <img src={europe} alt="europe" value="Europe" />
      </button>
      <button value="Africa" onClick={props.selectWorldPart}>
        Africa <img src={africa} alt="" />
      </button>
      <button value="Asia" onClick={props.selectWorldPart}>
        Asia
        <img src={asia} alt="" />
      </button>
      <button value="Americas" onClick={props.selectWorldPart}>
        Americas
        <img src={america} alt="" />
      </button>
      <button value="Oceania" onClick={props.selectWorldPart}>
        Oceania
        <img src={australia} alt="" />
      </button>
      <button value="world" onClick={props.selectWorldPart}>
        World
        <img src={world} alt="" />
      </button>
    </div>
  );
};

export default SelectScreen;
