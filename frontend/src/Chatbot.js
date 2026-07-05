
import React, {useEffect, useState} from "react";
import './Chatbot.css';

import {Header} from "./Header";
import {UserInput} from "./UserInput";
import {MessageArea} from "./MessageArea";

import {io} from "socket.io-client"

const socket = io("");

function Chatbot() {
    
    const [messages, setMessages] = useState([{
        text: "Welcome to Pizza Hut! What would you like to order? We have Pepperoni Pizza, Veggie Pizza & Cheese Pizza.",
        position: "left" ,timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }]);
    const [isTyping, setIsTyping] = useState(false);

useEffect(() => {
    let lastMessage = messages[messages.length - 1]
    if (lastMessage.text !== "" && lastMessage.position === "right") {
        setIsTyping(true);
        socket.emit('question', lastMessage.text);
    }
    
   socket.on("answer", (data) => {

    let updatedMessages = [...messages];
    if (updatedMessages[updatedMessages.length - 1].position === "right") {
        updatedMessages[updatedMessages.length - 1].read = true;
    }
    updatedMessages.push({text: data, position: "left", timestamp:new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
    setMessages(updatedMessages);
    setIsTyping(false);
});
}, [messages]);

    function resetChat() { let userSaidYes = window.confirm("Are you sure you want to reset the chat?");
        if (!userSaidYes) {
    return;
}
    setMessages([{
        text: "Welcome to Pizza Hut! What would you like to order? We have Pepperoni Pizza, Veggie Pizza & Cheese Pizza.",
        position: "left" , timestamp:new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }]);
    socket.disconnect();
    socket.connect();
}

    function onSubmitMessage(inputText) {
        setMessages([...messages, {text: inputText, position: "right", timestamp:new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    } 
   function exportChat() {
    if (messages.length === 1) {
    alert("No conversation to export yet!");
    return;
}
    let exportData = messages.map((item) => {
        return {
            sender: item.position === "right" ? "user" : "bot",
            text: item.text,
            timestamp: item.timestamp
        }
    });
    let jsonString = JSON.stringify(exportData, null, 2);
    let blob = new Blob([jsonString], {type: "application/json"});
    let url = URL.createObjectURL(blob);
    let link = document.createElement("a");
    let now = new Date();
let date = now.getFullYear() + "-" + (now.getMonth()+1) + "-" + now.getDate();
    link.href = url;
    link.download = "chat-" + date + ".json";
    link.click();
    URL.revokeObjectURL(url);
}


    return (
        <div className="chat_window">
            <Header onReset={resetChat} onExport={exportChat} />
           <MessageArea messages={messages} isTyping={isTyping} />
            <UserInput onSubmitMessage={onSubmitMessage} />
        </div>
    );
}

export default Chatbot;

    
 
