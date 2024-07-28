import express from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


async function testDbConnection() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log('Successfully connected to the database. Current time:', result.rows[0].now);
    client.release();
  } catch (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
}

// Call the function to test the connection
testDbConnection();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});