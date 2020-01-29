import React from "react";

const Answers = props => {
  console.log(props.answers);
  let answers = props.answers.map(answer => (
    <button onClick={props.pickAnswer} value={answer} key={answer}>
      {answer}
    </button>
  ));
  return <div>{answers}</div>;
};

export default Answers;
