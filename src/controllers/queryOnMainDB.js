import pool from "./maindbPool.js";

const queryOnMainDB = async (sql, values = []) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.query(sql, values);
    return result;
  } catch (err) {
    throw err;
  } finally {
    if (connection) connection.release();
  }
};


export default queryOnMainDB;