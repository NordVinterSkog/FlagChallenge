import React, { Component } from "react";
import "./App.css";
import SelectScreen from "./SelectScreen";
import Answers from "./Answers";

class App extends Component {
  state = {
    ready: false,
    database: "",
    answers: [],
    correct: "",
    index: 0,
    result: ""
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
      });
  };

  startGame = () => {
    this.setState({
      ready: true
    });
    console.log(this.state.index);
    this.renderAnswers();
  };

  pickAnswer = e => {
    console.log(e.target.value);
    let result =
      e.target.value === this.state.correct.name ? "DOBRZE!" : "ŹLE!";
    this.setState({
      result
    });
    this.renderAnswers();
  };

  renderAnswers = () => {
    let index = this.state.index;
    let database = this.state.database;
    let correct = database[index];

    let answers = [];
    for (let i = 0; i < 3; i++) {
      answers.push(database[Math.floor(Math.random() * database.length)].name);
    }
    answers.push(this.state.database[this.state.index].name);
    this.shuffle(answers);

    console.log(correct);
    index++;
    this.setState({
      answers,
      correct,
      index
    });

    console.log(this.state.index);
  };

  render() {
    console.log(this.state.answers);
    return (
      <div className="mainScreen">
        {this.state.database.length >= 1 ? (
          this.state.ready ? (
            <div className="Game">
              <h1>{this.state.index}Pick correct country.</h1>
              <img src={this.state.correct.flag} alt="" />
              <div>{this.state.result}</div>
              <Answers
                answers={this.state.answers}
                pickAnswer={this.pickAnswer}
              />
            </div>
          ) : (
            <button onClick={this.startGame}>START</button>
          )
        ) : (
          <SelectScreen
            selectWorldPart={this.selectWorldPart}
            renderAnswers={this.renderAnswers}
          />
        )}
      </div>
    );
  }
}

export default App;
