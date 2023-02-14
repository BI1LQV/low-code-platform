import type { StyleLike } from "@/models/drags"
import type { DslSunElement, MaybeParent } from "@/models/slots"
import { isParent } from "@/models/slots"
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

export function setParent(root: MaybeParent, children: DslSunElement[], cb: (sun: DslSunElement) => void) {
  children.forEach((child) => {
    child.parent = root
    cb(child)
    if (isParent(child)) {
      setParent(child, child.children, cb)
    }
  })
}

export function Locker() {
  let release: (i: unknown) => void
  const lock = new Promise(resolve => release = resolve)
  return [() => { release(null) }, lock] as const
}
