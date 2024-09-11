import cron from "node-cron";
import Subscription from "../database/models/subscription";
import User from "../database/models/user";
import { Op } from "sequelize";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

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
