import React from "react";
import "./GameModeSelect.css";

const GameModeSelect = props => {
  return (
    <div className="gameLenghtSelect">
      <button className="back" onClick={props.startOver}>
        Back
      </button>
      <h1>Choose game mode.</h1>
      <div className="buttons">
        <button value={5} onClick={props.startGame}>
          Short
        </button>
        <button value={20} onClick={props.startGame}>
          Long
        </button>
      </div>
    </div>
  );
};

export default GameModeSelect;
