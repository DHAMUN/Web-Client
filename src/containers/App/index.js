import React, { Component } from 'react';

export class App extends Component {
  static propTypes = {
    children: React.PropTypes.any,
  };

  render() {
    return this.props.children;  
  }
}
