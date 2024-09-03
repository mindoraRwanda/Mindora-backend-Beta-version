import { Op, Sequelize } from "sequelize";
import MoodLog from "../database/models/moodLog";
import SymptomLog from "../database/models/symptomLog";

interface MoodSummary {
  averageRating: number;
  mostFrequentMood: string | null;
  moodDistribution: { [mood: string]: number };
}

export const generateMoodSummary = async (
  userId: string,
  startDate: Date,
  endDate: Date
): Promise<MoodSummary> => {
  // Fetch mood distribution
  const moodLogs = await MoodLog.findAll({
    where: {
      userId,
      logDate: {
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
    const data = log.dataValues as any;
    acc[data.mood] = data.count;
    return acc;
  }, {} as { [mood: string]: number });

  const mostFrequentMood =
    moodLogs.length > 0 ? moodLogs[0].getDataValue("mood") : null;

  // Calculate average rating
  const avgRatingResult = await MoodLog.findOne({
    where: {
      userId,
      logDate: {
        [Op.between]: [startDate, endDate],
      },
    },
    attributes: [
      [Sequelize.fn("AVG", Sequelize.col("rating")), "averageRating"],
    ],
  });

  const average = avgRatingResult?.dataValues as any;
  console.log(average);

  const averageRating = parseFloat(average.averageRating || 0);

  return {
    averageRating,
    mostFrequentMood,
    moodDistribution,
  };
};

interface SymptomSummary {
  mostSeverity: string;
  mostFrequentSymptom: string | null;
  symptomDistribution: { [symptom: string]: number };
}

export const generateSymptomSummary = async (
  userId: string,
  startDate: Date,
  endDate: Date
): Promise<SymptomSummary> => {
  // Fetch symptom distribution
  const symptomLogs = await SymptomLog.findAll({
    where: {
      userId,
      logDate: {
        [Op.between]: [startDate, endDate],
      },
    },
    attributes: [
      "symptom",
      [Sequelize.fn("COUNT", Sequelize.col("symptom")), "count"],
    ],
    group: ["symptom"],
    order: [[Sequelize.literal("count"), "DESC"]],
  });

  const symptomDistribution = symptomLogs.reduce((acc, log) => {
    const logData = log.dataValues as any;
    acc[logData.symptom] = parseInt(logData.count, 10);
    return acc;
  }, {} as { [symptom: string]: number });

  const mostFrequentSymptom =
    symptomLogs.length > 0 ? symptomLogs[0].getDataValue("symptom") : null;

  // Find most frequent severity
  const severityResult = await SymptomLog.findAll({
    where: {
      userId,
      logDate: {
        [Op.between]: [startDate, endDate],
      },
    },
    attributes: [
      "severity",
      [Sequelize.fn("COUNT", Sequelize.col("severity")), "most_severity"],
    ],
    group: ["severity"],
    order: [[Sequelize.literal("most_severity"), "DESC"]],
  });

  console.log(severityResult);
  const mostSeverity = severityResult[0]?.dataValues.severity || "";

  return {
    mostSeverity,
    mostFrequentSymptom,
    symptomDistribution,
  };
};
