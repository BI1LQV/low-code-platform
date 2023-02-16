import { wrap } from "comlink"
import { ref } from "vue"
import { Locker } from ".."
import type * as workerApis from "./main"

export const loaded = ref(false)

// eslint-disable-next-line import/no-mutable-exports
export let worker: typeof workerApis

export async function load() {
  const main = new Worker(
    new URL("./workerSender", import.meta.url),
    { type: "module" },
  )
  const [release, lock] = Locker()
  main.onmessage = () => {
    release()
  }
  await lock
  // @ts-expect-error type Remote<> has bugs
  worker = wrap(main)
  loaded.value = true
  return 1
}

