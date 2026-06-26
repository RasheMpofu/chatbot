
import React, {useEffect, useRef} from "react";
import './MessageArea.css'
import {Message} from "./Message";

function MessageArea(props) {

    const messagesEndRef = useRef(null)

    useEffect(() => {
     
        if (props.messages.length > 1) {
            scrollToBottom();
        }
    })

    function scrollToBottom() {
        messagesEndRef.current.scrollIntoView({behavior: "smooth"})
    }

  return (
    <ul id="messages">
        {props.messages.map((item, i) =>
            (<Message text={item.text} position={item.position} timestamp={item.timestamp}/>))}
        {props.isTyping && (
            <li className="typing-indicator">
                <div className="avatar"/>
                <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </li>
        )}
        <li ref={messagesEndRef}/>
    </ul>
)
    
}

export {MessageArea}
