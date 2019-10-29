import React, { Component } from 'react';
// CSS
import './App.css';

// Components
import Navbar from "./components/Navbar/Navbar";

class App extends Component {
  state = {
    position: "start"
  }

  render() {
    return(
      <div>
        <Navbar full={true}/>
        <h1>Hello</h1>
      </div>
    );
  }
}

export default App;
