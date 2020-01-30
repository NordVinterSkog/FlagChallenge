import React from "react";

const GameModeSelect = props => {
  return (
    <div className="gameLenghtSelect">
      <h1>Pick game mode</h1>
      <button value={5} onClick={props.startGame}>
        Short game
      </button>
      <button value={20} onClick={props.startGame}>
        Long game
      </button>
    </div>
  );
};

export default GameModeSelect;
