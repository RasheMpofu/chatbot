### CHATBOT APPLICATION


 The application is a web-based chatbot that interacts with users in a question-and-answer format. It functions as a restaurant ordering system. The restaurant is a Pizza Hut that allows users to place orders for pizza and specify order requirements. The system implements error handling through both hard and soft fallback. It also keeps tracks of conversation history where users can export conversation as a .json file. 


## Features

# Chat Functionality
 Q&A conversation style
Multi-turn dialogue support that supports up to 20 turns
Timestamped messages
Conversation state tracking

# Conversation Control
Soft fallback: user prompted to rephrase when input is not understood
Hard fallback: converstion ressetted after too many errors or failures


# Data Export
Export chat history as  a .json file which include details such as : 
sender (user/bot)
message content
timestamp

# UI
Responsive design
Chat style alternates between output from chatbot and input from user
 CSS-based interface
Conversation reset button
Chat Export button

##  Project Set Up

# Frontend installation
cd frontend
npm install
npm start

# Backend installation
cd backend
npm install
node server.js

# WebSocket Communication
1. The frontend communicates with the backend usinf the Websocket protocol.
2. Backend then  returns:
    -bot response
    -updated conversation state
     -timestamps

# Intent Detection
Backend can understand the intent of user using key word spotting
Backend extensible such that new topics or intents can be added













