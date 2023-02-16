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
  const clearBucket = (excludes?: string[]) => {
    options?.onClear?.()
    const data = Initer()
    copyAttr(data, bucket, keys.filter(val => !excludes?.includes(val)))
  }
  return [bucket, setBucket, clearBucket] as const
}
