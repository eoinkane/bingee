import React, { Component } from 'react';



function NavbarLocalSmall() {
    return (
        
        <button className="btn btn-outline-success btn-sm my-2 my-sm-0 navBarBtn" id="downBtn" type="button">
            <i className="fas fa-arrow-circle-down"></i>
        </button>
        
       // <button type="button">but</button>
    )
}

class Navbar extends Component {
    // handlers 
    homeBtnHandler = () => {
        //alert("Line 11");
        //console.log(this.props);
        this.props.handlers.changePositionHandler("Home");
        this.props.handlers.changePrevBtnClickedKeyHandler("homeBtn");
    }

    redoBtnHandler = () => {
        //alert("Line 11");
        //console.log(this.props);
        this.props.handlers.restartHandler();
        this.props.handlers.changePrevBtnClickedKeyHandler("redoBtn");
    }

    backBtnHandler = () => {
        this.props.handlers.prevPositionHandler();
        this.props.handlers.changePrevBtnClickedKeyHandler("backBtn");
    }

    addEventListenersHandler = () => {
        //console.log("[Navbar.js] addEventListenersHandler");
        document.querySelector("#homeBtn").addEventListener("click", this.homeBtnHandler);
        document.querySelector("#redoBtn").addEventListener("click", this.redoBtnHandler); 
        document.querySelector("#backBtn").addEventListener("click", this.backBtnHandler);
    }
    
    removeEventListenersHandler = () => {
        //console.log("[Navbar.js] removeEventListenersHandler");
        document.querySelector("#homeBtn").removeEventListener("click", this.homeBtnHandler);
        document.querySelector("#redoBtn").removeEventListener("click", this.redoBtnHandler);
        document.querySelector("#backBtn").removeEventListener("click", this.backBtnHandler);
    }

    handlers = {
        addEventListenersHandler: this.addEventListenersHandler,
        removeEventListenersHandler: this.removeEventListenersHandler
    }

    // Lifecycle

    componentDidMount() {
        //console.log("[Navbar.js] componentDidMount");
        this.handlers.addEventListenersHandler();
    }

    componentDidUpdate() {
        //console.log("[Navbar.js] componentDidUpdate");
        this.handlers.removeEventListenersHandler();
        this.handlers.addEventListenersHandler();
    }

    render() {
        // /*
        if (this.props.full) {
            return (
                <NavbarLocalFull />
            )
        } else if (!this.props.full) {
            return (
                <NavbarLocalSmall />
            )
        }
    }
                
    // */
    /*
    return (
        <NavbarLocalSmall />
    )
    */

    
}

const NavbarLocalFull = (() => {
    return (
        <div>
            <nav className="navbar navbar-light bg-light navBarLocal">
                <form className="form-inline formLocal">
                    <h5 className="navBarH5">Bingee!</h5>
                    <div className="row navBarRow" >
                        
                        <button className="btn btn-outline-success btn-sm my-2 my-sm-0 navBarBtn" id="dropBtn" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent">
                            <i className="fas fa-bars"></i>
                        </button>
                    </div>

                    <div className="collapse" id="navbarToggleExternalContent">
                        <div className="row navBarRow" >
                            <button className="btn btn-outline-success btn-sm my-2 my-sm-0 navBarBtn" id="homeBtn" type="button">
                                Home
                            <i className="fas fa-home homeIcon"></i>
                            </button>

                            <button className="btn btn-outline-success btn-sm my-2 my-sm-0 navBarBtn disabled" type="button">
                                Options
                        </button>
                            <button className="btn btn-outline-success btn-sm my-2 my-sm-0 navBarBtn" id="backBtn" type="button">
                                <i className="fas fa-arrow-circle-left"></i>
                            </button>
                            <button className="btn btn-outline-success btn-sm my-2 my-sm-0 navBarBtn " id="redoBtn" type="button">

                                <i className="fas fa-redo"></i>
                            </button>
                        </div>
                    </div>


                </form>
            </nav>
        </div>
    )
})

export default Navbar;