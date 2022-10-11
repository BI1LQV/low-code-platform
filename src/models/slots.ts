import type { Ref } from "vue"

export interface SlotOptions {
  [key: string]: any
}

export enum functionalSlots {
  "EInput" = 0,
  "ESelect",
}
export enum containerSlots {
  "EFlex" = 100,
  ERoot,
}
export const allSlots = {
  ...functionalSlots, ...containerSlots,
}
export type allSlotsKey = keyof typeof allSlots

export interface DslBaseElement {
  id: string
  type: allSlotsKey
  children?: DslBaseElement[]
}

export const rootID = "root"
export interface DslRootElement extends DslBaseElement {
  id: typeof rootID
  type: containerSlots.ERoot
  children: DslBaseElement[]
}
export type MaybeParent = DslContainerElement | DslRootElement
export interface DslSunElement extends DslBaseElement {
  parent: MaybeParent
}

export interface DslContainerElement extends DslSunElement {
  children: DslBaseElement[]
}

export function isParent(comp: DslBaseElement): comp is MaybeParent {
  return "children" in comp
}

export function isRoot(comp: DslBaseElement): comp is DslRootElement {
  return !("id" in comp)
}

export function isSun(comp?: DslBaseElement): comp is DslSunElement {
  return Boolean(comp && ("parent" in comp))
}

export interface passedChild<T=allSlotsKey> {
  type: T
  binder?: Ref<any>
}

export interface EFlexOptions {
  [key: string]: any
  style: {
    display: "flex"
    "flex-direction": "column" | "row"
  }
}