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
            <div className="title">Chat</div>
            <button onClick={props.onReset} className="reset_button">Reset</button>
        </div>
    )
}
export {Header}