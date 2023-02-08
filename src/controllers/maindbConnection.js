import mysql from "mysql2/promise";

const connectionData = {
    user: "root",
    host: "localhost",
    password: "root123@#",
    database: "loginsystest"
}

const db = await mysql.createConnection(connectionData);

export default db;