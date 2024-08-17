import { PoolClient } from "pg";
import pool from "../db";

// Rewards: Stores information about rewards and achievements.
interface Reward {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
}

export const createReward = async (reward: Reward): Promise<Reward> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO rewards (id, name, description, points_required) VALUES ($1, $2, $3, $4) RETURNING *`,
      [reward.id, reward.name, reward.description, reward.pointsRequired]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
};

export const updateTargetReward = async (reward: Reward): Promise<Reward> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `UPDATE rewards SET name = $2, description = $3, points_required = $4) WHERE id = $1 RETURNING *`,
      [reward.id, reward.name, reward.description, reward.pointsRequired]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
};

export const retrieveReward = async (id: string): Promise<Reward> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(`SELECT * FROM rewards WHERE id = $1`, [
      id,
    ]);
    return rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
};

export const removeReward = async (id: string): Promise<Reward> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `DELETE FROM rewards WHERE id = $1 RETURNING *`,
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
