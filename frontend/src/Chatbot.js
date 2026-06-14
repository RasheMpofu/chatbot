import React, {useEffect, useState} from "react";
import './Chatbot.css';

import {Header} from "./Header";
import {UserInput} from "./UserInput";
import {MessageArea} from "./MessageArea";

import {io} from "socket.io-client"

const socket = io("");

function Chatbot() {
    /*
      Handle messages
     */
    const [messages, setMessages] = useState([{
        text: "Welcome to Pizza Hut! What would you like to order? We have Pepperoni Pizza, Veggie Pizza & Cheese Pizza.",
        position: "left" ,timestamp: new Date().toLocaleTimeString() 
    }]);

    useEffect(() => {
        //if last message is a non-empty question, ask the server
        let lastMessage = messages[messages.length - 1]
        if (lastMessage.text !== "" && lastMessage.position === "right") {
            socket.emit('question', lastMessage.text);
        }

        //handle server responses
        socket.on("answer", (data) => {
            setMessages([...messages, {text: data, position: "left", timestamp:new Date().toLocaleTimeString()}])
        });

    }, [messages]);

    function resetChat() {
    setMessages([{
        text: "Welcome to Pizza Hut! What would you like to order? We have Pepperoni Pizza, Veggie Pizza & Cheese Pizza.",
        position: "left"
    }]);
    socket.disconnect();
    socket.connect();
}

    function onSubmitMessage(inputText) {
        setMessages([...messages, {text: inputText, position: "right", timestamp:new Date().toLocaleTimeString() }])
    }

    /*
      Render HTML
    */
    return (
        <div className="chat_window">
            <Header onReset={resetChat} />
            <MessageArea messages={messages} />
            <UserInput onSubmitMessage={onSubmitMessage} />
        </div>
    );
}

export default Chatbot;
