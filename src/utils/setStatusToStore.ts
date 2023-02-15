import { isBoolean } from "@vueuse/core"
import type { Ref } from "vue"
import { computed } from "vue"
import { setRefToReactive } from "."
import { usePromiseStatus } from "@/composables/usePromiseStatus"
import type { MaybeStatus } from "@/models/status"
import { LoadStatus } from "@/models/status"

export function setStatusToStore(
  target: Record<string, LoadStatus>, name: string, status: MaybeStatus,
) {
  if (status instanceof Promise) {
    setRefToReactive(target, name, usePromiseStatus(status)[0])
  } else if (isBoolean(status.value)) {
    setRefToReactive(target, name, computed(() => {
      return status.value ? LoadStatus.LOAD : LoadStatus.OK
    }))
  } else {
    setRefToReactive(target, name, status as Ref<LoadStatus>)
  }
}
