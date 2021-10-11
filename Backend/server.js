const app = require("express")();
const cors = require("cors");
const moment = require("moment");
let userData = [];
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
                formatMessage(
                    `${user.userName} has joined the ${user.roomName} chat room`
                )
            );
        console.log(
            `user ${user.userName} Join the ${user.roomName} room for Chat`
        );
    });

    socket.on("chatMessage", (payload) => {
        const currentUser = getCurrentUser(socket.id);
        console.log("currentUser", currentUser);

        io.to(currentUser.roomName).emit(
            "chatMessage",
            formatMessage(payload, currentUser.userName)
        );
    });

    socket.on("disconnect", () => {
        const user = getLeaveUser(socket.id);
        console.log("disconnect", user);
        if (user) {
            io.to(user.roomName).emit(
                "chatMessage",
                formatMessage(`${user.userName} has Leave the chat room`)
            );
        }
    });
});

const PORT = 5000 || process.env.PORT;

// ==================================================================================

server.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});

const joinRoom = (userName = "", roomName = "", id, query) => {
    if (query === "add") {
        console.log("add id", id);
        const user = { userName, roomName, id };

        userData.push(user);
        console.log(userData);
        return user;
    }
};

const formatMessage = (msg, username = "Admin") => {
    return {
        username,
        msg,
        time: moment().format("h:mm a"),
    };
};

const getLeaveUser = (id) => {
    console.log("Helloooo", userData);
    const leaveUser = userData.find((user) => user.id === id);
    userData = [...userData.filter((user) => user.id !== leaveUser.id)];
    return leaveUser;
};

const getCurrentUser = (id) => {
    return userData.find((user) => user.id === id);
};

const outUserFromRoom = (id) => {};
