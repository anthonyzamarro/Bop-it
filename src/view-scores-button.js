import React, {Component} from 'react';
// import ViewScores from './view-scores.js';

class ViewScoresButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScores: false
    }
    this.exit = this.exit.bind(this);
    this.show = this.show.bind(this)
  }
  show() {
    this.setState({
      showScores: true
    });
  }
  exit() {
    this.setState({
      showScores: false
    });
  }

  render() {
    const listScores = Object.keys(localStorage).map((key, index) => {
      // console.log(JSON.parse(localStorage[key]))
      let names = JSON.parse(localStorage[key]).userName;
      let scores = JSON.parse(localStorage[key]).userScore;
      let dates = JSON.parse(localStorage[key]).currentDate;
      return (
       <li key={index}> name: {names}, score: {scores}, date: {dates}</li>
      );
    });
    return (
      <div className="score-card-button-container">
        <input type="button" value="View Scores" onClick={this.show} />
        {this.state.showScores &&
          <div>
            <div className="score-card-container">
            <span className="exit" onClick={this.exit}>X</span>
              <div className="score-card">
                <ul>{listScores.length > 0 ? listScores : "No games have been played yet!"}</ul>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}






export default ViewScoresButton;
