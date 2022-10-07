import type { Ref } from "vue"

export interface SlotOptions {
  [key: string]: any
}

export enum functionalSlots {
  "input" = 0,
  "select",
}
export enum containerSlots {
  "flex" = 100,
}
export const allSlots = {
  ...functionalSlots, ...containerSlots,
}
export type allSlotsKey = keyof typeof allSlots

export interface dslRootElement {
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

export function isParent(comp: any): comp is dslContainerElement | dslRootElement {
  return "children" in comp
}

export interface passedChild {
  type: allSlotsKey
  binder: Ref<any>
  prop: SlotOptions
}

