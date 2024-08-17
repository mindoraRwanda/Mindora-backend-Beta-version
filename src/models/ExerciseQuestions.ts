import { PoolClient } from "pg";
import pool from "../db";
// CREATE TABLE ExerciseQuestion (
//     question_id SERIAL PRIMARY KEY,
//     exercise_id INT REFERENCES Exercises(id),
//     question TEXT,
//     correct_answer TEXT
// );
interface ExerciseQuestion {
  id: string;
  // questionId: string;
  exerciseId: string;
  question: string;
  correctAnswer: string;
}

export const createExerciseQuestion = async (
  question: ExerciseQuestion
): Promise<ExerciseQuestion> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO exercises (id, excercise_id, question, correct_answer) VALUES ($1, $2, $3, $4) RETURNING *`,
      [
        question.id,
        question.exerciseId,
        question.question,
        question.correctAnswer,
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

export const updateTargetExerciseQuestion = async (
  question: ExerciseQuestion
): Promise<ExerciseQuestion> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `UPDATE exercises SET excercise_id = $2, question = $3, correct_answer = $4 WHERE id = $1 RETURNING *`,
      [
        question.id,
        question.exerciseId,
        question.question,
        question.correctAnswer,
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

export const retrieveExerciseQuestion = async (
  questionId: string
): Promise<ExerciseQuestion> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `SELECT * FROM exercises WHERE id = $1`,
      [questionId]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
};

export const removeExerciseQuestion = async (
  questionId: string
): Promise<ExerciseQuestion> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `DELETE FROM exercises WHERE id = $1 RETURNING *`,
      [questionId]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
};
