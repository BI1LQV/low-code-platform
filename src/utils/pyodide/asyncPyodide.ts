/* eslint-disable import/no-mutable-exports */
import { ref } from "vue"
import type * as main from "./worker"
import { genId } from "@/utils"

export let loaded = ref(false)
let worker: Worker
export let pyodide: typeof main

export function load() {
  worker = new Worker(new URL("./worker", import.meta.url), { type: "module" })

  const callbacks: Record<string, Function> = {}
  const rejects: Record<string, Function> = {}

  // @ts-expect-error safe
  pyodide = new Proxy({}, {
    get(_, p) {
      return (...args: any) => new Promise((resolve, reject) => {
        const id = genId()
        worker.postMessage({ id, funcName: p, data: args })
        callbacks[id] = resolve
        rejects[id] = reject
      })
    },
  })

  worker.onmessage = ({ data: { id, data, err } }) => {
    if (err) {
      rejects[id](err)
    } else {
      callbacks[id](data)
    }
    delete callbacks[id]
    delete rejects[id]
  }

  return pyodide._load().then(() => loaded.value = true)
}
