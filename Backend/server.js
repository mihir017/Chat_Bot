const app = require("express")();
const cors = require("cors");
// const { joinRoom } = require("../Frontend/chat_app/src/components/UserData");
app.use(cors());
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    socket.on("chatMessage", (payload) => {
        io.emit("chatMessage", payload);
    });
    socket.on("joinRoom", ({ username, roomName }) => {
        const user = joinRoom(username, roomName, socket.id);
        socket.join(user.roomName);
        socket.broadcast.emit(
            "chatMessage",
            `${user.userName} has joined the ${user.roomName} chat room`
        );
        console.log(
            `user ${user.userName} Join the ${user.roomName} room for Chat`
        );
    });
});

const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});

const joinRoom = (userName, roomName, id) => {
    const user = { userName, roomName, id };
    let userData = JSON.parse(localStorage.getItem("chatUserData"));
    if (!userData) {
        localStorage.setItem("chatUserData", JSON.stringify([user]));
    } else {
        localStorage.setItem(
            "chatUserData",
            JSON.stringify([...userData, user])
        );
    }
    return user;
};
