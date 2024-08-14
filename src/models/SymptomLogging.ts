import { PoolClient } from "pg";
import pool from "../db";

enum Severity {
  Mild = "Mild",
  Moderate = "Moderate",
  Severe = "Severe",
}

enum Frequency {
  Daily = "Daily",
  Weekly = "Weekly",
  Monthly = "Monthly",
}

interface Symptom {
  id: string;
  userId: string;
  symptom: string;
  severity: Severity; // Enforces the use of Severity enum values
  frequency: Frequency; // Enforces the use of Frequency enum values
  onset: Date;
  description: string;
}

export const addUserSymptoms = async (
  symptom: Symptom
): Promise<Symptom | undefined> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO symptoms (id, userId, symptom, severity, frequency, onset, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        symptom.id,
        symptom.userId,
        symptom.symptom,
        symptom.severity,
        symptom.frequency,
        symptom.onset,
        symptom.description,
      ]
    );
    return rows[0];
  } finally {
    client.release();
  }
};

export const getUserSymptoms = async (userId: string): Promise<Symptom[]> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `SELECT * FROM symptoms WHERE symptoms.userId = $1`,
      [userId]
    );
    return rows[0];
  } finally {
    client.release();
  }
};

export const updateUserSymptoms = async (
  symptom: Symptom
): Promise<Symptom | undefined> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `UPDATE symptoms SET symptom = $1, severity = $2, frequency = $3, onset = $4, description = $5 WHERE id = $6 RETURNING *`,
      [
        symptom.symptom,
        symptom.severity,
        symptom.frequency,
        symptom.onset,
        symptom.description,
        symptom.id,
      ]
    );
    return rows[0];
  } finally {
    client.release();
  }
};

export const deleteUserSymptoms = async (id: string): Promise<Symptom[]> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `DELETE FROM symptoms WHERE symptoms.id = $1 RETURNING *`,
      [id]
    );
    return rows[0];
  } finally {
    client.release();
  }
};
