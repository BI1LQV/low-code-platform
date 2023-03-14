import type { Ref } from "vue"
import { computed } from "vue"

export function useDelayedRef<T>(ref: Ref<T>) {
  return computed({
    get() {
      return ref.value
    },
    set(val) {
      setTimeout(() => ref.value = val)
    },
  })
}
