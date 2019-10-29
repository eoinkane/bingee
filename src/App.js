import React, { Component } from 'react';
// CSS
import './App.css';

// Containers
import Home from "./containers/Home/Home";


// Components
// not any in use yet






class App extends Component {
  state = {
    position: "Home",
    positions: [
      "Home"
    ],
    navbarDown: true
  }

  // Lifecycle  
  componentDidMount() {
    console.log("[App.js] componentDidMount");
  }

  // componentDidMount() {
  //   if (this.state.position === this.state.positions[0]) {
  //     document.querySelector("#getStartedBtn").removeEventListener("click",
  //       this.handlers.changePositionHandler("Home")
  //           //ReactDOM.render(<App />, document.getElementById('root'));
  //       );
  //   }
  // }

  // Handlers 
  changePositionHandler = (destination) => {
    this.setState({
      position: destination
    })
  }

  handlers = {
    changePositionHandler: this.changePositionHandler
  }
  

  render() {
    if (this.state.position === this.state.positions[0]) {
      return (
        <Home props={this.state} handlers={this.handlers}/>
      )
    } 
  }

}

export default App;
