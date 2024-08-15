import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import medicalProfileRoutes from './routes/medicalProfileRoutes';
import messageRoutes from "./routes/messageRoutes";
import emergencyContactsRoutes from "./routes/emegergencyContactsRoutes";
import appointmentRoutes from './routes/appointmentRoutes'; // Existing routes
import groupMembershipRoutes from './routes/groupMembershipRoutes'; // Existing routes
import notificationRoutes from './routes/notificationRoutes'; // Existing routes
import symptomLoggingRoutes from './routes/symptomLoggingRoutes'; // Existing routes
import systemConfigurationRoutes from './routes/systemConfigurationRoutes'; 
import { connectDB } from "./db";
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
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/messages", messageRoutes);
app.use('/api/appointments', appointmentRoutes); 
app.use("/api/contacts", emergencyContactsRoutes); 
app.use('/api/group-memberships', groupMembershipRoutes); 
app.use('/api/notifications', notificationRoutes); // Existing routes
app.use('/api/symptom-logs', symptomLoggingRoutes); // Existing routes
app.use('/api/system-configurations', systemConfigurationRoutes); // Add new routes

let onlineUsers: Array<any> = [];

// tests socket connection
io.on("connection", (socket) => {
  console.log("a user connected");
  // socket.on("message:send", async (msg) => {
  //   await sendMessage(msg, socket);
  // })
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({ userId, socketId: socket.id });
    console.log(onlineUsers);
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
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});
app.use('/api/medical-profile', medicalProfileRoutes);
const startServer = async () => {
  await connectDB();
  server.listen(8080, () => {
    console.log("Server is running on port 8080 🚀");
  })
};

startServer();
