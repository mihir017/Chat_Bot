import React from "react";

const FriendsPart = ({ roomUsers }) => {
    return (
        <>
            <div className="friends">
                <h3>{roomUsers?.room}</h3>
                <div className="members">
                    <div>
                        <i class="fas fa-user-tie"></i>
                        <p>Mihir</p>
                    </div>
                </div>
                {Object.keys(roomUsers).length !== 0 && (
                    <div className="members">
                        {roomUsers?.users.map((user) => {
                            return (
                                <div>
                                    <i class="fas fa-user-tie"></i>
                                    <p>{user.userName}</p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <div className="custom">
                <h3>System</h3>
                <div className="system">
                    <p>
                        <i className="far fa-image"></i>WallPaper
                    </p>
                    <p>
                        <i className="fas fa-bell"></i>Mute Notification
                    </p>
                    <p>
                        <i className="fas fa-sliders-h"></i>settings
                    </p>
                </div>
            </div>
        </>
    );
};

export default FriendsPart;
