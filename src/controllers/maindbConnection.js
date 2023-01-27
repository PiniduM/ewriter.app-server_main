import mysql from "mysql2";

const connectionData = {
    user: "root",
    host: "localhost",
    password: "root123@#",
    database: "loginsystest"
}

const db = mysql.createConnection(connectionData);

export default db;