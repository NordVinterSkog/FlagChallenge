import React from "react";
import "./GameOver.css";

const GameOverScreen = props => {
  let correctAnswers = props.correctAnswers.map(answer => (
    <div className="correctAnswer" key={answer.name}>
      <img src={answer.flag} alt="" />
      {answer.name}
    </div>
  ));
  return (
    <div className="gameOver">
      <div className="results">
        <div>Game over.</div>
        <div>Score: {props.finalScore}%</div>
        <button onClick={props.startOver}>Start over.</button>
      </div>

      <div className="correctAnswers">{correctAnswers}</div>
    </div>
  );
};

export default GameOverScreen;
