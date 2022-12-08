export function pyCall(baseUrl: string, funcName: string, isDirect: boolean, args: any[]) {
  if (isDirect) {
    return fetch(`${baseUrl}/call/${funcName}`, {
      method: "post",
      body: JSON.stringify({ args }),
    }).then(res => res.json()).then(res => res.res)
  } else {
    return fetch("/api/relay", {
      method: "post",
      body: JSON.stringify({ baseUrl, funcName, args }),
    }).then(res => res.json()).then(res => res.res)
  }
}
