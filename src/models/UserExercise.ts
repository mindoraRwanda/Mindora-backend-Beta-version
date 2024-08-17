import { PoolClient } from "pg";
import pool from "../db";

enum Status {
  Started = "Started",
  Completed = "Completed",
}
// Tracks user progress on exercises
interface UserExercise {
  id: string;
  userId: string;
  exerciseId: string;
  completedAt: Date;
  score: number;
  status: Status;
}

export const createUserExercise = async (
  userExercise: UserExercise
): Promise<UserExercise> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO user_exercises (id, user_id, exercise_id, completed_at, score, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        userExercise.id,
        userExercise.userId,
        userExercise.exerciseId,
        userExercise.completedAt,
        userExercise.score,
        userExercise.status,
      ]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
};

export const updateTargetUserExercise = async (
  userExercise: UserExercise
): Promise<UserExercise> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `UPDATE user_exercises SET user_id = $2, exercise_id = $3, completed_at = $4, score = $5, status = $6 WHERE id = $1 RETURNING *`,
      [
        userExercise.id,
        userExercise.userId,
        userExercise.exerciseId,
        userExercise.completedAt,
        userExercise.score,
        userExercise.status,
      ]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
};

export const retrieveUserExercise = async (
  userId: string,
  exerciseId: string
): Promise<UserExercise> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `SELECT * FROM user_exercises WHERE user_id = $1 AND exercise_id = $2`,
      [userId, exerciseId]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
};

export const removeUserExercise = async (
  userExerciseId: string
): Promise<UserExercise> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `DELETE FROM user_exercises WHERE id = $1 RETURNING *`,
      [userExerciseId]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
};
