// src/models/SystemConfiguration.ts

import { PoolClient } from 'pg';
import pool from '../db'; // Ensure this is the correct path to your pool instance

interface SystemConfiguration {
  key: string;
  value?: string;
}

// Create or update a system configuration
export const upsertSystemConfiguration = async (config: SystemConfiguration) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO system_configurations (key, value)
       VALUES ($1, $2)
       ON CONFLICT (key) 
       DO UPDATE SET value = EXCLUDED.value
       RETURNING *`,
      [config.key, config.value]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error upserting system configuration:', err);
    throw err;
  } finally {
    client.release();
  }
};

// Delete a system configuration
export const deleteSystemConfiguration = async (key: string) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `DELETE FROM system_configurations WHERE key = $1 RETURNING *`,
      [key]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  } catch (err) {
    console.error('Error deleting system configuration:', err);
    throw err;
  } finally {
    client.release();
  }
};

// Get a system configuration by key
export const getSystemConfiguration = async (key: string) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM system_configurations WHERE key = $1`,
      [key]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error retrieving system configuration:', err);
    throw err;
  } finally {
    client.release();
  }
};

// Get all system configurations
export const getAllSystemConfigurations = async () => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM system_configurations`
    );
    return result.rows;
  } catch (err) {
    console.error('Error retrieving all system configurations:', err);
    throw err;
  } finally {
    client.release();
  }
};
