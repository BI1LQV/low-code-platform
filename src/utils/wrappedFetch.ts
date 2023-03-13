import type { Ref } from "vue"
import { isRef } from "vue"

export function wrappedFetch(url: string, req: RequestInit & { loading?: Ref<boolean> } = {}) {
  const { loading } = req
  if (isRef(loading)) { loading.value = true }
  return fetch(
    import.meta.env.VITE_URL_BASE
    + url, req)
    .then(res => res.json())
    .then((res) => {
      if (res.status === "OK") {
        if (typeof res.res === "string") { return JSON.parse(res.res) } else { return res.res }
      } else {
        throw res.res
      }
    }).catch((err) => {
      if (err instanceof DOMException) {
        // abort controller do nothing
      } else if (typeof err === "string") {
        throw err
      } else if (err instanceof Error) {
        throw JSON.stringify(err?.stack || "内部异常")
      } else {
        // eslint-disable-next-line no-throw-literal
        throw "内部异常"
      }
    }).finally(() => {
      if (isRef(loading)) { loading.value = false }
    })
}
