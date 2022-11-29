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
  children: DslSunElement[]
}
export type MaybeParent = DslContainerElement | DslRootElement
export interface DslSunElement extends DslBaseElement {
  parent: MaybeParent
}

export interface DslContainerElement extends DslSunElement {
  children: DslSunElement[]
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

export interface BaseStyle {
  width: string
  height: string
  "margin-top": string
  "margin-bottom": string
  "margin-left": string
  "margin-right": string
  "font-size": string
  "font-family": string
  "color": string
  "background-color": string
}

export function BaseStyleImpl(): BaseStyle {
  return {
    "width": "auto",
    "height": "auto",
    "margin-top": "0px",
    "margin-bottom": "0px",
    "margin-left": "0px",
    "margin-right": "0px",
    "font-size": "14px",
    "font-family": "sans-serif",
    "color": "#000000",
    "background-color": "#ffffff",
  }
}

export interface EFlexOptions {
  [key: string]: any
  style: BaseStyle & {
    display: "flex"
    "flex-direction": "column" | "row"
    [key: string]: string
  }
}
export interface CommonOptions {
  [key: string]: any
  style: BaseStyle & {
    [key: string]: string
  }
}
