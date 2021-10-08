import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ChatPage from "./ChatPage";
import RoomCreate from "./RoomCreate";
import "./app.css";

const App = () => {
    return (
        <BrowserRouter>
            <div className="container">
                <Route path="/" exact>
                    <RoomCreate />
                </Route>
                <Route path="/chatBot" exact>
                    <ChatPage />
                </Route>
            </div>
        </BrowserRouter>
    );
};

export default App;
