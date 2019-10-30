import React from "react";

const Selector =((props) => {
    return (
        <div className="container" id="selectormainfalse">
            <div className="selector">
                <div className="container row jumboContRow">
                    <div className="col-xs-10 jumboContRowCol10">
                        <h6 className="lead pNotEndOfList">Select the {props.level}</h6>
                    </div>
                </div>
                <div className="container row jumboContRow">
                    <div className="col-xs-12 jumboContRowCol12">
                        <select id="selector" className="custom-select" defaultValue={'DEFAULT'}>
                            {props.opts}
                    </select>
                    </div>
                </div>
                <div className="container row jumboContRow">
                    <div className="col-xs-12 jumboContRowCol12">
                        <button type="button" id="selectBtn" className="btn btn-primary"  >Submit</button>
                    </div>
                </div>
            </div>
            
        </div>
    )
})

export default Selector;