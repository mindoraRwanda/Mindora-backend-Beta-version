import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import sequelize from "./db";
import dotenv from "dotenv";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { errorHandler } from "./middleware/error.middleware";
import userRoutes from "./routes/userRoutes";
import patientRoutes from "./routes/patientRoutes";
import { modelAssociation } from "./database/models/association";
import authRoutes from "./routes/auth.routes";
import therapistRoutes from "./routes/therapistRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./utils/swagger";
import adminRoutes from "./routes/admin.routes";
import appointmentRoutes from "./routes/appointmentRoutes";
import appointmentSlotsRoutes from "./routes/appointmentSlotsRoutes";
import appointmentChangeRoutes from "./routes/appointmentChangeRoutes";
import treatmentPlanRoutes from "./routes/treatmentPlanRoutes";
import treatmentAdjustmentRoutes from "./routes/treatmentPlanAdjustmentRoutes";
import treatmentGoalRoutes from "./routes/treatmentGoalRoutes";
import treatmentMilestonesRoutes from "./routes/treatmentMilestonesRoutes";
import milestoneTasksRoutes from "./routes/milestoneTaskRoutes";
import electronicHealthRecordsRoutes from "./routes/electronicHealthRecordRoutes";
import EHRFutureIntegrationRoutes from "./routes/EHRFutureIntegrationRoutes";
import chatRoutes from "./routes/chatRoutes";
import chatMembersRoutes from "./routes/chatMembersRoutes";
import messagesRoutes from "./routes/messagesRoutes";
import medicationRoutes from "./routes/medicationRoutes";
import medicationPrescriptionRoutes from "./routes/medicationPrescriptionRoutes";
import prescriptionComplianceRoutes from "./routes/prescriptionComplianceRoutes";
import medicationRecommendationRoutes from "./routes/medicationRecommendationRoutes";
import exercisesRoutes from "./routes/exerciseRoutes";
import exerciseQuestionRoutes from "./routes/exerciseQuestionRoutes";
import userExerciseRoutes from "./routes/userExerciseRoutes";
import userExerciseResponseRoutes from "./routes/userExerciseResponseRoutes";
import rewardsRoutes from "./routes/rewardsRoutes";
import userRewardRoutes from "./routes/userRewardRoutes";
import supportCommunityRoutes from "./routes/supportCommunityRoutes";
import communityPostRoutes from "./routes/communityPostRoutes";
import commentsRoutes from "./routes/commentsRoutes";
import postReactionRoutes from "./routes/postReactionsRoutes";
import moderationActionsRoutes from "./routes/communityModerationRoutes";
import symptomLogRoutes from "./routes/symptomLogRoutes";
import moodLogRoutes from "./routes/moodLogsRoutes";

dotenv.config();

const app = express();
app.use(cors());

// integrates socket server
const server = createServer(app);
const io = new Server(server);

app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads/**/")));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", userRoutes);
app.use("/api", patientRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", therapistRoutes);
app.use("/admin", adminRoutes);
app.use("/api", appointmentRoutes);
app.use("/api", appointmentSlotsRoutes);
app.use("/api", appointmentChangeRoutes);
app.use("/api", treatmentPlanRoutes);
app.use("/api", treatmentAdjustmentRoutes);
app.use("/api", treatmentGoalRoutes);
app.use("/api", treatmentMilestonesRoutes);
app.use("/api", milestoneTasksRoutes);
app.use("/api", electronicHealthRecordsRoutes);
app.use("/api", EHRFutureIntegrationRoutes);
app.use("/api", chatRoutes);
app.use("/api", chatMembersRoutes);
app.use("/api", messagesRoutes);
app.use("/api", medicationRoutes);
app.use("/api", medicationPrescriptionRoutes);
app.use("/api", prescriptionComplianceRoutes);
app.use("/api", medicationRecommendationRoutes);
app.use("/api", exercisesRoutes);
app.use("/api", exerciseQuestionRoutes);
app.use("/api", userExerciseRoutes);
app.use("/api", userExerciseResponseRoutes);
app.use("/api", rewardsRoutes);
app.use("/api", userRewardRoutes);
app.use("/api", supportCommunityRoutes);
app.use("/api", communityPostRoutes);
app.use("/api", commentsRoutes);
app.use("/api", postReactionRoutes);
app.use("/api", moderationActionsRoutes);
app.use("/api", symptomLogRoutes);
app.use("/api", moodLogRoutes);

// this should the last one
app.use(errorHandler);
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
  sequelize.authenticate().then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  });
  await modelAssociation();
  // await sequelize.sync({ alter: true });
  server.listen(8080, () => {
    console.log("Server is running on port 8080 🚀");
  });
};

startServer();
