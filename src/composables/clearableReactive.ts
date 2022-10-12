import { reactive } from "vue"
import { copyAttr } from "@/utils"

export function clearableReactive<T extends object>(Initer: () => T) {
  const initd = Initer()
  const keys = Object.keys(initd)
  const bucket = reactive(initd)
  const setBucket = (toSet: T) => {
    copyAttr(toSet, bucket, keys)
  }
  const clearBucket = () => {
    copyAttr(Initer(), bucket, keys)
  }
  return [bucket, setBucket, clearBucket] as const
}
