import React from "react";

const FriendsPart = () => {
    return (
        <>
            <div className="friends">
                <h3>Members</h3>
                <div className="members">
                    <p>Krupesh</p>
                    <p>Mihir</p>
                    <p>Nirav</p>
                    <p>Sachin</p>
                    <p>Shahib</p>
                </div>
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
