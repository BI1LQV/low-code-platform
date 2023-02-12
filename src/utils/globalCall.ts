import { wrappedFetch } from "./wrappedFetch"

function fetchMaybeRelay(isDirect: boolean, ...[url, req]: Parameters<typeof wrappedFetch>) {
  if (!isDirect) {
    url = `/api/relay?baseUrl=${encodeURIComponent(url)}&method=${req.method}`
  }
  return wrappedFetch(url, req)
}

export function pyCall(baseUrl: string, funcName: string, isDirect: boolean, args: any[], signal: AbortSignal) {
  return fetchMaybeRelay(isDirect, `${baseUrl}/call/${funcName}`, {
    method: "post",
    body: JSON.stringify({ args }),
    signal,
  })
}

export function pyCallTest(baseUrl: string, isDirect: boolean, signal?: AbortSignal) {
  return fetchMaybeRelay(isDirect, `${baseUrl}/isAlive`, {
    method: "get",
    signal,
  })
}

export function pyCallGetInfo(baseUrl: string, isDirect: boolean, funcName: string, signal?: AbortSignal) {
  return fetchMaybeRelay(isDirect, `${baseUrl}/info/${funcName}`, {
    method: "get",
    signal,
  })
}
