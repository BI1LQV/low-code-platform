import type { VercelRequest, VercelResponse } from "@vercel/node"
import mysql from "mysql2/promise"
export default async (request: VercelRequest, response: VercelResponse) => {
  response.setHeader("Access-Control-Allow-Origin", "*")
  mysql.createConnection({
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWD as string,
    database: process.env.DB_NAME as string,
  })
    .then(connection => connection.query("SELECT id,name,author,create_time,update_time,display FROM template_data WHERE deleted=false"))
    .then((res) => {
      response.status(200).send({ status: "OK", res: JSON.stringify(res[0]) })
    }).catch((err) => {
      response.status(200).send({ status: "ERR", res: JSON.stringify(err?.stack) })
    })
}
