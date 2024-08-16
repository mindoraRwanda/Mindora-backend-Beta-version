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
