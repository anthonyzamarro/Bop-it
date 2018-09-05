import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import Instructions from './Instructions.js';
// import Scores from './scores.js';
import StartGame from './start-game.js';


class App extends Component {
  render() {
    return (
      <div>
        <h1> Bop It! </h1>
        <h2> Can you keep up? </h2>
        <StartGame />
        <Instructions />
      </div>
    );
  }
}

export default App;
