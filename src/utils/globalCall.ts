export function pyCall(baseUrl: string, funcName: string, args: any[]) {
  return fetch("/api/relay", {
    method: "post",
    body: JSON.stringify({ baseUrl, funcName, args }),
  }).then(res => res.json()).then(res => res.res)
}
