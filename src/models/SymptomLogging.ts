// src/models/SymptomLogging.ts

import { PoolClient } from 'pg';
import pool from '../db'; // Ensure this is the correct path to your pool instance

interface SymptomLogging {
  userId: number;
  symptom: string;
  severity: number;
  loggedAt?: Date;
}

// Create a new symptom logging entry
export const createSymptomLogging = async (entry: SymptomLogging) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO symptom_logging (userId, symptom, severity, loggedAt)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [entry.userId, entry.symptom, entry.severity, entry.loggedAt || new Date()]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error creating symptom logging entry:', err);
    throw err;
  } finally {
    client.release();
  }
};

// Update an existing symptom logging entry
export const updateSymptomLogging = async (id: number, updatedEntry: Partial<SymptomLogging>) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `UPDATE symptom_logging
       SET symptom = COALESCE($1, symptom),
           severity = COALESCE($2, severity),
           loggedAt = COALESCE($3, loggedAt)
       WHERE id = $4 RETURNING *`,
      [updatedEntry.symptom, updatedEntry.severity, updatedEntry.loggedAt, id]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  } catch (err) {
    console.error('Error updating symptom logging entry:', err);
    throw err;
  } finally {
    client.release();
  }
};

// Delete a symptom logging entry
export const deleteSymptomLogging = async (id: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `DELETE FROM symptom_logging WHERE id = $1 RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  } catch (err) {
    console.error('Error deleting symptom logging entry:', err);
    throw err;
  } finally {
    client.release();
  }
};

// Get a symptom logging entry by ID
export const getSymptomLogging = async (id: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM symptom_logging WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error retrieving symptom logging entry:', err);
    throw err;
  } finally {
    client.release();
  }
};

// Get all symptom logging entries for a user
export const getUserSymptomLoggings = async (userId: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM symptom_logging WHERE userId = $1`,
      [userId]
    );
    return result.rows;
  } catch (err) {
    console.error('Error retrieving symptom logging entries for user:', err);
    throw err;
  } finally {
    client.release();
  }
};
