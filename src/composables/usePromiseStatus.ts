import { ref } from "vue"
import { LoadStatus } from "@/models/status"

export function usePromiseStatus<T>(promise: Promise<T>) {
  const status = ref(LoadStatus.LOAD)
  return [status, promise.then((res) => {
    status.value = LoadStatus.OK
    return res
  }).catch(() => {
    status.value = LoadStatus.ERR
  })] as const
}
