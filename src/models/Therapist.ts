import { PoolClient } from 'pg';
import pool from '../db';

interface Therapist {
  id: string;
  email: string;
  password: string;
  approved: boolean;
}

export const createTherapist = async (therapist: Therapist) => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO therapists (email, password, approved) VALUES ($1, $2, $3) RETURNING *`,
      [therapist.email, therapist.password, therapist.approved]
    );
    return rows[0];
  } finally {
    client.release();
  }
};

export const getTherapistByEmail = async (email: string) => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(`SELECT * FROM therapists WHERE email = $1`, [email]);
    return rows[0];
  } finally {
    client.release();
  }
};

export const updateTherapistApproval = async (id: string, approved: boolean) => {
  const client: PoolClient = await pool.connect();
  try {
    console.log(`Updating therapist ${id} approval status to ${approved}`);
    const { rows } = await client.query(
      `UPDATE therapists SET approved = $1 WHERE id = $2 RETURNING *`,
      [approved, id]
    );
    console.log(`Update result: ${JSON.stringify(rows)}`);
    return rows[0];
  } finally {
    client.release();
  }
};
