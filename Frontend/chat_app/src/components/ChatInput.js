import React, { useState } from "react";
import { io } from "socket.io-client";

const ChatInput = () => {
    const [message, setMessage] = useState("");

    const socket = io("http://localhost:5000");

    const onHandleSubmit = (e) => {
        e.preventDefault();
        socket.emit("chatMessage", message);
        setMessage("");
    };

    return (
        <div className="chatCreate">
            <form onSubmit={onHandleSubmit}>
                <div className="formGroup">
                    <input
                        value={message}
                        type="text"
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter Message"
                    />
                </div>
                <button type="submit" className="btn">
                    <i class="far fa-paper-plane"></i>
                </button>
            </form>
        </div>
    );
};

export default ChatInput;
