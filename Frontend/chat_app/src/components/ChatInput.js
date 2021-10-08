import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const ChatInput = () => {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    const socket = io("http://localhost:5000");
    // socket.on("connection", () => {
    //     console.log(socket.connect);
    // });

    useEffect(() => {
        socket.on("chatMessage", (payload) => {
            setChat([...chat, payload]);
            console.log(payload);
        });
    }, [chat, socket]);

    const onHandleSubmit = (e) => {
        e.preventDefault();
        socket.emit("chatMessage", message);
        setMessage("");
    };

    return (
        <div>
            <div>
                {chat.map((chat, index) => {
                    return <p key={index}>{chat}</p>;
                })}
            </div>
            <form onSubmit={onHandleSubmit}>
                <div className="formGroup">
                    <input
                        value={message}
                        type="text"
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter Message"
                    />
                </div>
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatInput;
