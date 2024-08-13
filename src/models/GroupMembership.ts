// src/models/GroupMembership.ts

import { PoolClient } from 'pg';
import pool from '../db'; // Ensure this is the correct path to your pool instance

interface GroupMembership {
  id?: number;
  userId: number;
  groupId: number;
  joinedAt?: Date;
}

// Create a new group membership
export const createGroupMembership = async (membership: GroupMembership) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO group_memberships (userId, groupId, joinedAt) 
       VALUES ($1, $2, $3) RETURNING *`,
      [membership.userId, membership.groupId, membership.joinedAt || new Date()]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error creating group membership:', err);
    throw err;
  } finally {
    client.release();
  }
};

// Update an existing group membership
export const updateGroupMembership = async (id: number, updateData: Partial<GroupMembership>) => {
  const client: PoolClient = await pool.connect();
  try {
    const fields = Object.keys(updateData).map((key, index) => `${key} = $${index + 1}`).join(', ');
    const values = Object.values(updateData);
    values.push(id);

    const result = await client.query(
      `UPDATE group_memberships SET ${fields} WHERE id = $${values.length} RETURNING *`,
      values
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  } catch (err) {
    console.error('Error updating group membership:', err);
    throw err;
  } finally {
    client.release();
  }
};

// Delete a group membership
export const deleteGroupMembership = async (id: number) => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      `DELETE FROM group_memberships WHERE id = $1 RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) return null;
    return result.rows[0];
  } catch (err) {
    console.error('Error deleting group membership:', err);
    throw err;
  } finally {
    client.release();
  }
};

// Get all memberships for a user or group
export const getGroupMemberships = async (userId: number | null = null, groupId: number | null = null) => {
  const client: PoolClient = await pool.connect();
  try {
    let query = 'SELECT * FROM group_memberships';
    const params: any[] = [];
    
    if (userId && groupId) {
      query += ' WHERE userId = $1 AND groupId = $2';
      params.push(userId, groupId);
    } else if (userId) {
      query += ' WHERE userId = $1';
      params.push(userId);
    } else if (groupId) {
      query += ' WHERE groupId = $1';
      params.push(groupId);
    }

    const result = await client.query(query, params);
    return result.rows;
  } catch (err) {
    console.error('Error retrieving group memberships:', err);
    throw err;
  } finally {
    client.release();
  }
};
