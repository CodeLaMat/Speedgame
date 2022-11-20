import "./App.css";
import Circles from "./Circles";
import Modal from "./Modal";
import React, { Component } from "react";

import click from "./music/Click_sound.wav";
import start from "./music/game_start_sound.wav";
import highScore from "./music/high_score_sound.wav";
import ohNo from "./music/ohNo.mp3";
import medium from "./music/medium_score_sound.wav";

let clickSound = new Audio(click);
let startSound = new Audio(start);
let highScoreSound = new Audio(highScore);
let mediumSound = new Audio(medium);
let ohNoSound = new Audio(ohNo);

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends Component {
  state = {
    score: 0,
    circles: [1, 2, 3, 4],
    current: undefined,
    pace: 1000,
    gameOver: false,
    gameOn: false,
    rounds: 0,
    message: "",
  };
  timer;

  nextCircle = () => {
    let nextActive;
    do {
      nextActive = randomNumber(0, 3);
    } while (nextActive === this.state.current);
    console.log(nextActive);
    this.setState({
      current: nextActive,
      pace: this.state.pace * 0.98,
    });
    this.timer = setTimeout(this.nextCircle, this.state.pace);
  };

  startHandler = (event) => {
    startSound.play();
    this.nextCircle();
    this.setState({ gameOn: !this.state.gameOn });
  };

  stopHandler = () => {
    startSound.pause();
    clearTimeout(this.timer);
    this.setState({ gameOver: !this.state.gameOver });
    if (this.state.score === 0 && this.state.score <= 5) {
      ohNoSound.play();
      this.setState({
        message: "Are you so slow?. Let's try again.",
      });
    } else if (this.state.score >= 6 && this.state.score <= 10) {
      mediumSound.play();
      this.setState({
        message:
          "You did well. But I believe you can do better. Let's try again.",
      });
    } else if (this.state.score > 10) {
      highScoreSound.play();
      this.setState({
        message: "You are close to beat a record of all time.",
      });
    }
  };

  clickHandler = (i) => {
    clickSound.play();
    if (this.state.current === i) {
      this.setState({ score: this.state.score + 1 });
    } else if (this.state.rounds >= 3 && this.state.current !== i) {
      this.stopHandler();
      return;
    } else if (this.state.current !== i) {
      this.setState({ rounds: this.state.rounds + 1 });
    }
  };

  closeHandler = () => {
    this.setState({ gameOver: !this.gameOver });
    window.location.reload(false);
  };

  render() {
    return (
      <div className="App">
        <h1>Speedgame</h1>
        <div className="scoreBoard">
          <h4 id="scoreIs">Score: {this.state.score}</h4>
          <div>
            <h5 id="life">Round: {this.state.rounds}</h5>
          </div>
        </div>
        <div className="circle-container">
          {this.state.circles.map((circle, i) => {
            return (
              <div>
                <Circles
                  click={() => {
                    this.clickHandler(i);
                  }}
                  id={i + 1}
                  active={this.state.current === i}
                  display={this.state.gameOn}
                  key={i}
                />
              </div>
            );
          })}
        </div>
        {this.state.gameOver && (
          <Modal
            close={this.closeHandler}
            score={this.state.score}
            message={this.state.message}
          />
        )}
        <div className="buttons">
          <button
            type="button"
            className="startButton"
            onClick={this.startHandler}
          >
            Start game
          </button>
          <button
            type="button"
            className="stopButton"
            onClick={this.stopHandler}
          >
            End game
          </button>
        </div>
      </div>
    );
  }
}

export default App;
