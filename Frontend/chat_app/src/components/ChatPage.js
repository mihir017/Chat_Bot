import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Virtuoso } from "react-virtuoso";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import FriendsPart from "./FriendsPart";
import { disconnectRoom, subscribedMsg, getUsers } from "./Socket";
// let socket;

const ChatPage = () => {
    const [chat, setChat] = useState([]);
    const [roomUsers, setRoomUsers] = useState({});
    const history = useHistory();

    useEffect(() => {
        subscribedMsg((err, data) => {
            if (err) return;
            setChat([...chat, data]);
        });
    }, [chat]);

    useEffect(() => {
        getUsers((err, users) => {
            if (err) return;
            console.log("roomuser", users);
            setRoomUsers({ ...users });
        });
    });
    const leaveRoom = () => {
        disconnectRoom();
        history.push("/");
    };

    return (
        <div className="chatPage">
            <div className="heading">
                <div className="userName">
                    <h4>ChatBot</h4>
                    <p>{roomUsers?.currentUser}</p>
                </div>
                <button className="leaveBtn" onClick={leaveRoom}>
                    Leave Room
                </button>
            </div>
            <div className="main">
                <div className="left">
                    <FriendsPart roomUsers={roomUsers} />
                </div>
                <div className="right">
                    <ChatMessage />
                    <Virtuoso
                        totalCount={chat.length}
                        itemContent={(index) => (
                            <ChatMessage
                                key={index}
                                chat={chat}
                                index={index}
                            />
                        )}
                    />
                    {/* {chat.length > 0 &&
                        chat.map((c, index) => {
                            return <ChatMessage key={index} chat={c} />;
                        })} */}
                </div>
            </div>
            <div className="footer">
                <ChatInput />
            </div>
        </div>
    );
};

export default React.memo(ChatPage);
