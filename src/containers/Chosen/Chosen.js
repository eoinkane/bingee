import React, { Component } from "react";

import Navbar from "./../../components/Navbar/Navbar";
import EpisodeDisplay from "./../../components/Displays/EpisodeDisplay/EpisodeDisplay";
import SeasonDisplay from "./../../components/Displays/SeasonDisplay/SeasonDisplay"

class Chosen extends Component {
    state = {
        display: "episode",
        displayInt: 0,
        displays: [
            "episode",
            "season"
        ],
        imgStyleObj: {
            display: "none"
        }
    }

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
    seasonBtnHandler = (() => {
        this.props.handlers.changePrevBtnClickedKeyHandler("seasonBtn");
        this.setState({
            display: "season",
            displayInt: 1
        })
    })
    nextBtnHandler = (() => {
        this.props.handlers.changePrevBtnClickedKeyHandler("nextBtn");
        this.props.handlers.setSelectedEpisodeHandler(this.props.props.selectedEpisodeNext, this.props.props.selectedSeason)
    })
    seasonImgBtnHandler = (() => {
        if (this.state.imgStyleObj.display === "none") {
            this.setState({
                imgStyleObj: {
                    display: "inline-block"
                }
            })
        } else if (this.state.imgStyleObj.display === "inline-block") {
            this.setState({
                imgStyleObj: {
                    display: "none"
                }
            })
        }
        
    })


    addEventListenersHandler = () => {
        // console.log("[Chosen.js] addEventListenersHandler");
        //document.querySelector("#selectBtn").addEventListener("click", this.selectBtnHandler);
        //console.log(this.prevBtnRun);
        //console.log(this.nextBtnRun);
        if (this.state.display === this.state.displays[0]) { 

            this.checkUndefined();
            if (this.prevBtnRun) {
                //console.log("prevBtnRun true\nevent listener added");
                document.querySelector("#previousBtn").addEventListener("click", this.prevBtnHandler);
            }
            if (this.nextBtnRun) {
                //console.log("nextBtnRun true\nevent listener added");
                document.querySelector("#nextBtn").addEventListener("click", this.nextBtnHandler);
            }
            if (this.state.display === this.state.displays[0]) {
                document.querySelector("#seasonBtn").addEventListener("click", this.seasonBtnHandler);
            }
        } else if (this.state.display === this.state.displays[1]) {
            document.querySelector("#seasonImgBtn").addEventListener("click", this.seasonImgBtnHandler);
        }
    }

    removeEventListenersHandler = () => {
        if (this.state.display === this.state.displays[0]) { 

            // console.log("[Chosen.js] removeEventListenersHandler");
            //document.querySelector("#selectBtn").removeEventListener("click", this.selectBtnHandler);
            if (this.prevBtnRun) {
                //console.log("prevBtnRun true\nevent listener removed");
                document.querySelector("#previousBtn").removeEventListener("click", this.prevBtnHandler);
            }
            if (this.nextBtnRun) {
                //console.log("nextBtnRun true\nevent listener removed");
                document.querySelector("#nextBtn").removeEventListener("click", this.nextBtnHandler);
            }
            document.querySelector("#seasonBtn").removeEventListener("click", this.seasonBtnHandler);
            
        } else if (this.state.display === this.state.displays[1]) {
            document.querySelector("#seasonImgBtn").removeEventListener("click", this.seasonImgBtnHandler);
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
        if (this.state.display === this.state.displays[0]) {
            return (
                <div className="ChosenDiv BigDiv">
                    <Navbar full={this.props.props.navbarDown} handlers={this.props.handlers} />
                    <div className="container" id="chosenmaintrue">
                        <p className="topPrint" id="Selected-Episode-Print"><u>Selected Episode</u></p>
                        <EpisodeDisplay episode={this.props.props.selectedEpisode} />
                        <div className="row jumboContRow topPrint" id="scrollBtnRow">
                            <div className="col-xs-4 jumboContRowCol4" id="leftScrollCol">
                                <button type="button" id="previousBtn" className={this.prevBtnClassString}  >Previous</button>
                            </div>
                            <div className="col-xs-4 jumboContRowCol4" id="midScrollCol">
                                <button type="button" id="seasonBtn" className="btn btn-primary"  >Season</button>
                            </div>
                            <div className="col-xs-4 jumboContRowCol4" id="rightScrollCol">
                                <button type="button" id="nextBtn" className={this.nextBtnClassString}  >Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        
        } else if (this.state.display === "season") {
            console.log("lIne 158");            
            return (
                <div className="ChosenDiv BigDiv">
                    <Navbar full={this.props.props.navbarDown} handlers={this.props.handlers} />
                    <div className="container" id="chosenmaintrue">
                        <div className="row jumboContRow topPrint" id="titleBtnRow">
                            <div className="col-xs-6 jumboContRowCol6" id="leftTitleCol">
                                <p className="topPrint" id="Selected-Episode-Print"><u>Selected Season</u></p>
                            </div>
                            <div className="col-xs-6 jumboContRowCol6" id="rightTitleCol">
                                <button type="button" id="seasonImgBtn" className="btn btn-primary disabled"  >Poster</button>
                            </div>
                        </div>
                        
                        <SeasonDisplay season={this.props.props.selectedSeason} imgStyle={this.state.imgStyleObj} />
                        <div className="row jumboContRow topPrint" id="scrollBtnRow">
                            <div className="col-xs-4 jumboContRowCol4" id="leftScrollCol">
                                <button type="button" id="previousBtn" className="btn btn-primary disabled"  >Previous</button>
                            </div>
                            <div className="col-xs-4 jumboContRowCol4" id="midScrollCol">
                                <button type="button" id="seasonBtn" className="btn btn-primary disabled"  >Series</button>
                            </div>
                            <div className="col-xs-4 jumboContRowCol4" id="rightScrollCol">
                                <button type="button" id="nextBtn" className="btn btn-primary disabled"  >Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        
        
    }
}

export default Chosen;