import type { Remote } from "comlink"
import { wrap } from "comlink"
import { ref } from "vue"
import type { PyodideWorker } from "./PyodideWorker"

export const loaded = ref(false)
type ConstructorTypeOf<T> = new (...args: any[]) => T

// eslint-disable-next-line import/no-mutable-exports
export let worker: Remote<PyodideWorker>

export async function load() {
  const _PyodideWorker = wrap<ConstructorTypeOf<PyodideWorker>>(
    new Worker(new URL("./PyodideWorker", import.meta.url), { type: "module" }),
  )
  worker = await new _PyodideWorker()
  return worker._load().then(() => loaded.value = true)
}

