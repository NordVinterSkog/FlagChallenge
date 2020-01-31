import React, { Component } from "react";
import "./App.css";
import SelectScreen from "./SelectScreen";
import Answers from "./Answers";
import GameModeSelect from "./GameModeSelect";
import Timer from "./Timer";
import IntroScreen from "./IntroScreen";
import earth from "./img/earth.png";

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
    timeout: false,
    loaded: false
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
      e.target.value === this.state.correctAnswer.name
        ? "Good!"
        : `Wrong! It's ${this.state.correctAnswer.name}!`;
    let points = this.state.points;
    if (e.target.value === this.state.correctAnswer.name) {
      points++;
    }

    this.setState({
      result,
      points
    });
    this.renderAnswers();
  };

  timeOut = () => {
    this.setState({
      timeout: true
    });
  };

  renderAnswers = () => {
    let round = this.state.round;
    let index = this.state.index;
    let database = [...this.state.database];
    let correctAnswer = database[index];
    console.log(database);

    let answers = [];

    database.splice(index, 1);
    for (let i = 0; i < 3; i++) {
      let randomIndex = Math.floor(Math.random() * database.length);
      let answer = database[randomIndex].name;

      database.splice(randomIndex, 1);
      answers.push(answer);
    }
    answers.push(correctAnswer.name);
    this.shuffle(answers);
    console.log(database);
    console.log(this.state.database);
    index++;
    round++;
    this.setState({
      answers,
      correctAnswer,
      round,
      index
    });
  };

  introEnd = setTimeout(() => {
    this.setState({
      loaded: true
    });
  }, 2500);

  render() {
    console.log(this.state.time);
    let finalScore =
      (Number(this.state.points) / Number(this.state.howManyFlags)) * 100;

    return (
      <wrapper>
        <img className="globe" src={earth} alt="" />
        {this.state.loaded ? (
          <>
            <div className="mainScreen">
              {this.state.database.length >= 1 ? (
                this.state.ready ? (
                  this.state.round > this.state.howManyFlags ||
                  this.state.timeout ? (
                    //GAME OVER SCREEN

                    <div className="gameOver">
                      <div>Game over.</div>
                      <div>Score: {finalScore}%</div>
                      <button onClick={this.startOver}>Start over.</button>
                    </div>
                  ) : (
                    //MAIN GAME SCREEN

                    <div className="Game">
                      <div className="leftPanel">
                        {" "}
                        <h1>
                          ({this.state.round}/{this.state.howManyFlags}) Match a
                          country.
                        </h1>
                        <img src={this.state.correctAnswer.flag} alt="" />
                        <Timer time={this.state.time} timeout={this.timeOut} />
                        <div>{this.state.result}</div>
                      </div>
                      <div className="rightPanel">
                        {" "}
                        <Answers
                          answers={this.state.answers}
                          pickAnswer={this.pickAnswer}
                        />
                      </div>
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
                <a
                  href="https://www.flaticon.com/authors/freepik"
                  title="Freepik"
                >
                  Freepik
                </a>{" "}
                from{" "}
                <a href="https://www.flaticon.com/" title="Flaticon">
                  www.flaticon.com
                </a>
              </div>
            </footer>
          </>
        ) : (
          <IntroScreen />
        )}
      </wrapper>
    );
  }
}

export default App;
