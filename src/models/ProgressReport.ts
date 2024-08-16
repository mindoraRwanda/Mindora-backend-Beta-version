import { PoolClient } from "pg";
import pool from "../db";
import { v4 as uuidv4 } from "uuid";

interface MoodSummary {
  averageRating: number;
  mostFrequentMood: string | null;
  moodDistribution?: { [mood: string]: number }; // Example: { "Happy": 10, "Sad": 5 }
}

interface SymptomSummary {
  mostSeverity: string;
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
): Promise<MoodSummary> => {
  console.log("mood: ", startDate);
  console.log("mood: ", endDate);
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `
      SELECT mood, COUNT(*) AS count
      FROM moods
      WHERE userId = $1
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
      FROM moods
      WHERE userId = $1
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
    FROM moods
    WHERE userId = $1
    AND date BETWEEN $2 AND $3;
  `,
      [userId, startDate, endDate]
    );

    const averageRating = parseFloat(queryResult.rows[0]?.average_rating || 0);
    const moodSummary = {
      averageRating: averageRating,
      mostFrequentMood: mostFrequentMood,
      moodDistribution: moodDistribution,
    };
    return moodSummary;
  } catch (err) {
    console.log(err);
    throw err;
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
    console.log("symproms: ", startDate);
    console.log("symptoms: ", endDate);
    // Symptom distribution query
    const distributionResult = await client.query(
      `
      SELECT symptom, COUNT(*) AS count
      FROM symptoms
      WHERE userId = $1
      AND onset BETWEEN $2 AND $3
      GROUP BY symptom
    `,
      [userId, startDate, endDate]
    );

    console.log("distribution symptom: ", distributionResult.rows);

    const symptomDistribution = distributionResult.rows.reduce((acc, row) => {
      acc[row.symptom] = parseInt(row.count, 10);
      return acc;
    }, {} as { [symptom: string]: number });

    // Most frequent symptom query
    const frequentSymptomResult = await client.query(
      `
      SELECT symptom, COUNT(*) AS count
      FROM symptoms
      WHERE userId = $1
      AND onset BETWEEN $2 AND $3
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
      SELECT severity, COUNT(*) AS most_severity
      FROM symptoms
      WHERE userId = $1
      AND onset BETWEEN $2 AND $3
      GROUP BY severity
      ORDER BY most_severity DESC
      LIMIT 1
    `,
      [userId, startDate, endDate]
    );

    const mostSeverity = severityResult.rows[0]?.severity || "";

    // Constructing the SymptomSummary object
    const symptomSummary: SymptomSummary = {
      mostSeverity: mostSeverity,
      mostFrequentSymptom: mostFrequentSymptom,
      symptomDistribution: symptomDistribution,
    };

    return symptomSummary;
  } catch (err) {
    console.error(err);
    throw err;
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
    const moodSummary: MoodSummary = await generateMoodSummary(
      userId,
      startDate,
      endDate
    );

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
      INSERT INTO progress_reports (id, user_id, start_date, end_date, mood_summary, symptom_summary)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
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
    throw err;
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
      FROM progress_reports
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
    throw err;
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
  console.log(userId, startDate, endDate);
  try {
    const result = await client.query(
      `
      SELECT *
      FROM progress_reports
      WHERE user_id = $1
      AND ($2::date IS NULL OR start_date >= $2)
      AND ($3::date IS NULL OR end_date <= $3)
      `,
      [userId, startDate, endDate]
    );
    console.log("result", result.rows[0]);
    return result.rows[0];
  } catch (err) {
    console.error("Failed to retrieve reports:", err);
    throw err;
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
      UPDATE progress_reports
      SET mood_summary = $1, symptom_summary = $2, updated_at = CURRENT_TIMESTAMP
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
    throw err;
  } finally {
    client.release();
  }
};

// Delete a Progress Report

export const deleteUserProgressReport = async (
  reportId: string
): Promise<Report> => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `
      DELETE FROM progress_reports
      WHERE id = $1 RETURNING *
      `,
      [reportId]
    );

    return result.rows[0];
  } catch (err) {
    console.error("Failed to delete report:", err);
    throw err;
  } finally {
    client.release();
  }
};
