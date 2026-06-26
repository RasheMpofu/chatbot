import React from "react";
import './Header.css'
function Header(props) {
    return (
        <div className="top_menu">
            <div className="buttons">
                <div className="button close"/>
                <div className="button minimize"/>
                <div className="button maximize"/>
            </div>
            <div className="title">ORDER HERE!</div>
            <button onClick={props.onReset} className="reset_button">Reset </button>
             <button onClick={props.onExport} className="export_button">Export </button>
        </div>
    )
}
export {Header}
