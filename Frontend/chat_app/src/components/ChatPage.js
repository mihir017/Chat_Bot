import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import FriendsPart from "./FriendsPart";

const ChatPage = () => {
    const [chat, setChat] = useState([]);

    const socket = io("http://localhost:5000");

    useEffect(() => {
        socket.on("chatMessage", (payload) => {
            setChat([...chat, payload]);
            console.log(payload);
        });
    }, [chat, socket]);

    return (
        <div className="chatPage">
            <div className="heading">
                <h4>ChatBot</h4>
                <button className="leaveBtn">Leave Room</button>
            </div>
            <div className="main">
                <div className="left">
                    <FriendsPart />
                </div>
                <div className="right">
                    <div className="message">
                        <div className="userDetail">
                            <p>Krupesh Joshi</p>
                            <span>8 oct 12:48 PM</span>
                        </div>
                        <p className="msg">hi. Hello Good Morning.... ⛅</p>
                    </div>
                    <ChatMessage />
                    {chat.map((chat, index) => {
                        return <ChatMessage key={index} chat={chat} />;
                    })}
                </div>
            </div>
            <div className="footer">
                <ChatInput />
            </div>
        </div>
    );
};

export default ChatPage;
