import { PoolClient } from "pg";
import pool from "../db";
// -- Table to store individual responses to exercises
// CREATE TABLE UserExerciseResponses (
//     id SERIAL PRIMARY KEY,
//     user_exercise_id INT REFERENCES UserExercises(id),
//     question_id INT,
//     response TEXT,
//     is_correct BOOLEAN,
//     response_time TIMESTAMP DEFAULT NOW()
// );

interface UserExerciseResponse {
  id: string;
  userExerciseId: string;
  questionId: string;
  response: string;
  isCorrect: boolean;
  responseTime: Date;
}

export const createUserExerciseResponse = async (
  userResponse: UserExerciseResponse
): Promise<UserExerciseResponse> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO user_exercise_responses (id, user_exercise_id, question_id, response, is_correct, response_time) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        userResponse.id,
        userResponse.userExerciseId,
        userResponse.questionId,
        userResponse.response,
        userResponse.isCorrect,
        userResponse.responseTime,
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

export const updateExerciseResponse = async (
  userResponse: UserExerciseResponse
): Promise<UserExerciseResponse> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `UPDATE user_exercise_responses SET user_exercise_id = $2, question_id = $3, response = $4, is_correct = $5, response_time = $6 WHERE id = $1 RETURNING *`,
      [
        userResponse.id,
        userResponse.userExerciseId,
        userResponse.questionId,
        userResponse.response,
        userResponse.isCorrect,
        userResponse.responseTime,
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

export const retrieveUserExerciseResponse = async (
  userResponseId: string
): Promise<UserExerciseResponse> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `SELECT * FROM user_exercise_responses WHERE id = $1`,
      [userResponseId]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
};

export const removeUserExerciseResponse = async (
  userResponseId: string
): Promise<UserExerciseResponse> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `DELETE FROM user_exercise_responses WHERE id = $1 RETURNING *`,
      [userResponseId]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
};
