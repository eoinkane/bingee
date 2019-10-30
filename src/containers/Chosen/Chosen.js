import React, { Component } from "react";

import Navbar from "./../../components/Navbar/Navbar";
import EpisodeDisplay from "./../../components/Displays/EpisodeDisplay/EpisodeDisplay";

class Chosen extends Component {
    render() {
        return(
            <div className="ChosenDiv">
                <Navbar full={this.props.props.navbarDown} handlers={this.props.handlers} />
                <div className="container" id="chosenmaintrue">
                    <p className="topPrint" id="Selected-Episode-Print"><u>Selected Episode</u></p>
                    <EpisodeDisplay episode={this.props.props.selectedEpisode}/>
                    <div className="row jumboContRow topPrint" id="scrollBtnRow">
                        <div className="col-xs-6 jumboContRowCol6" id="leftScrollCol">
                            <button type="button" id="previousBtn" className="btn btn-primary disabled"  >Previous</button>
                        </div>
                        <div className="col-xs-4 jumboContRowCol6" id="rightScrollCol">
                            <button type="button" id="nextBtn" className="btn btn-primary disabled"  >Next</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chosen;