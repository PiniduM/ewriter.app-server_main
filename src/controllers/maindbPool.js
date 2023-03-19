import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();
//this code runs before original initialization

const poolData = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_MAIN,
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 100,
  waitForConnections: true
};

const pool = mysql.createPool(poolData);

export default pool;
