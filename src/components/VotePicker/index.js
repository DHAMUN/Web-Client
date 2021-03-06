import React, { Component } from 'react';
import { socket } from '../../utils/socket.js';
import { Link } from 'react-router';

import { Button } from 'react-toolbox/lib/button';

import { styles } from './styles.scss';

export class VotePicker extends Component {

  constructor (props) {
    super(props);
    this.state = {pass: false, abstain: false, reject: false};
  }

  editPickerOnPriorSelection(newProps) {
    const name = decodeURIComponent(newProps.params.name);

    const data = newProps.votes;

    if (data[name] && data[name].votes[this.props.country]) {
      this.selector(data[name].votes[this.props.country].type);
    }  
  }

  // ComponentPassedProps or something like that...
  componentWillReceiveProps (newProps) {
    // PassProps, data is a field in props. 

    this.editPickerOnPriorSelection(newProps);

  }

  selector (name, change) {

    const title = decodeURIComponent(this.props.params.name);

    var newState = {
      pass: name === "pass",
      abstain: name === "abstain",
      reject: name === "reject"
    };

    this.setState(newState);

    if (change) {
      socket.emit("vote add", {token: this.props.token, type: name, title: title});
    }

  }

  render() {
    const { votes } = this.props;
    const closed = votes[decodeURIComponent(this.props.params.name)].closed;

    
    if (!closed) return (
      <div className={`${styles}` + ' text-center'} >
        <Button className="btn" onClick={() => this.selector('pass', true)} disabled={this.state.pass} raised primary>
          Pass
        </Button>
        <Button className="btn center-vote-button" onClick={() => this.selector('abstain', true)} disabled={this.state.abstain} raised primary>
          Abstain
        </Button>
        <Button className="btn" onClick={() => this.selector('reject', true)} disabled={this.state.reject} raised primary>
          Reject
        </Button>
      </div>
    );

    return (
      <h3>Voting session is closed</h3>
    );
  }
}


