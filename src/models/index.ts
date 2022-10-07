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
export const rootID = "root"
export interface dslRootElement {
  id: typeof rootID
  type: containerSlots.ERoot
  children: dslBaseElement[]
}

export interface dslBaseElement {
  id: string
  type: allSlotsKey
  parent: dslContainerElement | dslRootElement
  children?: dslBaseElement[]
}

export interface dslContainerElement extends dslBaseElement {
  children: dslBaseElement[]
}

export interface dslFunctionalElement extends dslBaseElement {
}

export function isParent(comp: dslBaseElement | dslRootElement): comp is dslContainerElement | dslRootElement {
  return "children" in comp
}

export function isRoot(comp: dslBaseElement | dslRootElement): comp is dslRootElement {
  return !("id" in comp)
}

export interface passedChild {
  type: allSlotsKey
  binder: Ref<any>
  prop: SlotOptions
}

