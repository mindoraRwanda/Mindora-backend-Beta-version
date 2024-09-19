import { io } from "../app";
import Message from "../database/models/message";

let onlineUsers: Array<any> = [];

// tests socket connection
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("addNewUser", async (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({ userId, socketId: socket.id });
    console.log(onlineUsers);

    // Retrieve unread messages from the database
    try {
      const unreadMessages = await Message.findAll({
        where: { receiverId: userId, isRead: false },
        order: [["createdAt", "ASC"]],
      });

      // Send all unread messages to the user
      unreadMessages.forEach((message) => {
        io.to(socket.id).emit("getMessage", message);
      });

      // Optionally mark messages as delivered or read
      //   await Message.update({ isRead: true }, { where: { receiverId: userId } });
    } catch (error) {
      console.error("Failed to retrieve unread messages:", error);
    }

    io.emit("getOnlineUsers", onlineUsers);
  });

  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find((user) => user.userId === message.receiverId);
    // send private message
    if (user) {
      io.to(user.socketId).emit("getMessage", message);
      // send message notification
      io.to(user.socketId).emit("getNotification", {
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });
    }
  });

  socket.on("disconnect", () => {
    // if user is disconnected, remove him/her in the online users
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});
