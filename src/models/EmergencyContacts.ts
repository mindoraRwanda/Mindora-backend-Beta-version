import { PoolClient } from "pg";
import pool from "../db";

interface EmergencyContact {
  id: string;
  userId: string;
  contactName: string;
  contactInfo: string;
}

interface Hotline {
  id: string;
  contactName: string;
  contactInfo: string;
}

export const saveEmergencyContact = async (
  contact: EmergencyContact
): Promise<EmergencyContact | undefined> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO emergencyContacts (id, userId, contactName, contactInfo) VALUES ($1, $2, $3, $4) RETURNING *`,
      [contact.id, contact.userId, contact.contactName, contact.contactInfo]
    );
    return rows[0];
  } catch (err) {
    console.error("Error saving emergency contact:", err);
    throw err;
  } finally {
    client.release();
  }
};

export const saveHotline = async (
  hotline: Hotline
): Promise<Hotline | undefined> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO hotlines (id, contactName, contactInfo) VALUES ($1, $2, $3) RETURNING *`,
      [hotline.id, hotline.contactName, hotline.contactInfo]
    );
    return rows[0];
  } catch (err) {
    console.error("Error saving hotline:", err);
    throw err;
  } finally {
    client.release();
  }
};

export const getEmergencyContact = async (
  userId: string
): Promise<(EmergencyContact | Hotline)[]> => {
  const client: PoolClient = await pool.connect();
  try {
    const contacts = await client.query(
      `SELECT * FROM emergencyContacts WHERE userId = $1`,
      [userId]
    );

    const hotlines = await client.query(`SELECT * FROM hotlines`);

    let allContacts = [...contacts.rows, ...hotlines.rows];
    return allContacts;
  } catch (err) {
    console.error("Error retrieving contacts:", err);
    throw err;
  } finally {
    client.release();
  }
};

export const getHotline = async (): Promise<Hotline[]> => {
  const client: PoolClient = await pool.connect();
  try {
    const hotlines = await client.query(`SELECT * FROM hotlines`);
    return hotlines.rows;
  } catch (err) {
    console.error("Error retrieving contacts:", err);
    throw err;
  } finally {
    client.release();
  }
};

export const updateEmergencyContact = async (
  contact: EmergencyContact
): Promise<EmergencyContact | undefined> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `UPDATE emergencyContacts SET contactName = $1, contactInfo = $2 WHERE id = $3 RETURNING *`,
      [contact.contactName, contact.contactInfo, contact.id]
    );
    return rows[0];
  } catch (err) {
    console.error("Error updating emergency contact:", err);
    throw err;
  } finally {
    client.release();
  }
};

export const updateHotline = async (
  hotline: Hotline
): Promise<Hotline | undefined> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `UPDATE hotlines SET contactName = $1, contactInfo = $2 WHERE id = $3 RETURNING *`,
      [hotline.contactName, hotline.contactInfo, hotline.id]
    );
    return rows[0];
  } catch (err) {
    console.error("Error updating hotline:", err);
    throw err;
  } finally {
    client.release();
  }
};

export const deleteEmergencyContact = async (
  id: string
): Promise<EmergencyContact> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `DELETE FROM emergencyContacts WHERE id = $1 RETURNING *`,
      [id]
    );
    return rows[0];
  } catch (err) {
    console.error("Error deleting contacts:", err);
    throw err;
  } finally {
    client.release();
  }
};

export const deleteHotline = async (id: string): Promise<Hotline> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `DELETE FROM hotlines WHERE id = $1 RETURNING *`,
      [id]
    );
    return rows[0];
  } catch (err) {
    console.error("Error deleting hotline", err);
    throw err;
  } finally {
    client.release();
  }
};
