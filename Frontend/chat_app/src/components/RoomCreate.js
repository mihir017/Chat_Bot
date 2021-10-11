import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createRoom } from "./Socket";
// let socket;
const RoomCreate = () => {
    const [username, setUsername] = useState("");
    const [roomName, setRoomName] = useState("");
    const history = useHistory();
    const onHandleSubmit = (e) => {
        e.preventDefault();
        createRoom({ username, roomName });
        history.push("/chatBot");
        setUsername("");
        setRoomName("");
    };
    return (
        <div className="roomCreate">
            <h2 className="welcomeMsg">Welcome To ChatBot</h2>
            <div className="formBox">
                <form onSubmit={onHandleSubmit}>
                    <div className="formGroup">
                        <input
                            type="text"
                            placeholder="Enter UserName"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="formGroup">
                        <select
                            value={roomName}
                            name="language"
                            onChange={(e) => setRoomName(e.target.value)}
                        >
                            <option value="----">Select Room</option>
                            <option value="javascript">JavaScript</option>
                            <option value="paython">Python</option>
                            <option value="java">Java</option>
                            <option value="php">Php</option>
                            <option value="c#">C#</option>
                        </select>
                    </div>
                    <button className="roomBtn btn">Go to Room</button>
                </form>
            </div>
        </div>
    );
};

export default React.memo(RoomCreate);
