const app = require("express")();
const cors = require("cors");
const moment = require("moment");
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
    socket.on("joinRoom", ({ username, roomName }) => {
        const user = joinRoom(username, roomName, socket.id, "add");
        socket.join(user.roomName);
        socket.broadcast
            .to(user.roomName)
            .emit(
                "chatMessage",
                `${user.userName} has joined the ${user.roomName} chat room`
            );
        console.log(
            `user ${user.userName} Join the ${user.roomName} room for Chat`
        );
    });

    socket.on("chatMessage", (payload) => {
        const currentUser = getCurrentUser(socket.id);

        io.to(currentUser.room).emit(
            "chatMessage",
            formatMessage(payload, currentUser)
        );
    });

    socket.on("leaveRoom", () => {
        const leaveUser = joinRoom(socket.id, "remove");

        io.to(leaveUser.roomName).emit(
            "chatMessage",
            `${user.userName} has Leave the chat room`
        );
    });
});

const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});

const joinRoom = (userName = "", roomName = "", id, query) => {
    let userData = JSON.parse(localStorage.getItem("chatUserData"));
    if (query === "add") {
        const user = { userName, roomName, id };
        if (!userData) {
            localStorage.setItem("chatUserData", JSON.stringify([user]));
        } else {
            localStorage.setItem(
                "chatUserData",
                JSON.stringify([...userData, user])
            );
        }
        return user;
    } else if (query === remove) {
        const leave = userData.find((user) => user.id === id);
        localStorage.setItem(
            "chatUserData",
            JSON.stringify(userData.filter((user) => user.id !== id))
        );
        return leave;
    }
};

const formatMessage = (msg, username) => {
    return {
        username,
        msg,
        time: moment().format("h:mm a"),
    };
};

const getCurrentUser = (id) => {
    return JSON.parse(localStorage.getItem("chatUserData")).find(
        (user) => user.id === id
    );
};

const outUserFromRoom = (id) => {};
