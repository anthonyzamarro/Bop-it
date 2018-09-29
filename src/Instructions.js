import React, { Component } from 'react';

class Instructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
    this.openModal = this.openModal.bind(this);
    this.exit = this.exit.bind(this);
  }
  openModal() {
    this.setState({
      message: <div className="modal-container">
        <span className="exit" onClick={this.exit}>X</span>
        <h3>How to Play</h3>
        <p>Hit the correct key before time runs out!</p>
        <p>Press the ⟵ arrow key to pull it!</p>
        <p>Press the ↓ arrow key to bop it!</p>
        <p>Press the ⟶ arrow key to twist it!</p>
      </div>
    });
  }
  exit() {
    this.setState({
      message: ""
    });
  }
  render() {
    return (
      <div className="instructions-container">
        <input type="button" value="How to Play" onClick={this.openModal}/>
        <div className="modal">
          {this.state.message}
        </div>
      </div>
    );
  }
}

export default Instructions;
