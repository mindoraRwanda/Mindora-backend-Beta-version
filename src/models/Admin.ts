import { PoolClient } from 'pg';
import pool from '../db';

interface Admin {
  id: string;
  email: string;
  password: string;
}

export const createAdmin = async (admin: Admin) => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO admins (email, password) VALUES ($1, $2) RETURNING *`,
      [admin.email, admin.password]
    );
    return rows[0];
  } finally {
    client.release();
  }
};

export const getAdminByEmail = async (email: string) => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(`SELECT * FROM admins WHERE email = $1`, [email]);
    return rows[0];
  } finally {
    client.release();
  }
};
