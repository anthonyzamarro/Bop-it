import React, {Component} from 'react';



class BopIt extends Component {
  constructor(props) {
    super(props);
    // set initial random action state so it is not empty
    let initalAction = ['bop it', 'pull it', 'twist it'];
    let initialRando = initalAction[Math.floor(Math.random() * initalAction.length)];
    this.state = {
      action: initialRando,
      countdown: 3,
      userPressed: '',
      gameOver: false
    }
    // progressively get faster after x number of actions performed
    // when user presses key, corresponding sound should emit
    this.bind = this.randomAction.bind(this);
    this.bind = this.keyPressed.bind(this);
    this.bind = this.timer.bind(this);
    this.bind = this.keepPlaying.bind(this);
    this.bind = this.endGame.bind(this);
  }
  componentDidMount() {
    let setTimerTime = parseInt(`${this.state.countdown - 2}000`);
    this.randomAction();
    let stopIntervalId = setInterval(() => this.timer(), setTimerTime);
    this.setState({stopInterval: stopIntervalId });
    this.keyPressed();
  }
  // componentWillUnmount() {
    // clearInterval(this.randomAction);
    // clearInterval(stopIntervalId);
    // this.keyPressed();
    // this.keepPlaying();
    // this.endGame();
  // }

  randomAction() {
    let actions = ['bop it', 'pull it', 'twist it'];
    let rando = actions[Math.floor(Math.random() * actions.length)];
    /***
      *
      * I've read that this is not appropriate to update state, but with .setState()
      * the action key was being updated twice in the log, so this is a temporary solution.
      * I think it's because action is first being set in the constructor, this is so that
      * there is a value present when the user starts the game. Then, I reset the state in
      * this function as per how the game is played, but it seems that everytime it is reset
      * the inital state is also rendering its new state. I need to figure out how to render
      * the initial state and then keep changing it thereafter without any "double" rendering.
      *
    ***/
    this.state.action = rando;
  }

  timer() {
    var count = this.state.countdown;
    if (count === 0) {
      count = 4
    }
    this.setState({countdown: count - 1});
  }

  keyPressed() {
    document.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowLeft') {
        this.setState({
          userPressed: 'pull it'
        });
      } else if (e.key === 'ArrowDown') {
        this.setState({
          userPressed: 'bop it'
        });
      } else if (e.key === 'ArrowRight') {
        this.setState({
          userPressed: 'twist it'
        });
      } else {
        this.endGame();
        this.setState({
          userPressed: 'wrong'
        });
      }
      if (this.state.userPressed !== this.state.action) {
        this.endGame();
      } else {
        this.keepPlaying();
      }
    });
  }

  keepPlaying() {
    let actions = ['bop it', 'pull it', 'twist it'];
    let rando = actions[Math.floor(Math.random() * actions.length)];
    this.setState({
      countdown: 3,
      action: rando,
      userPressed: ''
    });
    // console.log('rethis.state)
  }

  endGame() {
    console.log('You Lost!!!');
    clearInterval(this.state.stopInterval);
    this.setState({
      gameOver: true
    });
  }

  render() {
    if (this.state.countdown <= 0) {
      this.endGame();
    }
    return (
      <div className="bop-it">
        <div className="show-action">
          {this.state.action}
          {this.state.countdown}
        </div>
        <span>Pull It</span>
          <br/>
        <span>Bop It</span>
          <br/>
        <span>Twist It</span>
      </div>
    );
  }
}

export default BopIt
