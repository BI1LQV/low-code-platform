import type { VercelRequest, VercelResponse } from "@vercel/node"
import fetch from "node-fetch"
export default async (request: VercelRequest, response: VercelResponse) => {
  const { baseUrl = "", method = "get" } = request.query
  const res = await fetch(baseUrl as string, {
    method: method as string,
    body: request.body,
  }).then(res => res.text())
  response.status(200).send(res)
}

