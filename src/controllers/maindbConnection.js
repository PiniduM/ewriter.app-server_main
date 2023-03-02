import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();
//this code runs before original initialization

const connectionData = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_MAIN,
};

const db = await mysql.createConnection(connectionData);

export default db;
