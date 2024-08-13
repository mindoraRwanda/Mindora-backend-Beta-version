// src/models/Appointment.ts

import { PoolClient } from 'pg';
import pool from '../db'; // Ensure this is the correct path to your pool instance

interface Appointment {
  id?: number;
  userId: number;
  providerId: number;
  appointmentTime: Date;
  status?: string;
}

// Create a new appointment
export const createAppointment = async (appointment: Appointment) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO appointments (user_id, provider_id, appointment_time, status) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [appointment.userId, appointment.providerId, appointment.appointmentTime, appointment.status]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error creating appointment:', err);
    throw err;
  } finally {
    client.release();
  }
};

// Update an existing appointment
export const updateAppointment = async (id: number, updateData: Partial<Appointment>) => {
  const client: PoolClient = await pool.connect();
  try {
    const fields = Object.keys(updateData).map((key, index) => `${key} = $${index + 1}`).join(', ');
    const values = Object.values(updateData);
    values.push(id);

    const result = await client.query(
      `UPDATE appointments SET ${fields} WHERE id = $${values.length} RETURNING *`,
      values
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  } catch (err) {
    console.error('Error updating appointment:', err);
    throw err;
  } finally {
    client.release();
  }
};

// Delete an appointment
export const deleteAppointment = async (id: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `DELETE FROM appointments WHERE id = $1 RETURNING*`,
      [id]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  } catch (err) {
    console.error('Error deleting appointment:', err);
    throw err;
  } finally {
    client.release();
  }
};

// Get appointments for a user
export const getAppointments = async (userId: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM appointments WHERE userId = $1`,
      [userId]
    );
    return result.rows;
  } catch (err) {
    console.error('Error retrieving appointments:', err);
    throw err;
  } finally {
    client.release();
  }
};
