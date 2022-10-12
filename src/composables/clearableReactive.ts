import { reactive } from "vue"
import { copyAttr } from "@/utils"

export function clearableReactive<T extends object>(
  Initer: () => T, options?: { onClear?: () => void; onSet?: () => void },
) {
  const initd = Initer()
  const keys = Object.keys(initd)
  const bucket = reactive(initd)
  const setBucket = (toSet: T) => {
    options?.onSet?.()
    copyAttr(toSet, bucket, keys)
  }
  const clearBucket = () => {
    options?.onClear?.()
    copyAttr(Initer(), bucket, keys)
  }
  return [bucket, setBucket, clearBucket] as const
}
