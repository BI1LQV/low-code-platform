import type { Ref } from "vue"
import { ref, watch } from "vue"
import type { StyleLike } from "@/models/drags"
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
export function renderStyle(styleLike: StyleLike) {
  return {
    "height": `${styleLike.height}px`,
    "width": `${styleLike.width}px`,
    "left": `${styleLike.left}px`,
    "top": `${styleLike.top}px`,
  }
}

type oneString<T> = T extends string ? T : never
type arrToUnion<attrs, res = never> = attrs extends readonly [infer L, ...infer R]
  ? arrToUnion<R, res | oneString<L>>
  : res
export function copyAttr<
    T extends readonly string[],
    U extends { [k in arrToUnion<T>]: any },
    // @ts-expect-error it's safe
>(from: U, target: any, attrs: T = Object.keys(from)) {
  attrs.forEach((val) => {
    // @ts-expect-error it's safe
    target[val] = from[val]
  })
}
