import { wrappedFetch } from "./wrappedFetch"

function fetchMaybeRelay(isDirect: boolean, ...[url, req]: Parameters<typeof wrappedFetch>) {
  if (!isDirect) {
    url = `/api/relay?baseUrl=${encodeURIComponent(url)}`
  }
  return wrappedFetch(url, req).then(res => res.json()).then(res => res.res)
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
