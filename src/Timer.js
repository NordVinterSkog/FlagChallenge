import React from "react";
const Timer = props => {
  let time = props.time;
  setTimeout(() => (time = time - 1), 1000);
  return <h1>{time}</h1>;
};

export default Timer;
