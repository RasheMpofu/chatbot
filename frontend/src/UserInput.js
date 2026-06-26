import React, {useState} from "react";
import './UserInput.css'

function UserInput(props) {

    const [inputText, setInputText] = useState("")

    function handleChange(e) {
        setInputText(e.target.value)
    }

    function handleSubmit() {
        props.onSubmitMessage(inputText);
        setInputText("");
    }
    function handleKeyPress(e) {
     if (e.key === 'Enter') {
        handleSubmit();
    }
}
    return (
        <div className="bottom_wrapper clearfix">
            <div className="message_input_wrapper">
               <input className="message_input" value={inputText} onChange={handleChange} onKeyPress={handleKeyPress}
                       placeholder="Type your message here..."/>
            </div>
            <div className="send_message" onClick={handleSubmit}>
                <div className="icon"/>
                <div className="text">Send</div>
            </div>
        </div>
    )
}

export {UserInput}
