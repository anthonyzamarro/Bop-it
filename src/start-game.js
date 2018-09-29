import React, {Component} from 'react';
import BopIt from './bop-it.js';

class StartGame extends Component {
  constructor(props) {
    super(props);
      this.state = {
        startGame: false,
        display: 'inline-block',
      }
    this.gameStarted = this.gameStarted.bind(this);
  }
  gameStarted() {
    this.setState({
      startGame: true,
      display: 'none'
    });
    document.querySelector('#bop-it-title').classList.add('move-over');
  }
  render() {
    return (
      <div className="start-game-container">
        <input type="button" value="Play" style={{display: this.state.display}} onClick={this.gameStarted}/>
        {this.state.startGame &&
          <BopIt />
        }
      </div>
    )
  }
}

export default StartGame;
