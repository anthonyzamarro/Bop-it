import React, {Component} from 'react';
import game_beat from './audio/Basic_Rock_135.mp3';
import sound_tom from './audio/tom.wav';
// credit to SoundBible banana peel slip sound
// http://soundbible.com/1299-Banana-Peel-Slip-Zip.html
import sound_pull from './audio/pull-it.mp3';
import sound_twist from './audio/twist-it.mp3';
import sound_lost from './audio/game-lost.mp3';
import voice_bop from './audio/bop-voice.mp3';
import voice_pull from './audio/pull-voice.mp3';
import voice_twist from './audio/twist-voice.mp3';

let bopVoice = new Audio(voice_bop);
let pullVoice = new Audio(voice_pull);
let twistVoice = new Audio(voice_twist);

// helper function to set a random action
function setRandomAction() {
  let actions = ['Bop It', 'Pull It', 'Twist It'];
  let rando = actions[Math.floor(Math.random() * actions.length)];
  switch(rando) {
    case 'Bop It':
      bopVoice.play();
      break;
    case 'Pull It':
      pullVoice.play();
      break;
    case 'Twist It':
      twistVoice.play();
      break;
      default:
  }
  return rando;
}
let gameBeat = new Audio(game_beat);
let bopSound = new Audio(sound_tom);
let pullSound = new Audio(sound_pull);
let twistSound = new Audio(sound_twist);
let gameLostSound = new Audio(sound_lost);

pullSound.addEventListener('timeupdate', e => {
  if (pullSound.currentTime > 0.4) {
    pullSound.currentTime = 0;
    pullSound.pause();
  }
});


twistSound.addEventListener('timeupdate', e => {
  // if (twistSound.currentTime > 0.4) {
    // twistSound.currentTime = 0;
    // twistSound.pause();
  // }
});


class BopIt extends Component {
  constructor(props) {
    super(props);
    // set initial action in this.state so it is not empty on pageload
    this.state = {
      action: setRandomAction(),
      countdown: 3,
      userPressed: '',
      play: true,
      score: 0,
      pgWidth: 100
    }
    this.keyPressed = this.keyPressed.bind(this);
    this.keepPlaying = this.keepPlaying.bind(this);
    this.endGame = this.endGame.bind(this);
    this.timer = this.timer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.stopAudio = this.stopAudio.bind(this);
    this.playAgain = this.playAgain.bind(this);
  }
  componentDidMount() {
    this.startTimer();
    document.addEventListener('keyup', this.keyPressed);
  }
  playAudio() {
    gameBeat.loop = true;
    gameBeat.volume = 0.2;
    gameBeat.play();
    gameBeat.addEventListener('timeupdate', e => {
      if (gameBeat.currentTime > 1.6) {
        gameBeat.currentTime = 0;
      }
    });
  }
  startTimer() {
    // let setTimerTime = parseInt(`${this.state.countdown - 2}000`);
    this.stopIntervalId = setInterval(() => this.timer(), 1000);
    this.playAudio();
  }
  timer() {
    let count = this.state.countdown;
    let pgw = this.state.pgWidth;
    if (count === 0) {
      count = 4
      // end the game if the timer hits 0
      this.endGame();
    }
    this.setState({countdown: count - 1});
    this.setState({pgWidth:pgw - 25});
  }
  keyPressed(e) {
    if (e.key === 'ArrowLeft') {
      this.setState({
        userPressed: 'Pull It'
      });
    } else if (e.key === 'ArrowDown') {
      this.setState({
        userPressed: 'Bop It'
      });
    } else if (e.key === 'ArrowRight') {
      this.setState({
        userPressed: 'Twist It'
      });
    } else {
      this.setState({
        userPressed: 'wrong'
      });
    }
    // if user presses wrong key, then the game is over
    if (this.state.userPressed !== this.state.action) {
      this.endGame();
    } else {
      switch(this.state.userPressed) {
        case 'Pull It':
          pullSound.play();
          break;
        case 'Bop It':
          bopSound.play();
          break;
        case 'Twist It':
          twistSound.play();
          break;
        default:
      }
      // otherwise, reset the time and choose a random action
      this.keepPlaying();
      let s = this.state.score;
      // add one to score if correct key is pressed
      this.setState({
        score: s + 1
      });
      animateGame(e.key)
    }
  }
  keepPlaying() {
    this.setState({
      action: setRandomAction(),
      countdown: 3,
      userPressed: '',
      pgWidth: 100
    });
  }
  stopAudio() {
    gameBeat.pause();
  }
  endGame() {
    console.log('You Lost!!!');
    this.setState({
      play: false
    });
    clearInterval(this.stopIntervalId);
    gameLostSound.play();
    this.stopAudio();
    document.removeEventListener('keyup', this.keyPressed);
  }
  playAgain() {
    this.setState({
      play: true,
      action: setRandomAction(),
      countdown: 3,
      pgWidth: 100,
      score: 0
    });
    this.startTimer();
    document.addEventListener('keyup', this.keyPressed);
  }
  render() {
    let actionClass = `game-action ${this.state.action.split(' ').join('-').toLowerCase()}`;
    let displayAction = <div className={actionClass}>{this.state.action}</div>;
    let styleObj = {
      width: this.state.pgWidth + '%',
      background: 'green'
    }
    if (this.state.pgWidth < 75) {
      styleObj.background = 'red'
    }
    return (
      <div className="bop-it">
        <div onKeyUp={(e) => this.keyPressed(e)}></div>
        <Score scores={this.state.score}/>
        <div className="bop-it-container">
          <div className="game-piece pull"><span className="pull-element"></span><span className="game-piece-span pull-span">Pull It</span></div>
          <div className="game-piece bop"><div className="bop-outer"><span className="game-piece-span bop-span">Bop It</span></div></div>
          <div className="game-piece twist"><span className="twist-element"></span><span className="game-piece-span twist-span">Twist It</span></div>
        </div>
        <div className="show-action">
          {displayAction}
          <Timer time={this.state.countdown} />
          <div className="progress-bar-container">
            <div className="progress-bar-inner">
              <div className="progress-bar" style={styleObj}></div>
            </div>
          </div>
        </div>
        {this.state.play ?  '' :
          <div className="end-game-buttons-container">
            <ResetGame
              playAgain={this.playAgain}
            />
            <SaveScore final={this.state.score}/>
          </div>
        }
      </div>
    );
  }
}

function animateGame(key) {
  switch (key) {
    case 'ArrowLeft':
      document.querySelector('.pull-element').classList.add('pulled');
      setTimeout(function() {
        document.querySelector('.pull-element').classList.remove('pulled');
      }, 500);
    break;
    case 'ArrowDown':
      document.querySelector('.bop-span').style.background = '#4B0082';
      setTimeout(function() {
        document.querySelector('.bop-span').style.background = 'purple';
      }, 500);
    break;case 'ArrowRight':
      document.querySelector('.twist-element').classList.add('twisted');
      setTimeout(function() {
        document.querySelector('.twist-element').classList.remove('twisted');
      }, 500);
    break;
    default:
    console.log('noooooo')
  }
}

function Score(props) {
  return <div className="score-container">Score: {props.scores}</div>;
}

class SaveScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: '',
      finalScore: props.final,
      name: '',
      date: '',
      display: 'block'
    }

    this.openForm = this.openForm.bind(this);
    this.saveUserScore = this.saveUserScore.bind(this);
    this.saveUserName = this.saveUserName.bind(this);
    this.exit = this.exit.bind(this);
  }
  saveUserName(event) {
    this.setState({
      name: event.target.value
    });
  }
  saveUserScore() {
    let date = new Date();
    let options = {year: 'numeric', month: 'long', day: 'numeric'}
    let userData = {
      userName: this.state.name,
      userScore: this.state.finalScore,
      currentDate: date.toLocaleDateString("en-US", options)
    }
    // set userName + current seconds to assure no duplicate data is saved
    let userID = userData.userName + new Date().getUTCMilliseconds();
    localStorage.setItem(userID, JSON.stringify(userData));
    this.exit();
    this.setState({
      display: 'none'
    })
  }
  openForm() {
    this.setState({
      form:
      <form className="form-container">
        <label> Initials </label>
        <input type="text" placeholder="Type three characters" maxLength="3" onChange={this.saveUserName}/>
        <input type="button" value="save" onClick={this.saveUserScore} />
        <span className="exit" onClick={this.exit}>X</span>
      </form>
    });
  }
  exit() {
    this.setState({
      form: ""
    });
  }
  render() {
    let styleObj = {
      display: this.state.display
    }
    return (
      <div className="save-score-container">
        <input type="button" value="Save Score" onClick={this.openForm} style={styleObj}/>
        {this.state.form}
      </div>
    );
  }
}

function Timer(props) {
  return <div className="timer-container">{props.time}</div>;
}

function ResetGame(props) {
  return <input type="button" value="Play Again?" onClick={props.playAgain}/>;
}

export default BopIt
