import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import symptomsLoggingRoutes from "./routes/symptomLoggingRoutes";
import medicalProfileRoutes from "./routes/medicalProfileRoutes";
import { connectDB } from "./db";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/medical-profile", medicalProfileRoutes);
app.use("/api/symptoms", symptomsLoggingRoutes);
const startServer = async () => {
  await connectDB();
  app.listen(8080, () => {
    console.log("Server is running on port 8080 🚀");
  });
};

startServer();
