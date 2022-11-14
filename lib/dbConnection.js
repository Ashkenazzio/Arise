import mysql from 'mysql2/promise';

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_DATABASE;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const ssl =
  process.env.DB_HOST === 'localhost' ? null : { rejectUnauthorized: true };

const pool = mysql.createPool({
  host: host,
  port: port,
  database: database,
  user: user,
  password: password,
  connectionLimit: 1000,
  ssl: ssl,
});

export default pool;
