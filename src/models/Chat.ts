import { PoolClient } from "pg";
import pool from "../db";
import { v4 as uuidv4 } from "uuid";

// Generate a new UUID
const uniqueId = uuidv4();
console.log("Generated UUID:", uniqueId);

interface chat {
  id: string;
  chatName: string;
  isCommunity: boolean;
}

interface chatMembers {
  chatId: string;
  userId: string;
  role: string;
}

export const createChatRoom = async (chat: chat) => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO chats (id, chatName, isCommunity) VALUES ($1, $2, $3) RETURNING *`,
      [chat.id, chat.chatName, chat.isCommunity]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};

export const getAllUserChats = async (userId: string) => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `SELECT c.chat_id, c.chat_name FROM chats c JOIN chat_members cm ON c.chat_id = cm.chat_id WHERE cm.user_id = $1 RETURNING *`,
      [userId]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};

export const getOneChat = async (senderId: string, receiverId: string) => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `SELECT cm1.chat_id
FROM chat_members cm1
JOIN chat_members cm2 ON cm1.chat_id = cm2.chat_id
WHERE cm1.user_id = $1
AND cm2.user_id = $2
GROUP BY cm1.chat_id
HAVING COUNT(*) = 2 RETURNING *`,
      [senderId, receiverId]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};

export const deleteChat = async (chatId: string) => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `DELETE FROM chats WHERE id = $1 RETURNING *`,
      [chatId]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};

export const addUserToChat = async (chatMembers: chatMembers) => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO chatMembers (chatId, userId) VALUES($1, $2, $3) RETURNING *`,
      [chatMembers.chatId, chatMembers.userId, chatMembers.role]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};

export const leaveChat = async (chatId: string, userId: string) => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `DELETE FROM chatMembers WHERE chatId = $1 AND userId = $2 RETURNING *`,
      [chatId, userId]
    );
    return rows[0];
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};
