import React, { Component } from "react";
import "./App.css";
import SelectScreen from "./SelectScreen";
import Answers from "./Answers";
import GameModeSelect from "./GameModeSelect";
import Timer from "./Timer";

class App extends Component {
  state = {
    ready: false,
    database: "",
    answers: [],
    correctAnswer: "",
    index: 0,
    result: "",
    points: 0,
    round: 0,
    time: "",
    timer: "",
    howManyFlags: "",
    timeout: false
  };
  shuffle = a => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  selectWorldPart = e => {
    console.log(e.target.value);
    if (e.target.value !== "world") {
      console.log(e.target.value);
      fetch(`https://restcountries.eu/rest/v2/region/${e.target.value}?fields=name;flag
    `)
        .then(results => {
          return results.json();
        })
        .then(data => {
          let database = data;
          this.shuffle(database);
          this.setState({ database });
          console.log(this.state.database);
          console.log(this.state.ready);
        });
      return;
    } else {
    }
    fetch(`https://restcountries.eu/rest/v2/all?fields=name;flag`)
      .then(results => {
        return results.json();
      })
      .then(data => {
        let database = data;
        this.shuffle(database);
        this.setState({ database });
        console.log(this.state.database);
      });
  };

  startOver = () => {
    this.setState({
      ready: false,
      database: "",
      answers: [],
      correctAnswer: "",
      index: 0,
      result: "",
      points: 0,
      round: 0,
      time: "",
      timer: "",
      howManyFlags: "",
      timeout: false
    });
  };

  startGame = e => {
    console.log(e.target.value);
    this.setState({
      ready: true,
      howManyFlags: e.target.value,
      time: e.target.value * 4,
      timer: e.target.value * 4
    });
    this.renderAnswers();
  };

  pickAnswer = e => {
    console.log(e.target.value);
    let result =
      e.target.value === this.state.correctAnswer.name ? "DOBRZE!" : "ŹLE!";
    let points =
      e.target.value === this.state.correctAnswer.name
        ? this.state.points + 1
        : this.state.points - 1;
    this.setState({
      result,
      points
    });
    this.renderAnswers();
  };

  renderAnswers = () => {
    let round = this.state.round;
    let database = this.state.database;
    let correctAnswer = database.shift();

    let answers = [];
    for (let i = 0; i < 3; i++) {
      let answer = database[Math.floor(Math.random() * database.length)].name;
      answers.push(answer);
    }
    answers.push(correctAnswer.name);
    this.shuffle(answers);

    round++;
    this.setState({
      answers,
      correctAnswer,
      round
    });
  };

  render() {
    console.log(this.state.ready);
    console.log(this.state.time);
    return (
      <wrapper>
        <div className="mainScreen">
          {this.state.database.length >= 1 ? (
            this.state.ready ? (
              this.state.round > this.state.howManyFlags ||
              this.state.timeout ? (
                <div className="endGame">
                  <div>Koniec</div>
                  <div>
                    Score: {this.state.points}/{this.state.howManyFlags}
                  </div>
                  <button onClick={this.startOver}>Jeszcze raz.</button>
                </div>
              ) : (
                //MAIN GAME SCREEN

                <div className="Game">
                  <Timer time={this.state.time} />
                  <h1>
                    ({this.state.round}/{this.state.howManyFlags})Pick correct
                    country.
                  </h1>
                  <img src={this.state.correctAnswer.flag} alt="" />
                  <div>{this.state.result}</div>
                  <Answers
                    answers={this.state.answers}
                    pickAnswer={this.pickAnswer}
                  />
                </div>
              )
            ) : (
              <GameModeSelect startGame={this.startGame} />
            )
          ) : (
            <SelectScreen
              selectWorldPart={this.selectWorldPart}
              renderAnswers={this.renderAnswers}
            />
          )}
        </div>
        <footer>
          <div>
            Icons made by{" "}
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
        </footer>
      </wrapper>
    );
  }
}

export default App;
