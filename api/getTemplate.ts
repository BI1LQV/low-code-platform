import type { VercelRequest, VercelResponse } from "@vercel/node"
import mysql from "mysql2/promise"
export default async (request: VercelRequest, response: VercelResponse) => {
  const { id } = request.query
  if (isNaN(Number(id))) {
    response.status(200).send({ status: "ERR", message: "invalid id" })
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
      "SELECT * FROM template_data WHERE id=?", [id],
    ))
  // @ts-expect-error it's okay
    .then(([[res]]) => {
      if (res) {
        response.status(200).send({ status: "OK", data: JSON.stringify(res) })
      } else {
        throw new Error("no such template")
      }
    }).catch((err) => {
      response.status(200).send({ status: "ERR", message: JSON.stringify(err?.stack) || "db error" })
    })
}
