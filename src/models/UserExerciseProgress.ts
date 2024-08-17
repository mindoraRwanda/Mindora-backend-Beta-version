import { PoolClient } from "pg";
import pool from "../db";

export const calculateUserExerciseProgress = async (
  userExerciseId: string
): Promise<number> => {
  const client: PoolClient = await pool.connect();
  try {
    const responses = await client.query(
      `SELECT is_correct, COUNT(*) AS count FROM user_exercise_responses WHERE user_exercise_id = $1 GROUP BY is_correct`,
      [userExerciseId]
    );

    let correct = 0;
    let totalAnswers = 0;

    responses.rows.forEach((row) => {
      totalAnswers += parseInt(row.count, 10);
      if (row.is_correct) {
        correct += parseInt(row.count, 10);
      }
    });

    const progress = totalAnswers > 0 ? (correct / totalAnswers) * 100 : 0;
    return progress;
  } catch (err) {
    console.error("Error calculating user exercise progress:", err);
    throw err;
  } finally {
    client.release();
  }
};
