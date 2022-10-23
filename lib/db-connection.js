import mysql from 'mysql2/promise';

const host = process.env.DB_HOST;
const database = process.env.DB_DATABASE;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const pool = mysql.createPool({
  host: host,
  database: database,
  user: user,
  password: password,
});

export default pool;
