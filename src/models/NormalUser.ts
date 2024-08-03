import { PoolClient } from 'pg';
import pool from '../db';

interface NormalUser {
  id: string;
  email: string;
  password: string;
}

export const createNormalUser = async (user: NormalUser) => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO normal_users (email, password) VALUES ($1, $2) RETURNING *`,
      [user.email, user.password]
    );
    return rows[0];
  } finally {
    client.release();
  }
};

export const getNormalUserByEmail = async (email: string) => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(`SELECT * FROM normal_users WHERE email = $1`, [email]);
    return rows[0];
  } finally {
    client.release();
  }
};
