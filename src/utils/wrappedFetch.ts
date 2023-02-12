import type { Ref } from "vue"
import { isRef } from "vue"
export function wrappedFetch(url: string, req: RequestInit & { loading?: Ref<boolean> }) {
  const { loading } = req
  if (isRef(loading)) { loading.value = true }
  return fetch(url, req)
    .then(res => res.json())
    .then((res) => {
      if (res.status === "OK") {
        return JSON.parse(res.res)
      } else {
        throw res.res
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
    }).finally(() => {
      if (isRef(loading)) { loading.value = false }
    })
}
