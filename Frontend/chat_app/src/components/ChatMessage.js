import React from "react";

const ChatMessage = ({ chat }) => {
    return (
        <>
            {chat && (
                <div className="message">
                    <div className="userDetail">
                        <p>{chat.username}</p>
                        <span>{chat.time}</span>
                    </div>
                    <p className="msg">{chat.msg}</p>
                </div>
            )}
        </>
    );
};

export default ChatMessage;
