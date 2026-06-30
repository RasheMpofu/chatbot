import React from "react";
import './Message.css'

function Message(props) {

    return (
        <li className={"message appeared " + props.position}>
            {props.position === "left" ? (
    <div className="avatar">🤖</div>
) : (
    <div className="avatar">👤</div>
)}
            <div className="text_wrapper">
                <div className="text">{props.text}</div>
                <div className="timestamp">{props.timestamp}</div>
            </div>
        </li>
    )
}

export {Message}
