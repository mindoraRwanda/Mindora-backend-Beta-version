import express from "express";
import bodyParser from "body-parser";
import sequelize from "./db";
import dotenv from "dotenv";
import { createServer } from "node:http";
import { Server } from "socket.io";

// import { sendMessage } from './controllers/messageController';

dotenv.config();

const app = express();
// integrates socket server
const server = createServer(app);
const io = new Server(server);

app.use(bodyParser.json());



// tests socket connection
// io.on("connection", (socket) => {
  console.log("a user connected");
  // socket.on("message:send", async (msg) => {
  //   await sendMessage(msg, socket);
  // })
  // socket.on("addNewUser", (userId) => {
    // !onlineUsers.some((user) => user.userId === userId) &&
    //   onlineUsers.push({ userId, socketId: socket.id });
    // console.log(onlineUsers);
    // io.emit("getOnlineUsers", onlineUsers);
  // });

//   socket.on("sendMessage", (message) => {
//     // const user = onlineUsers.find((user) => user.userId === message.receiverId);
//     // send private message
//     if (user) {
//       io.to(user.socketId).emit("getMessage", message);
//       // send message notification
//       io.to(user.socketId).emit("getNotification", {
//         senderId: message.senderId,
//         isRead: false,
//         date: new Date(),
//       });
//     }
//   });

//   socket.on("disconnect", () => {
//     onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
//     io.emit("getOnlineUsers", onlineUsers);
//   });
// });
const startServer = async () => {
  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.')
  })
  server.listen(8080, () => {
    console.log("Server is running on port 8080 🚀");
  })
};

startServer()
