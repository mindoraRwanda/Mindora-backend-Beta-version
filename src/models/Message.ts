import { PoolClient } from "pg";
import pool from "../db";

interface message {
  id: number;
  senderId: number;
  receiverId: number;
  messageText: string;
  sentAt: Date;
}

export const createMsg = async (msg: message) => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO messages (senderId, receiverId, messageText, sentAt) VALUES ($1, $2, $3, $4) RETURNING *`,
      [msg.senderId, msg.receiverId, msg.messageText, msg.sentAt]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};

interface msgToUpdate {
  id: number;
  senderId: number;
  newMessage: string;
}
export const updateMsg = async (msg: msgToUpdate): Promise<any> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `UPDATE messages SET messageText = $1 WHERE senderId = $2 AND id = $3 RETURNING *`,
      [msg.newMessage, msg.senderId, msg.id]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};

export const deleteMsg = async (id: number): Promise<any> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `DELETE FROM messages WHERE id = $1 RETURNING *`,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};

export const getMessages = async (userId: string): Promise<any> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `SELECT * FROM messages WHERE senderId = $1 RETURNING *`,
      [userId]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};
