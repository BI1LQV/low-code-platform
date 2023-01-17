import type { Ref } from "vue"
import { isRef } from "vue"

export function wrappedFetch(loading?: Ref<boolean>, ...args: Parameters<typeof fetch>) {
  if (isRef(loading)) { loading.value = true }
  return fetch(...args)
    .then(res => res.json())
    .then((res) => {
      if (isRef(loading)) { loading.value = false }
      if (res.status === "OK") {
        return JSON.parse(res.data)
      } else {
        throw res.data
      }
    }).catch((err) => {
      console.log(err)
      if (isRef(loading)) { loading.value = false }
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
