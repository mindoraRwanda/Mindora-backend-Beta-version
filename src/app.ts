import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import sequelize from "./db";
import dotenv from "dotenv";
import "./utils/scheduledTasks";
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
import progressReportRoutes from "./routes/progressReportRoutes";
import courseRoutes from "./routes/courseRoutes";
import courseEnrollmentRoutes from "./routes/courseEnrollmentsRoutes";
import articlesRoutes from "./routes/articlesRoutes";
import videosRoutes from "./routes/videosRoutes";
import membershipPlanRoutes from "./routes/membershipPlanRoutes";
import subscriptionsRoutes from "./routes/subscriptionsRoutes";
import subscriptionChangesRoutes from "./routes/subscriptionChangesRoutes";
import subscriptionLinkedAccountsRoutes from "./routes/subscriptionLinkedAccountsRoutes";
import invoiceRoutes from "./routes/invoicesRoutes";
import insuranceRoutes from "./routes/insuranceRoutes";
import paymentRoutes from "./routes/paymentsRoutes";
import serviceRoutes from "./routes/serviceRoutes";
import insuranceServiceCoverageRoutes from "./routes/insuranceServiceCoverageRoutes";
import patientInsuranceRoutes from "./routes/patientInsuranceRoutes";
import billingReportRoutes from "./routes/billingReportRoutes";
import languageSupportRoutes from "./routes/languageSupportRoutes";
import translationsRoutes from "./routes/translationRoutes";
import resourcesRoutes from "./routes/resourcesRoutes";

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
app.use("/api", progressReportRoutes);
app.use("/api", articlesRoutes);
app.use("/api", videosRoutes);
app.use("/api", courseRoutes);
app.use("/api", courseEnrollmentRoutes);
app.use("/api", membershipPlanRoutes);
app.use("/api", subscriptionsRoutes);
app.use("/api", subscriptionChangesRoutes);
app.use("/api", subscriptionLinkedAccountsRoutes);
app.use("/api", invoiceRoutes);
app.use("/api", insuranceRoutes);
app.use("/api", paymentRoutes);
app.use("/api", serviceRoutes);
app.use("/api", insuranceServiceCoverageRoutes);
app.use("/api", patientInsuranceRoutes);
app.use("/api", billingReportRoutes);
app.use("/api", languageSupportRoutes);
app.use("/api", translationsRoutes);
app.use("/api", resourcesRoutes);

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

const startDate = new Date(
  "Mon Sep 01 2024 00:00:00 GMT+0200 (South Africa Standard Time)"
);
const endDate = new Date(
  "Mon Sep 03 2024 00:00:00 GMT+0200 (South Africa Standard Time)"
);

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
