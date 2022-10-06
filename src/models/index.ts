export interface Options {
  [key: string]: any
}

export interface Styles {
  [key: string]: string
}
export interface dslRoot {
  children: dslElement[]
}

export type allSlots = "input"
export interface dslElement {
  id: string
  type: allSlots
  children: dslElement[]
  parent: dslElement | dslRoot
}
