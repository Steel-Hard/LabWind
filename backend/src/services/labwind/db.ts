// db.ts
import mysql from 'mysql2/promise';

import dotenv from "dotenv"

dotenv.config();

const {DB,HOST,PASS,USER} = process.env

const pool = mysql.createPool({
  host: HOST,
  user:  USER,
  password: PASS,
  database: DB,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;

//108.179.193.150