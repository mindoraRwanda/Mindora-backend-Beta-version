import { PoolClient } from "pg";
import pool from "../db";

interface Message {
  id: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  text: string;
}

export const createMsg = async (msg: Message) => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO messages (id, chatId, senderId, receiverId, text) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [msg.id, msg.chatId, msg.senderId, msg.receiverId, msg.text]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};

interface MsgToUpdate {
  id: string;
  senderId: string;
  newMessage: string;
}
export const updateMsg = async (msg: MsgToUpdate): Promise<any> => {
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

export const deleteMsg = async (id: string): Promise<any> => {
  /// will need to add controll of who can and who cannot delete message
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

export const getMessages = async (chatId: string): Promise<any> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `SELECT * FROM messages WHERE chatId = $1`,
      [chatId]
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
