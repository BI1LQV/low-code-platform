import mysql from "mysql2/promise"
export const db = mysql.createConnection({
  host: process.env.DB_HOST as string,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWD as string,
  database: process.env.DB_NAME as string,
})
