import { PoolClient } from 'pg';
import pool from '../db';
import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';

config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface NormalUser {
  email: string;
  password: string;
  name: string;
  username: string;
  phone_number: string;
  profile_picture: string; 
}



export const createNormalUser = async (user: NormalUser) => {
  console.log('Creating user with data:', user);
 if (!user.email || !user.password || !user.name || !user.username || !user.phone_number || !user.profile_picture) {
    console.log('Missing fields:', {
      email: !user.email,
      password: !user.password,
      name: !user.name,
      username: !user.username,
      phone_number: !user.phone_number,
      profile_picture: !user.profile_picture
    });
    throw new Error('Missing required fieldss');
  }

  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(
      `INSERT INTO normal_users (email, password, name, username, phone_number, profile_picture)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [user.email, user.password, user.name, user.username, user.phone_number, user.profile_picture]
    );
    return rows[0];
  } finally {
    client.release();
  }
};


export const getNormalUserByEmail = async (email: string): Promise<NormalUser | undefined> => {
  const client: PoolClient = await pool.connect();
  try {
    const { rows } = await client.query(`SELECT * FROM normal_users WHERE email = $1`, [email]);
    return rows[0] as NormalUser | undefined;
  } finally {
    client.release();
  }
};

