import type { VercelRequest, VercelResponse } from "@vercel/node"
import mysql from "mysql2/promise"
export default async (request: VercelRequest, response: VercelResponse) => {
  const { name = "", author = "" } = request.query
  if (name === "" || author === "") {
    response.status(200).send({ status: "ERR", message: "invalid query" })
    return
  }

  mysql.createConnection({
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWD as string,
    database: process.env.DB_NAME as string,
  })
    .then(connection => connection.query(
      "INSERT INTO template_data (name,author,data) VALUES (?,?,'')", [name, author],
    ))
    .then((res) => {
      // @ts-expect-error it's okay
      response.status(200).send({ status: "OK", data: res[0].insertId })
    })
}
