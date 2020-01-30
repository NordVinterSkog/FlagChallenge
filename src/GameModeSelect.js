import React from "react";
import "./GameModeSelect.css";

const GameModeSelect = props => {
  return (
    <div className="gameLenghtSelect">
      <h1>Pick game mode</h1>
      <div className="buttons">
        <button value={5} onClick={props.startGame}>
          Short game
        </button>
        <button value={20} onClick={props.startGame}>
          Long game
        </button>
      </div>
    </div>
  );
};

export default GameModeSelect;
