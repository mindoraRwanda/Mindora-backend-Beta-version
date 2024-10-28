import cron from "node-cron";
import Subscription from "../database/models/subscription";
import User from "../database/models/user";
import { Op } from "sequelize";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Message from "../database/models/message";
import Chat from "../database/models/chat";

dotenv.config();

const sendRenewalReminder = async (userId: string, endDate: Date) => {
  const user = await User.findByPk(userId);

  if (!user) {
    console.log(`User with ID ${userId} not found.`);
    return;
  }
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    pool: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const subscription = await Subscription.findOne({ where: { userId } });

  if (!subscription) {
    console.log(`No subscription found for user ${userId}`);
    return;
  }
  const renewUrl = `http://localhost:8080/api/subscriptions/${subscription?.id}`;

  const mailOptions = {
    to: user.email,
    from: process.env.EMAIL_USER,
    subject: "Renew subscription",
    text: `Dear ${
      user.firstName
    }, your subscription will expire on ${endDate.toLocaleDateString()}. Please renew to continue enjoying our services.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      ${renewUrl}\n\n`,
  };

  await transporter.sendMail(mailOptions);
};

// Scheduled job to send renewal reminders
cron.schedule("0 9 * * *", async () => {
  console.log("Running job to send renewal reminders...");

  const today = new Date();
  const reminderThreshold = new Date(today);
  reminderThreshold.setDate(today.getDate() + 7); // Set threshold for 7 days from now

  // Fetch subscriptions that are about to expire in the next 7 days
  const subscriptions = await Subscription.findAll({
    where: {
      endDate: {
        [Op.lte]: reminderThreshold,
        [Op.gte]: today,
      },
      status: "Active",
    },
  });

  // Loop through subscriptions and send reminders
  await Promise.all(
    subscriptions.map((subscription) =>
      sendRenewalReminder(subscription.userId, subscription.endDate)
    )
  );

  console.log(`Sent reminders to ${subscriptions.length} users.`);
});

// Function to delete chat messages older than 24 hours
const deleteOldMessages = async () => {
  const cutoffTime = new Date();
  cutoffTime.setDate(cutoffTime.getDate() - 1); // 24 hours ago
  // cutoffTime.setHours(cutoffTime.getHours() - 1); // 1 hour ago

  const deletedMessages = await Message.destroy({
    where: {
      createdAt: {
        [Op.lte]: cutoffTime,
        // [Op.gte]: cutoffTime, // Messages created in the last 1 hour
      },
      isRead: true, // Only delete messages that have been read
    },
  });

  console.log(`Deleted ${deletedMessages} old messages from all chats.`);
};

// Scheduled job to run every 24 hours
cron.schedule("0 0 * * *", async () => {
  console.log("Running job to delete old chat messages...");

  try {
    await deleteOldMessages();
  } catch (error) {
    console.error("Error occurred while deleting messages:", error);
  }

  console.log("Old chat messages deletion task completed.");
});
