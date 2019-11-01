import React, { Component } from "react";

import Navbar from "./../../components/Navbar/Navbar";
import EpisodeDisplay from "./../../components/Displays/EpisodeDisplay/EpisodeDisplay";

class Chosen extends Component {
    //initialisation
    nextBtnClassString = "btn btn-primary";
    prevBtnClassString = "btn btn-primary";

    nextBtnRun = false;
    prevBtnRun = false;

    // Handlers 
    prevBtnHandler = (() => {
        this.props.handlers.changePrevBtnClickedKeyHandler("previousBtn");
        this.props.handlers.setSelectedEpisodeHandler(this.props.props.selectedEpisodePrev, this.props.props.selectedSeason)
    })
    nextBtnHandler = (() => {
        this.props.handlers.changePrevBtnClickedKeyHandler("nextBtn");
        this.props.handlers.setSelectedEpisodeHandler(this.props.props.selectedEpisodeNext, this.props.props.selectedSeason)
    })


    addEventListenersHandler = () => {
        // console.log("[Chosen.js] addEventListenersHandler");
        //document.querySelector("#selectBtn").addEventListener("click", this.selectBtnHandler);
        //console.log(this.prevBtnRun);
        //console.log(this.nextBtnRun);
        this.checkUndefined();
        if (this.prevBtnRun) {
            console.log("prevBtnRun true\nevent listener added");
            document.querySelector("#previousBtn").addEventListener("click", this.prevBtnHandler);
        }
        if (this.nextBtnRun) {
            console.log("nextBtnRun true\nevent listener added");
            document.querySelector("#nextBtn").addEventListener("click", this.nextBtnHandler);
        }
    }

    removeEventListenersHandler = () => {
        // console.log("[Chosen.js] removeEventListenersHandler");
        //document.querySelector("#selectBtn").removeEventListener("click", this.selectBtnHandler);
        if (this.prevBtnRun) {
            console.log("prevBtnRun true\nevent listener removed");
            document.querySelector("#previousBtn").removeEventListener("click", this.prevBtnHandler);
        }
        if (this.nextBtnRun) {
            console.log("nextBtnRun true\nevent listener removed");
            document.querySelector("#nextBtn").removeEventListener("click", this.nextBtnHandler);
        }
    }

    handlers = {
        addEventListenersHandler: this.addEventListenersHandler,
        removeEventListenersHandler: this.removeEventListenersHandler
    }

    // Lifecycle

    componentDidMount() {
        // console.log("[Chosen.js] componentDidMount");
        // console.log(this.props.props.level);
        // optionList = this.generateOptionList(this.props.props.level);
        this.handlers.addEventListenersHandler();
        //this.checkUndefineds();
        //console.log(this.prevBtnClassString);
        //console.log(this.nextBtnClassString);
    }

    componentDidUpdate() {
        // console.log("[Chosen.js] componentDidUpdate");
        this.handlers.removeEventListenersHandler();
        this.handlers.addEventListenersHandler();
        //this.checkUndefineds();
        // console.log("== -- Line 70 -- ==");
        // console.log(this.props.props.level);
    }
    // methods
    checkUndefinedPrev = (() => {
        if (this.props.handlers.checkIfPrevEpisodeUndefinedHandler(this.props.props.selectedEpisode, this.props.props.selectedSeason)) {
            // console.log("Line 51 Chosen.js == prev is undefined");
            this.prevBtnRun = false;
            this.prevBtnClassString = ("btn btn-primary disabled");
            return this.prevBtnClassString;
        } else {
            this.prevBtnClassString = "btn btn-primary";
            this.prevBtnRun = true;
            return this.prevBtnClassString;
        }
    })
    checkUndefinedNext = (() => {
        if (this.props.handlers.checkIfNextEpisodeUndefinedHandler(this.props.props.selectedEpisode,this.props.props.selectedSeason)) {
            // console.log("Line 51 Chosen.js == next is undefined");
            this.nextBtnRun = false;
            this.nextBtnClassString = "btn btn-primary disabled";
            return this.nextBtnClassString;
        } else {
            this.nextBtnClassString = "btn btn-primary";
            this.nextBtnRun = true;
            return this.nextBtnClassString;
        }
    })

    checkUndefined = (() => {
        this.checkUndefinedPrev();
        this.checkUndefinedNext();

    })

    render() {
        return(
            <div className="ChosenDiv BigDiv">
                <Navbar full={this.props.props.navbarDown} handlers={this.props.handlers} />
                <div className="container" id="chosenmaintrue">
                    <p className="topPrint" id="Selected-Episode-Print"><u>Selected Episode</u></p>
                    <EpisodeDisplay episode={this.props.props.selectedEpisode}/>
                    <div className="row jumboContRow topPrint" id="scrollBtnRow">
                        <div className="col-xs-6 jumboContRowCol6" id="leftScrollCol">
                            <button type="button" id="previousBtn" className={this.prevBtnClassString}  >Previous</button>
                        </div>
                        <div className="col-xs-4 jumboContRowCol6" id="rightScrollCol">
                            <button type="button" id="nextBtn" className={this.nextBtnClassString}  >Next</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chosen;