const mysql = require("mysql2/promise");
const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
} = require("../config/configs");

const db = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});



async function query(query, value) {
  try {
    const [results] = await db.query(query, value ?? []);
    return results;
  } catch (error) {
    console.log(error);
  }
}
module.exports = {db, query};
