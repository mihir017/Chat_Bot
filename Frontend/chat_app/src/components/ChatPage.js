import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import FriendsPart from "./FriendsPart";
import { disconnectRoom, RecivedMsg, subscribedMsg } from "./Socket";
// let socket;

const ChatPage = () => {
    const [chat, setChat] = useState([]);
    const history = useHistory();
    // useEffect(() => {
    //     socket = io("http://localhost:5000");
    // }, []);

    useEffect(() => {
        subscribedMsg((err, data) => {
            if (err) return;
            setChat([...chat, data]);
        });
    }, [chat]);
    console.log("chat", chat);
    const leaveRoom = () => {
        disconnectRoom();
        history.push("/");
    };

    return (
        <div className="chatPage">
            <div className="heading">
                <h4>ChatBot</h4>
                <button className="leaveBtn" onClick={leaveRoom}>
                    Leave Room
                </button>
            </div>
            <div className="main">
                <div className="left">
                    <FriendsPart />
                </div>
                <div className="right">
                    {/* <div className="message">
                        <div className="userDetail">
                            <p>Krupesh Joshi</p>
                            <span>8 oct 12:48 PM</span>
                        </div>
                        <p className="msg">hi. Hello Good Morning.... ⛅</p>
                    </div> */}
                    <ChatMessage />
                    {chat.length > 0 &&
                        chat.map((c, index) => {
                            console.log("ccccccc", c);
                            return <ChatMessage key={index} chat={c} />;
                        })}
                </div>
            </div>
            <div className="footer">
                <ChatInput />
            </div>
        </div>
    );
};

export default React.memo(ChatPage);
