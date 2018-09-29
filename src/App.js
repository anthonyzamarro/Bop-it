import React, { Component } from 'react';
import StartGame from './start-game.js';
import SideBar from './sidebar.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBar: false
    }
    this.openSidebar = this.openSidebar.bind(this);
  }
  openSidebar(data) {
    this.setState({
      sideBar: data
    });
  }
  render() {
    return (
      <div className="game-container">
        <h1 className="bop-it-title" id="bop-it-title"> Bop It! </h1>
        <StartGame />
        <span className="open-sidebar" onClick={this.openSidebar}>
          <div className="ham"></div>
          <div className="ham"></div>
          <div className="ham"></div>
        </span>
        {this.state.sideBar && <SideBar open={this.openSidebar}/>}
        <div className="attribution-container">
          <a href="http://soundbible.com/1299-Banana-Peel-Slip-Zip.html" target="_blank" rel="noopener noreferrer">Sounds Recorded by Mike Koenig</a>
        </div>
      </div>
    );
  }
}

export default App;
