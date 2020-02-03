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
      <button id="Europe" onClick={props.selectWorldPart.bind(this)}>
        Europe
        <img src={europe} alt="europe" id="Europe" />
      </button>
      <button id="Africa" onClick={props.selectWorldPart}>
        Africa <img src={africa} id="Africa" alt="" />
      </button>
      <button id="Asia" onClick={props.selectWorldPart}>
        Asia
        <img src={asia} id="Asia" alt="" />
      </button>
      <button id="Americas" onClick={props.selectWorldPart}>
        Americas
        <img src={america} id="Americas" alt="" />
      </button>
      <button id="Oceania" onClick={props.selectWorldPart}>
        Oceania
        <img src={australia} id="Oceania" alt="" />
      </button>
      <button id="world" onClick={props.selectWorldPart}>
        World
        <img src={world} id="world" alt="" />
      </button>
    </div>
  );
};

export default SelectScreen;
