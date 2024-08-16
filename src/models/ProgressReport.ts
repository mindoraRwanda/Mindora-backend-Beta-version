import { PoolClient } from "pg";
import pool from "../db";
import { v4 as uuidv4 } from "uuid";

// CREATE TABLE ProgressReports (
//     report_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//     user_id UUID NOT NULL,
//     start_date DATE NOT NULL,
//     end_date DATE NOT NULL,
//     mood_summary JSONB,
//     symptom_summary JSONB,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (user_id) REFERENCES Users(user_id)
// );

interface MoodSummary {
  averageRating: number;
  mostFrequentMood: string | null;
  moodDistribution?: { [mood: string]: number }; // Example: { "Happy": 10, "Sad": 5 }
}

interface SymptomSummary {
  averageSeverity: number;
  mostFrequentSymptom: string;
  symptomDistribution?: { [symptom: string]: number | undefined }; // Example: { "Fatigue": 7, "Headache": 3 }
}

interface Report {
  id: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  moodSummary: MoodSummary;
  symptomSummary: SymptomSummary;
  createdAt?: Date;
  updatedAt?: Date;
}

const generateMoodSummary = async (
  userId: string,
  startDate: Date,
  endDate: Date
): Promise<MoodSummary | undefined> => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `
      SELECT mood, COUNT(*) AS count
      FROM Moods
      WHERE user_id = $1
      AND date BETWEEN $2 AND $3
      GROUP BY mood
    `,
      [userId, startDate, endDate]
    );

    const moodDistribution = result.rows.reduce((acc, row) => {
      acc[row.mood] = parseInt(row.count, 10);
      return acc;
    }, {});

    // find frequent mood
    const query = await client.query(
      `
      SELECT mood, COUNT(*) AS count
      FROM Moods
      WHERE user_id = $1
      AND date BETWEEN $2 AND $3
      GROUP BY mood
      ORDER BY count DESC
      LIMIT 1
    `,
      [userId, startDate, endDate]
    );

    const mostFrequentMood = query.rows[0]?.mood || null;

    // calculate average rating
    const queryResult = await client.query(
      `
    SELECT AVG(rating) AS average_rating
    FROM Moods
    WHERE user_id = $1
    AND date BETWEEN $2 AND $3;
  `,
      [userId, startDate, endDate]
    );

    const averageRating = parseFloat(result.rows[0]?.average_rating || 0);
    const moodSummary = {
      averageRating: averageRating,
      mostFrequentMood: mostFrequentMood,
      moodDistribution: moodDistribution,
    };
    return moodSummary;
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};

const generateSymptomSummary = async (
  userId: string,
  startDate: Date,
  endDate: Date
): Promise<SymptomSummary> => {
  const client: PoolClient = await pool.connect();
  try {
    // Symptom distribution query
    const distributionResult = await client.query(
      `
      SELECT symptom, COUNT(*) AS count
      FROM Symptoms
      WHERE user_id = $1
      AND date BETWEEN $2 AND $3
      GROUP BY symptom
    `,
      [userId, startDate, endDate]
    );

    const symptomDistribution = distributionResult.rows.reduce((acc, row) => {
      acc[row.symptom] = parseInt(row.count, 10);
      return acc;
    }, {} as { [symptom: string]: number });

    // Most frequent symptom query
    const frequentSymptomResult = await client.query(
      `
      SELECT symptom, COUNT(*) AS count
      FROM Symptoms
      WHERE user_id = $1
      AND date BETWEEN $2 AND $3
      GROUP BY symptom
      ORDER BY count DESC
      LIMIT 1
    `,
      [userId, startDate, endDate]
    );

    const mostFrequentSymptom = frequentSymptomResult.rows[0]?.symptom || null;

    // Average severity query
    const severityResult = await client.query(
      `
      SELECT AVG(severity) AS average_severity
      FROM Symptoms
      WHERE user_id = $1
      AND date BETWEEN $2 AND $3
    `,
      [userId, startDate, endDate]
    );

    const averageSeverity = parseFloat(
      severityResult.rows[0]?.average_severity || 0
    );

    // Constructing the SymptomSummary object
    const symptomSummary: SymptomSummary = {
      averageSeverity: averageSeverity,
      mostFrequentSymptom: mostFrequentSymptom,
      symptomDistribution: symptomDistribution,
    };

    return symptomSummary;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to generate symptom summary.");
  } finally {
    client.release();
  }
};

export const generateReport = async (
  userId: string,
  startDate: Date,
  endDate: Date
): Promise<Report> => {
  const client: PoolClient = await pool.connect();
  try {
    // Generate mood summary
    const moodSummary: MoodSummary = (await generateMoodSummary(
      userId,
      startDate,
      endDate
    )) || { averageRating: 0, mostFrequentMood: null, moodDistribution: {} };

    // Generate symptom summary
    const symptomSummary: SymptomSummary = await generateSymptomSummary(
      userId,
      startDate,
      endDate
    );

    // Construct the report
    const report: Report = {
      id: uuidv4(),
      userId: userId,
      startDate: startDate,
      endDate: endDate,
      moodSummary: moodSummary,
      symptomSummary: symptomSummary,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert the report into the database
    await client.query(
      `
      INSERT INTO Reports (id, user_id, start_date, end_date, mood_summary, symptom_summary, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `,
      [
        report.id,
        report.userId,
        report.startDate,
        report.endDate,
        JSON.stringify(report.moodSummary),
        JSON.stringify(report.symptomSummary),
        report.createdAt,
        report.updatedAt,
      ]
    );

    return report;
  } catch (err) {
    console.error("Failed to generate report:", err);
    throw new Error("Failed to generate report.");
  } finally {
    client.release();
  }
};
