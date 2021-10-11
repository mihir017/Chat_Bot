import React from "react";

const ChatMessage = ({ chat, index }) => {
    return (
        <>
            {chat && (
                <div className="message">
                    <div className="userDetail">
                        <p>{chat[index].username}</p>
                        <span>{chat[index].time}</span>
                    </div>
                    <p className="msg">{chat[index].msg}</p>
                </div>
            )}
        </>
    );
};

export default ChatMessage;
