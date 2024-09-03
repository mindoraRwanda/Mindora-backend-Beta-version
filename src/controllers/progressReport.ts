import { Op, Sequelize } from "sequelize";
import MoodLog from "../database/models/moodLog";

interface MoodSummary {
  averageRating: number;
  mostFrequentMood: string | null;
  moodDistribution: { [mood: string]: number };
}

const generateMoodSummary = async (
  userId: string,
  startDate: Date,
  endDate: Date
): Promise<MoodSummary> => {
  // Fetch mood distribution
  const moodLogs = await MoodLog.findAll({
    where: {
      userId,
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    },
    attributes: [
      "mood",
      [Sequelize.fn("COUNT", Sequelize.col("mood")), "count"],
    ],
    group: ["mood"],
    order: [[Sequelize.literal("count"), "DESC"]],
  });

  const moodDistribution = moodLogs.reduce((acc, log) => {
    const mood = log.getDataValue("mood");
    const count = parseInt(log.getDataValue("count"), 10);
    acc[mood] = count;
    return acc;
  }, {} as { [mood: string]: number });

  const mostFrequentMood =
    moodLogs.length > 0 ? moodLogs[0].getDataValue("mood") : null;

  // Calculate average rating
  const avgRatingResult = await MoodLog.findOne({
    where: {
      userId,
      date: {
        [Op.between]: [startDate, endDate],
      },
    },
    attributes: [
      [Sequelize.fn("AVG", Sequelize.col("rating")), "averageRating"],
    ],
  });

  const averageRating = parseFloat(
    avgRatingResult?.getDataValue("averageRating") || 0
  );

  return {
    averageRating,
    mostFrequentMood,
    moodDistribution,
  };
};
