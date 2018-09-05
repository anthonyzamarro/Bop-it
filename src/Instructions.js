import React, { Component } from 'react';

class Instructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({
      message: <div className="modal-container">This is how we do it <span className="exit-modal" onClick={this.closeModal}>X</span></div>
    });
  }
  closeModal() {
    this.setState({
      message: ""
    });
  }
  render() {
    return (
      <div>
        <input type="button" value="How to Play" onClick={this.openModal}/>
        <div className="modal">
          {this.state.message}
        </div>
      </div>
    );
  }
}

export default Instructions;
