import React from "react";

const Answers = props => {
  console.log(props.answers);
  let answers = props.answers.map(answer => (
    <button onClick={props.pickAnswer} value={answer} key={answer}>
      {answer}
    </button>
  ));
  return (
    <div className="rightPanel">
      {answers}
      <button className="back" onClick={props.startOver}>
        Back
      </button>
    </div>
  );
};

export default Answers;
