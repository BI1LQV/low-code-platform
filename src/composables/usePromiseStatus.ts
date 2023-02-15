import type { Ref } from "vue"
import { computed, ref } from "vue"
import { LoadStatus } from "@/models/status"

export function usePromiseStatus<T>(promise: Promise<T>) {
  const status = ref(LoadStatus.LOAD)
  return [status, promise.then((res) => {
    status.value = LoadStatus.OK
    return res
  }).catch((err) => {
    status.value = LoadStatus.ERR
    throw err
  })] as const
}

export function useTernaryStatus(oldRef: Ref<boolean>) {
  return computed(() => {
    return oldRef.value ? LoadStatus.LOAD : LoadStatus.OK
  })
}

export function useBinaryStatus(oldRef: Ref<LoadStatus>) {
  return computed(() => {
    return oldRef.value === LoadStatus.LOAD
  })
}
