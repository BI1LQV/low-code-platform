/* eslint-disable import/no-mutable-exports */
import type * as main from "./worker"
import { Locker, genId } from "@/utils"

export let loaded = false
let worker: Worker
export let pyodide: typeof main

export function load() {
  const [release, locker] = Locker()
  worker = new Worker(new URL("./worker", import.meta.url), { type: "module" })

  const callbacks: Record<string, Function> = {
    loaded: () => { loaded = true; release() },
  }

  worker.onmessage = ({ data: { id, data } }) => {
    callbacks[id](data)
  }
  // @ts-expect-error safe
  pyodide = new Proxy({}, {
    get(_, p) {
      return (...args: any) => new Promise((resolve) => {
        const id = genId()
        worker.postMessage({ id, funcName: p, data: args })
        callbacks[id] = resolve
      })
    },
  })
  return locker
}
