import { io } from "socket.io-client";

let socket;

export const createRoom = (userData) => {
    socket = io("http://localhost:5000");
    if (socket && userData) socket.emit("joinRoom", userData);
};

export const disconnectRoom = () => {
    if (!socket) return true;
    socket.disconnect();
};

export const sendMsg = (msg) => {
    socket.emit("chatMessage", msg);
};

export const subscribedMsg = (callbackMsg) => {
    if (!socket) return true;
    socket.on("chatMessage", (msgData) => {
        return callbackMsg(null, msgData);
    });
};

export const getUsers = (callbackFunction) => {
    if (!socket) return true;
    socket.on("roomUser", (userData) => {
        return callbackFunction(null, userData);
    });
};
