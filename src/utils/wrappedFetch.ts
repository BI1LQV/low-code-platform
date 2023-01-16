export function wrappedFetch(...args: Parameters<typeof fetch>) {
  return fetch(...args)
    .then(res => res.json())
    .then((res) => {
      if (res.status === "OK") {
        return JSON.parse(res.data)
      } else {
        throw res.data
      }
    }).catch((err) => {
      console.log(err)
      if (typeof err === "string") {
        throw err
      } else if (err instanceof Error) {
        throw JSON.stringify(err?.stack || "内部异常")
      } else {
        // eslint-disable-next-line no-throw-literal
        throw "内部异常"
      }
    })
}
