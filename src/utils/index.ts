import type { Ref } from "vue"
import { ref, watch } from "vue"
const genIncId = (() => {
  let i = 0
  return () => `${i++}`
})()
export function genId() {
  if (import.meta.env.MODE === "test") {
    return genIncId()
  }
  return crypto.randomUUID?.()
}

// TODO: 考虑组件生命周期
export function watchComputed<T>(toWatches: (Ref | {})[]|(Ref | {}), cb: () => T): Readonly<Ref<T>> {
  let bucket = ref()
  watch(toWatches, () => {
    bucket.value = cb()
  }, { immediate: true })
  return bucket
}
