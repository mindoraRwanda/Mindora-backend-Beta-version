import { PoolClient } from "pg";
import pool from "../db";

//Stores information about each mental health exercise
interface Exercise {
  id: string;
  title: string;
  description: string;
  difficultyLevel: number;
  category: string;
}

export const createExercise = async (exercise: Exercise): Promise<Exercise> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO exercises (id, title, description, category, difficulty_level) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        exercise.id,
        exercise.title,
        exercise.description,
        exercise.category,
        exercise.difficultyLevel,
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

export const updateTargetExercise = async (
  exercise: Exercise
): Promise<Exercise> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `UPDATE exercises SET title = $2, description = $3, category = $4, difficulty_level = $5 WHERE id = $1 RETURNING *`,
      [
        exercise.id,
        exercise.title,
        exercise.description,
        exercise.category,
        exercise.difficultyLevel,
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

export const getAllExercises = async (): Promise<Exercise[]> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(`SELECT * FROM exercises`);
    return rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
};

export const removeExercise = async (id: string): Promise<Exercise> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `DELETE FROM exercises WHERE id = $1 RETURNING *`,
      [id]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
};
