import type { VercelRequest, VercelResponse } from "@vercel/node"
import { db } from "./_db"
export default async (request: VercelRequest, response: VercelResponse) => {
  (await db).query("SELECT * FROM test_1").then((res) => {
    response.status(200).send(JSON.stringify(res[0]))
  })
}

