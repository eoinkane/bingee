import React, { Component  } from "react";

import Navbar from "./../../components/Navbar/Navbar";
import Selector from "./../../components/Selector/Selector";

// initialisation
let optionList;

// Components

function Opt(props) {
    return (
        <option value={props.string}> {props.id + 1}: {props.value}</option>
    );
}



class Start extends Component {
    // Handlers 
    selectBtnHandler = () => {
        if (document.querySelector("#selector").value !== "DEFAULT") {
            if (this.props.props.levelInt === 0) {
                let valueResponse = document.querySelector("#selector").value;
                let valueResponseArray = valueResponse.split("=")
                this.props.handlers.setSelectedSeriesHandler(this.props.props.tvList[valueResponseArray[1]])
                this.props.handlers.increaseLevelHandler()
            } else if (this.props.props.levelInt === 1) {
                let valueResponse = document.querySelector("#selector").value;
                let valueResponseArray = valueResponse.split("=")
                this.props.handlers.setSelectedSeasonHandler(this.props.props.selectedSeries.seasons[valueResponseArray[1]], this.props.props.selectedSeries);
                this.props.handlers.increaseLevelHandler()
            } else if (this.props.props.levelInt === 2) {
                let valueResponse = document.querySelector("#selector").value;
                let valueResponseArray = valueResponse.split("=")
                this.props.handlers.setSelectedEpisodeHandler(this.props.props.selectedSeason.episodes[valueResponseArray[1]],this.props.props.selectedSeason)
                this.props.handlers.changePositionHandler("Chosen");
            }
            this.props.handlers.changePrevBtnClickedKeyHandler("selectBtn");
        }
        
        //this.props.handlers.increaseLevelHandler()
    }

    addEventListenersHandler = () => {
        // console.log("[Start.js] addEventListenersHandler");
        document.querySelector("#selectBtn").addEventListener("click", this.selectBtnHandler);
    }

    removeEventListenersHandler = () => {
        // console.log("[Start.js] removeEventListenersHandler");
        document.querySelector("#selectBtn").removeEventListener("click", this.selectBtnHandler);
    }

    handlers = {
        addEventListenersHandler: this.addEventListenersHandler,
        removeEventListenersHandler: this.removeEventListenersHandler
    }

    // Lifecycle

    componentDidMount() {
        // console.log("[Start.js] componentDidMount");
        // console.log(this.props.props.level);
        // optionList = this.generateOptionList(this.props.props.level);
        this.handlers.addEventListenersHandler();
    }

    componentDidUpdate() {
        // console.log("[Start.js] componentDidUpdate");
        this.handlers.removeEventListenersHandler();
        this.handlers.addEventListenersHandler();
        // console.log("== -- Line 70 -- ==");
        // console.log(this.props.props.level);
    }

    /*
    shouldComponentUpdate() {
        console.log("[Start.js] shouldComponentUpdate");
        console.log("== -- Line 74 -- ==");
        console.log(this.props.props.level);
        if(this.props.props.level === "episode") {
            this.props.handlers.changePositionHandler("Home");
            return false
        } else {
            return true
        }
    }
    */

    // Components


    // Methods

    generateOptionListSeries = ((optionListLocal) => {
        for (let i = 0; i < this.props.props.tvList.length; i++) {
            optionListLocal.push(
                <Opt string={"Series=" + i} value={this.props.props.tvList[i].title} id={i} key={i} />
            )            
        }
    })
    generateOptionListSeason = ((optionListLocal) => {
        for (let i = 0; i < this.props.props.selectedSeries.seasons.length; i++) {
            optionListLocal.push(
                <Opt string={"Season=" + i} value={this.props.props.selectedSeries.seasons[i].season} id={i} key={i} />
            )            
        }
    })
    generateOptionListEpisode = ((optionListLocal) => {
        for (let i = 0; i < this.props.props.selectedSeason.episodes.length; i++) {
            optionListLocal.push(
                <Opt string={"Season=" + i} value={"Ep " + this.props.props.selectedSeason.episodes[i].number} id={i} key={i} />
            )
        }
    })
    
    generateOptionList = ((level) => {
        let optionListLocal = [];
        optionListLocal.push(
            <option value="DEFAULT" key={"DEFAULT"} >Choose a {this.props.props.level} </option>
        );
        if (level === "series") {
            this.generateOptionListSeries(optionListLocal);
        } else if (level === "season") {
            // console.log("Line 84");
            this.generateOptionListSeason(optionListLocal);
        } else if (level === "episode") {
            this.generateOptionListEpisode(optionListLocal);            
        }

        return optionListLocal;
    })

    
    
    render() {
        optionList = this.generateOptionList(this.props.props.level);
        return (
            <div className="StartDiv BigDiv"> {/*id="selectormaintrue"*/}
                <Navbar full={this.props.props.navbarDown} handlers={this.props.handlers}/>
                <Selector tvList={this.props.props.tvList} level={this.props.props.level} handlers={this.props.handlers} opts={optionList}/>
            </div>
        )
    }
}

export default Start;