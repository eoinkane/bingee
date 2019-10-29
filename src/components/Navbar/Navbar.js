import React from 'react';
function NavbarLocalFull() {
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
                        <button className="btn btn-outline-success btn-sm my-2 my-sm-0 navBarBtn" id="backBtn" type="button">
                            <i className="fas fa-arrow-circle-left"></i>
                        </button>
                        <button className="btn btn-outline-success btn-sm my-2 my-sm-0 navBarBtn" id="upBtn" type="button">
                            <i className="fas fa-arrow-circle-up"></i>
                        </button>

                    </div>
                </div>
            </form>
        </nav>
    )
}
function NavbarLocalSmall() {
    return (
        
        <button className="btn btn-outline-success btn-sm my-2 my-sm-0 navBarBtn" id="downBtn" type="button">
            <i className="fas fa-arrow-circle-down"></i>
        </button>
        
       // <button type="button">but</button>
    )
}

function Navbar(props) {
    // /*
    if (props.full) {
        return (        
            <NavbarLocalFull />       
        )
    } else if (!props.full) {
        return (
            <NavbarLocalSmall />
        )
    }
    
    // */
    /*
    return (
        <NavbarLocalSmall />
    )
    */

    
}

export default Navbar;