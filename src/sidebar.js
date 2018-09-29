import React, {Component} from 'react';
import Instructions from './instructions.js';
import ViewScoresButton from './view-scores-button.js';


class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open
    }

    this.exitSidebar = this.exitSidebar.bind(this);
  }

  exitSidebar() {
    this.props.open(false);
  }

  render() {
    return (
      <section className="sidebar-container">
        <span className="exit exit-sidebar" onClick={this.exitSidebar}>X</span>
        <Instructions />
        <ViewScoresButton />
      </section>
    )
  }
}

export default SideBar;
