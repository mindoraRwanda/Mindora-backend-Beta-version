import { PoolClient } from "pg";
import pool from "../db";

interface Mood {
  id: string;
  mood: string;
  userId: string;
  rating: number;
  description: string;
  condition: string;
}

export const createMood = async (mood: Mood) => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO moods (id, userId, mood, rating, description, condition) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        mood.id,
        mood.userId,
        mood.mood,
        mood.rating,
        mood.description,
        mood.condition,
      ]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};

export const updateUserMood = async (mood: Mood) => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `UPDATE moods SET mood = $1, rating = $2, description = $3, condition = $4 WHERE id = $5 RETURNING *`,
      [mood.mood, mood.rating, mood.description, mood.condition, mood.id]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};

export const getUserMood = async (
  userId: string
): Promise<Mood[] | undefined> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `SELECT * FROM moods WHERE userId = $1`,
      [userId]
    );
    if (rows.length === 0) {
      return undefined;
    }
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};

export const deleteUserMood = async (id: string): Promise<Mood | undefined> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `DELETE FROM moods WHERE id = $1 RETURNING *`,
      [id]
    );
    if (rows.length === 0) {
      console.log("rows deleted", rows);
      return;
    }
    return rows[0];
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};
