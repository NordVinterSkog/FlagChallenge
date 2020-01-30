import React, { Component } from "react";

class Timer extends Component {
  state = {
    time: this.props.time
  };

  countdown = setInterval(() => {
    this.setState({
      time: this.state.time - 1
    });
  }, 1000);

  render() {
    if (this.state.time <= 0) {
      this.props.timeout(this.state.time);
      console.log(this.state.time);
      clearInterval(this.countdown);
      return null;
    } else return <h1>{this.state.time} seconds left.</h1>;
  }
}

export default Timer;
