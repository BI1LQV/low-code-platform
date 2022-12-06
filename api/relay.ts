import type { VercelRequest, VercelResponse } from "@vercel/node"
import fetch from "node-fetch"
export default async (request: VercelRequest, response: VercelResponse) => {
  const { baseUrl, funcName, args } = JSON.parse(request.body)
  const res = await fetch(`${baseUrl}/call/${funcName}`, {
    method: "post",
    body: JSON.stringify({ args }),
  }).then(res => res.text())
  response.status(200).send(res)
}

