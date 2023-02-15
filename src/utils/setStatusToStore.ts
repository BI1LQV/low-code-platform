import { isBoolean } from "@vueuse/core"
import type { Ref } from "vue"
import { setRefToReactive } from "."
import { usePromiseStatus, useTernaryStatus } from "@/composables/usePromiseStatus"
import type { LoadStatus, MaybeStatus } from "@/models/status"

export function setStatusToStore(
  target: Record<string, LoadStatus>, name: string, status: MaybeStatus,
) {
  if (status instanceof Promise) {
    setRefToReactive(target, name, usePromiseStatus(status)[0])
  } else if (isBoolean(status.value)) {
    setRefToReactive(target, name, useTernaryStatus(status as Ref<boolean>))
  } else {
    setRefToReactive(target, name, status as Ref<LoadStatus>)
  }
}
