import React, { Component } from "react";

// Components
import Navbar from "./../../components/Navbar/Navbar";
import WelcomeJumbo from "./../../components/WelcomeJumbo/WelcomeJumbo";

class Home extends Component {

    // Handlers 
    getStartedBtnHandler = () => {
        alert("Line 11");
        this.props.handlers.changePositionHandler("Home")
    }

    addEventListenersHandler = () => {
        console.log("[Home.js] addEventListenersHandler");
        document.querySelector("#getStartedBtn").addEventListener("click", this.getStartedBtnHandler);
    }

    removeEventListenersHandler = () => {
        console.log("[Home.js] removeEventListenersHandler");
        document.querySelector("#getStartedBtn").removeEventListener("click", this.getStartedBtnHandler);
    }

    handlers = {
        addEventListenersHandler: this.addEventListenersHandler,
        removeEventListenersHandler: this.removeEventListenersHandler
    }

    // Lifecycle

    componentDidMount() {
        console.log("[Home.js] componentDidMount");
        this.handlers.addEventListenersHandler();
    }
    
    componentDidUpdate() {
        console.log("[Home.js] componentDidUpdate");
        this.handlers.removeEventListenersHandler();
        this.handlers.addEventListenersHandler();
    }



    render() {
        return (
            <div className="HomeDiv">
                <Navbar full={this.props.props.navbarDown} />
                <WelcomeJumbo fullQ="false" />
            </div>
        )
    }
}

export default Home 