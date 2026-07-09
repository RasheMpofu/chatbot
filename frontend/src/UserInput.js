import React, {useState, useRef, useEffect} from "react";
import './UserInput.css'

function UserInput(props) {

    const [inputText, setInputText] = useState("")
    const inputRef = useRef(null);
    useEffect(() => { inputRef.current.focus(); }, []);

    function handleChange(e) {
        setInputText(e.target.value)
    }

    function handleSubmit() {
        if (inputText.trim()=== "" )
            return;
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
               <input className="message_input" ref={inputRef} value={inputText} onChange={handleChange} onKeyPress={handleKeyPress} maxLength={500}
                       placeholder="Type your message here..."/>
                       <div className="char_counter">{inputText.length} / 500</div>
            </div>
            <div className="send_message" onClick={handleSubmit}>
                <div className="icon"/>
                <div className="text">Send</div>
            </div>
        </div>
    )
}

export {UserInput}


