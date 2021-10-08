import React from "react";

const ChatMessage = ({ chat }) => {
    return (
        <div className="message">
            <div className="userDetail">
                <p>Krupesh Joshi</p>
                <span>8 oct 12:48 PM</span>
            </div>
            <p className="msg">{chat}</p>
        </div>
    );
};

export default ChatMessage;
