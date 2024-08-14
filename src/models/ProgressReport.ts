import { PoolClient } from "pg";
import pool from "../db";
import { v4 as uuidv4 } from "uuid";

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
    };

    // Insert the report into the database
    const { rows } = await client.query(
      `
      INSERT INTO Reports (id, userId, startDate, endDate, moodSummary, symptomSummary)
      VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [
        report.id,
        report.userId,
        report.startDate,
        report.endDate,
        JSON.stringify(report.moodSummary),
        JSON.stringify(report.symptomSummary),
      ]
    );

    return rows[0];
  } catch (err) {
    console.error("Failed to generate report:", err);
    throw new Error("Failed to generate report.");
  } finally {
    client.release();
  }
};

// get the progress report

export const getProgressReportById = async (
  id: string
): Promise<Report | null> => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `
      SELECT *
      FROM ProgressReports
      WHERE id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } catch (err) {
    console.error("Failed to retrieve report:", err);
    throw new Error("Failed to retrieve report.");
  } finally {
    client.release();
  }
};

export const getProgressReportsByUserId = async (
  userId: string,
  startDate?: Date,
  endDate?: Date
): Promise<Report[]> => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `
      SELECT *
      FROM ProgressReports
      WHERE userId = $1
      AND ($2::date IS NULL OR startDate >= $2)
      AND ($3::date IS NULL OR endDate <= $3)
      `,
      [userId, startDate, endDate]
    );

    return result.rows[0];
  } catch (err) {
    console.error("Failed to retrieve reports:", err);
    throw new Error("Failed to retrieve reports.");
  } finally {
    client.release();
  }
};

// update the report

export const updateUserProgressReport = async (
  reportId: string,
  updatedMoodSummary: MoodSummary,
  updatedSymptomSummary: SymptomSummary
): Promise<Report | null> => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `
      UPDATE ProgressReports
      SET moodSummary = $1, symptomSummary = $2, updatedAt = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
      `,
      [
        JSON.stringify(updatedMoodSummary),
        JSON.stringify(updatedSymptomSummary),
        reportId,
      ]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (err) {
    console.error("Failed to update report:", err);
    throw new Error("Failed to update report.");
  } finally {
    client.release();
  }
};

// Delete a Progress Report

export const deleteUserProgressReport = async (
  reportId: string
): Promise<boolean> => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `
      DELETE FROM ProgressReports
      WHERE id = $1 RETURNING *
      `,
      [reportId]
    );

    return result.rows[0];
  } catch (err) {
    console.error("Failed to delete report:", err);
    throw new Error("Failed to delete report.");
  } finally {
    client.release();
  }
};
