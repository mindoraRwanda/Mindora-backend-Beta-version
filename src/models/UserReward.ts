import { PoolClient } from "pg";
import pool from "../db";

//Tracks rewards earned by users.
interface UserReward {
  id: string;
  userId: string;
  rewardId: string;
  earnedAt: Date;
}

export const createUserReward = async (
  userReward: UserReward
): Promise<UserReward> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO user_rewards (id, user_id, reward_id, earned_at) VALUES ($1, $2, $3, $4) RETURNING *`,
      [
        userReward.id,
        userReward.userId,
        userReward.rewardId,
        userReward.earnedAt,
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

export const updateTargetUserReward = async (
  userReward: UserReward
): Promise<UserReward> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `UPDATE user_rewards SET user_id = $2, reward_id = $3, earned_at = $4 WHERE id = $1 RETURNING *`,
      [
        userReward.id,
        userReward.userId,
        userReward.rewardId,
        userReward.earnedAt,
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

export const retrieveUserReward = async (id: string): Promise<UserReward> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `SELECT * FROM user_rewards WHERE id = $1`,
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

export const removeUserReward = async (id: string): Promise<UserReward> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `DELETE FROM user_rewards WHERE id = $1 RETURNING *`,
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
