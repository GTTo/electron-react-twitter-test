import React from 'react';
import logo from './logo.svg';
import './App.css';
import Feed from './Feed';


class App extends React.Component {
  render() {
    return (
        <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>A twiter client for Axosoft.</p>
        </header>

        <Feed></Feed>
    </div>
    )
  }
}

export default App;
