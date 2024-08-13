import { config } from 'dotenv';
import { Pool } from 'pg';


config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL environment variable is not set.');
  process.exit(1);
}

//console.log('DATABASE_URL:', connectionString);

const pool = new Pool({
  connectionString,
});

export const connectDB = async () => {
  try {
    await pool.connect();
    console.log('Connected to PostgreSQL');
    console.log(new Date());
  } catch (error) {
    console.error('Error connecting to PostgreSQL', error);
    process.exit(1);
  }
};

export default pool;