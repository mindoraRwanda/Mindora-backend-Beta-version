// src/models/Notification.ts

import { PoolClient } from 'pg';
import pool from '../db'; // Ensure this is the correct path to your pool instance

interface Notification {
  id?: number;
  userId: number;
  notificationText: string;
  sentAt?: Date;
  type: string;
}

// Create a new notification
export const createNotification = async (notification: Notification) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO notifications (userId, notificationText, sentAt, type) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [
        notification.userId,
        notification.notificationText,
        notification.sentAt || new Date(),
        notification.type
      ]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error creating notification:', err);
    throw err;
  } finally {
    client.release();
  }
};

// Update an existing notification
export const updateNotification = async (id: number, updateData: Partial<Notification>) => {
  const client: PoolClient = await pool.connect();
  try {
    const fields = Object.keys(updateData).map((key, index) => `${key} = $${index + 1}`).join(', ');
    const values = Object.values(updateData);
    values.push(id);

    const result = await client.query(
      `UPDATE notifications SET ${fields} WHERE id = $${values.length} RETURNING *`,
      values
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  } catch (err) {
    console.error('Error updating notification:', err);
    throw err;
  } finally {
    client.release();
  }
};

// Delete a notification
export const deleteNotification = async (id: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `DELETE FROM notifications WHERE id = $1 RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  } catch (err) {
    console.error('Error deleting notification:', err);
    throw err;
  } finally {
    client.release();
  }
};

// Get notifications for a user
export const getNotifications = async (userId: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM notifications WHERE userId = $1`,
      [userId]
    );
    return result.rows;
  } catch (err) {
    console.error('Error retrieving notifications:', err);
    throw err;
  } finally {
    client.release();
  }
};
