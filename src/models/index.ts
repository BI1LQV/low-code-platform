export interface Options {
  [key: string]: any
}

export interface Styles {
  [key: string]: string
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
}

export interface dslContainerElement extends dslBaseElement {
  children: dslBaseElement[]
}

export interface dslFunctionalElement extends dslBaseElement {
}
