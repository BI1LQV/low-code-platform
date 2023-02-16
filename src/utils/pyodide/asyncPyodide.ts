import { wrap } from "comlink"
import { ref } from "vue"
import type { PyodideWorker } from "./PyodideWorker"

export const loaded = ref(false)
type ConstructorTypeOf<T> = new (...args: any[]) => T
const _PyodideWorker = wrap<ConstructorTypeOf<PyodideWorker>>(
  new Worker(new URL("./PyodideWorker", import.meta.url), { type: "module" }),
)
export const worker = await new _PyodideWorker()

export async function load() {
  return worker._load().then(() => loaded.value = true)
}

