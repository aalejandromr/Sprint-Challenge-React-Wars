import React, { Component } from 'react';
import './App.css';
import ListComponent from './components/CharacterComponents/ListComponent';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <ListComponent/>
    );
  }
}

export default App;
