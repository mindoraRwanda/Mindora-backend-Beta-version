import { PoolClient } from "pg";
import pool from "../db";
import { v4 as uuidv4 } from "uuid";

// Generate a new unique identifier
const uniqueId = uuidv4();
console.log("Generated UUID:", uniqueId);

interface chat {
  id: string;
  chatName: string;
  isCommunity: boolean;
  userId: string;
}

interface chatMembers {
  chatId: string;
  userId: string;
  role: string;
}

export const createChatRoom = async (chat: chat) => {
  const client: PoolClient = await pool.connect();
  try {
    const existingChat = await client.query(
      "SELECT * FROM chats JOIN chatMembers cm ON chats.id = cm.chatId WHERE cm.userId = $1 and chat.isCommunity = $2 RETURNING *",
      [chat.userId, chat.isCommunity]
    );
    if (existingChat) {
      return "Chat already exists!";
    }
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
      `SELECT c.chatId, c.chatName FROM chats c JOIN chatMembers cm ON c.id = cm.chatId WHERE cm.userId = $1 RETURNING *`,
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
      `SELECT cm1.chatId
FROM chatMembers cm1
JOIN chatMembers cm2 ON cm1.chatId = cm2.chatId
WHERE cm1.userId = $1
AND cm2.userId = $2
GROUP BY cm1.chatId
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
