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
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px'}}>
        <div className="timestamp">{props.timestamp}</div>
        {props.read && props.position === "right" && <span style={{fontSize: '14px', color: '#FEF5E7'}}>✓</span>}
    </div>
</div>
        </li>
    )
}

export {Message}
