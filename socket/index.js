// const { Socket } = require("socket.io");

const io = require("socket.io")(4000,{
    cors:{
        origin : "http://localhost:5173",
    },
});

let users = [];

const addUsers=(userId , socketId) =>{
    !users.some(user => user.userId === userId) &&
    users.push({userId,socketId})
}


const removeUser = (socketId) =>{
    users = users.filter(user => user.socketId !== socketId);
}

const getUsers = (userId) =>{
    return users.find(user => user.userId === userId);
}

io.on("connection", (socket) =>{
    console.log("a user is connected");
    socket.on("addUser" , userId =>{
        addUsers(userId , socket.id);
        io.emit("getUsers" , users);
    });

    //send and recive mesage
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUsers(receiverId);
        console.log(receiverId);
        if (user) {
            io.to(user.socketId).emit("getMessage", {
                senderId,
                text,
            });
        } else {
            console.log("User not found:", { senderId, receiverId, text });
            // You might emit an error event back to the client or handle this case differently
        }
    });
    


    socket.on("disconnect", ()=>{
        console.log("some one disconnected");
        removeUser(socket.id);
        io.emit("getUsers" , users);
    })
});