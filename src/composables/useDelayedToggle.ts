import type { Ref } from "vue"
import { ref, watch } from "vue"

export function useDelayedToggle(oldRef: Ref<boolean>, delayVal: boolean, timeout: number) {
  const delayedRef = ref(false)

  watch(oldRef, (_1, _2, onCleanup) => {
    if (oldRef.value === delayVal) {
      const timer = setTimeout(() => {
        delayedRef.value = delayVal
      }, timeout)
      onCleanup(() => {
        clearTimeout(timer)
      })
    } else {
      delayedRef.value = oldRef.value
    }
  })
  return delayedRef
}
