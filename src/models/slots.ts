export interface SlotOptions {
  [key: string]: any
}

export enum functionalSlots {
  "EInput" = 0,
  "ESelect",
  "ESlider",
  "ELabel",
  "EColorPicker",
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
  return comp.id === rootID
}

export function isSun(comp?: DslBaseElement): comp is DslSunElement {
  return Boolean(comp && ("parent" in comp))
}

export function isParentAndSun(parent: DslBaseElement, child: DslSunElement) {
  let childsParent = child
  while (true) {
    if (childsParent.id === parent.id) {
      return true
    }
    if (isSun(childsParent.parent)) {
      childsParent = childsParent.parent
    } else {
      return false
    }
  }
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
    "margin-top": "5px",
    "margin-bottom": "5px",
    "margin-left": "5px",
    "margin-right": "5px",
    "font-size": "14px",
    "font-family": "sans-serif",
    "color": "#000000",
    "background-color": "#ffffff",
  }
}

export function BaseFlexStyleImpl() {
  return {
    "display": "flex",
    "flex-direction": "column",
    "align-items": "flex-start",
    "justify-content": "flex-start",
  } as const
}

export interface EFlexOptions {
  [key: string]: any
  style: BaseStyle & {
    display: "flex"
    "flex-direction": "column" | "row"
    "align-items": string
    "justify-content": string
    [key: string]: string
  }
}
export interface CommonOptions {
  [key: string]: any
  style: BaseStyle & {
    [key: string]: string
  }
}
