import React, { useEffect, useState } from "react";
import { sendMsg } from "./Socket";
let socket;
const ChatInput = () => {
    const [message, setMessage] = useState("");

    const onHandleSubmit = (e) => {
        e.preventDefault();
        sendMsg(message);
        // socket.emit("chatMessage", message);
        setMessage("");
    };
    const changeMessage = (e) => {
        setMessage(e.target.value);
    };

    return (
        <div className="chatCreate">
            <form onSubmit={onHandleSubmit}>
                <div className="formGroup">
                    <input
                        value={message}
                        type="text"
                        onChange={changeMessage}
                        placeholder="Enter Message"
                    />
                </div>
                <button type="submit" className="btn">
                    <i className="far fa-paper-plane"></i>
                </button>
            </form>
        </div>
    );
};

export default React.memo(ChatInput);
