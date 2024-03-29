import React from 'react';

function JumboMainLocal() {
    return(
        <div className="container">
            <p className="lead jumboTextMid">Due to still being in development our database of shows is limited but progress is being made</p>
            <div className="row jumboContRow">
                <div className="col-xs-12 jumboContRowCol12 greenRowSeparator">

                </div>
            </div>
            <div className="row jumboContRow">
                <div className="col-xs-12 jumboContRowCol12">
                    <p className="lead jumboTextSm pNotEndOfList">Description blah blah blah, need to build app first, Have a couple of rows containing a welcome message </p>
                    <p className="lead jumboTextSm pNotEndOfList">Hello, This is app, if use app, welcome message, reformat to describe features</p>
                    <p className="lead jumboTextSm">Brand new feature that only is not existent*.</p>
                </div>
            </div>

            <div className="row jumboContRow">
                <div className="col-xs-12 jumboContRowCol12">
                    <button className="btn btn-success btn-sm my-2 my-sm-0 navBarBtn" id="getStartedBtn" type="button">
                        <i className="fas fa-tv"></i>
                        Get Started                
                    </button>
                    
                </div>
                
            </div>

            {/*
            <div className="row jumboContRow">
                <div className="col-xs-4 jumboContRowCol4">
                    <p className="lead jumboTextSm">Bingee! stores </p>
                </div>
                <div className="col-xs-4 jumboContRowCol4">

                </div>
                <div className="col-xs-4 jumboContRowCol4">
                </div>
            </div>
            */}


            <div className="row jumboContRow bottomRow">
                <div className="col-xs-12 jumboContRowCol12">
                    <p className="lead jumboTextXs pNotEndOfList">*New feature coming soon</p>
                </div>
            </div>
        </div>

    )
}

function WelcomeJumbo(props) {
    let fullQBol = (props.fullQ === 'true');
    if (fullQBol) {
        return (
            <div className="jumbotron jumbotron-fluid" id={"jumbomain"+props.fullQ}>
                
                <div className="container jumboCont">
                    <div className="row">                        
                        <div className="col-sm-4 jumboNavBar" id="h5Div">
                            <h5 className="">Bingee!<br></br> React-based TV app</h5>
                        </div>
                        <div className="col-sm-4 jumboNavBar" id="btnRightCornerDiv">
                            <button className="btn btn-outline-success btn-sm my-2 my-sm-0 navBarBtn" id="downBtn" type="button">
                                <i className="fas fa-arrow-circle-down"></i>
                            </button>
                        </div>
                    </div>                    
                </div>

                <JumboMainLocal />


                
            </div>
            
        )
    } else if (!fullQBol) {
        return (
            <div className="jumbotron jumbotron-fluid" id={"jumbomain" + props.fullQ}>
                <div className="container jumboCont">
                    <div className="row">
                        <div className="col-sm-4 jumboNavBar">
                            <h5 className="">Bingee!<br></br> React-based TV app</h5>
                        </div>
                    </div>
                </div>

                <JumboMainLocal />                
            </div> 
        )
    }
}

export default WelcomeJumbo;