import React, {Component} from 'react';
import BopIt from './bop-it.js';

class StartGame extends Component {
  constructor(props) {
    super(props);
      this.state ={
        startGame: false
      }
    this.gameStarted = this.gameStarted.bind(this);
  }
  gameStarted() {
    this.setState({
      startGame: true
    })
  }
  render() {
    return (
      <div>
        {this.state.startGame && <BopIt />}
        <input type="button" value="Play" onClick={this.gameStarted}/>
      </div>
    )
  }
}

export default StartGame;
