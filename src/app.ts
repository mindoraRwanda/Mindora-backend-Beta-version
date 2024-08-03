import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import adminRoutes from './routes/adminRoutes';
import { connectDB } from './db';
import dotenv from 'dotenv';

dotenv.config();


const app = express();

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

const startServer = async () => {
  await connectDB();
  app.listen(8080, () => {
    console.log('Server is running on port 8080');
  });
};

startServer();
