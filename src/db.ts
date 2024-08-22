import { Sequelize } from "sequelize";
import dotenv from "dotenv";


dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL as string;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false, 
});

export default sequelize;