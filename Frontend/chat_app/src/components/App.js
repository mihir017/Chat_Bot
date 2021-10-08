import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ChatInput from "./ChatInput";
import RoomCreate from "./RoomCreate";

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Route path="/" exact>
                    <RoomCreate />
                </Route>
                <Route path="/chatBot" exact>
                    <ChatInput />
                </Route>
            </div>
        </BrowserRouter>
    );
};

export default App;
