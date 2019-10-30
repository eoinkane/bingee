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
    }

    addEventListenersHandler = () => {
        //console.log("[Navbar.js] addEventListenersHandler");
        document.querySelector("#homeBtn").addEventListener("click", this.homeBtnHandler);
    }

    removeEventListenersHandler = () => {
        //console.log("[Navbar.js] removeEventListenersHandler");
        document.querySelector("#homeBtn").removeEventListener("click", this.homeBtnHandler);
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
        <nav className="navbar navbar-light bg-light">
            <form className="form-inline">
                <h5 className="navBarH5">Bingee!</h5>
                <div className="row" >
                    <div className="col-sm-2 navBarBtnRow">
                        <button className="btn btn-outline-success btn-sm my-2 my-sm-0 navBarBtn" id="homeBtn" type="button">
                            Home
                        <i className="fas fa-home homeIcon"></i>
                        </button>
                        <button className="btn btn-outline-success btn-sm my-2 my-sm-0 navBarBtn disabled" type="button">Options</button>
                        <button className="btn btn-outline-success btn-sm my-2 my-sm-0 navBarBtn disabled" id="backBtn" type="button">
                            <i className="fas fa-arrow-circle-left"></i>
                        </button>
                        <button className="btn btn-outline-success btn-sm my-2 my-sm-0 navBarBtn disabled" id="upBtn" type="button">
                            <i className="fas fa-arrow-circle-up"></i>
                        </button>

                    </div>
                </div>
            </form>
        </nav>
    )
})

export default Navbar;