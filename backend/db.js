const mysql = require("mysql2");

const DB_HOST = process.env.DB_HOST || "mysql";
const DB_USER = process.env.DB_USER || "admin";
const DB_PASS = process.env.DB_PASS || "admin";
const DB_NAME = process.env.DB_NAME || "mydb";
const DB_PORT = process.env.DB_PORT || 3306;

const db = async () => {
  try {
    // Create the database if it doesn't exist
    const connection = mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      port: DB_PORT,
      multipleStatements: true,
    });

    await connection
      .promise()
      .query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
    console.log(`Database '${DB_NAME}' is ready`);
    connection.end();

    // Create a pool for reuse
    const pool = mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      port: DB_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    const promisePool = pool.promise();

    // Create todos table if it doesn't exist
    await promisePool.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL
      )
    `);

    console.log("Todos table is ready");

    return promisePool;
  } catch (error) {
    console.error("DB initialization failed:", error.message);
    process.exit(1);
  }
};

module.exports = db;
