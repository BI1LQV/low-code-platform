export interface Options {
  [key: string]: any
}

export interface Styles {
  [key: string]: string
}
export interface dslRoot {
  children: dslElement[]
}
export interface dslElement {
  id: string
  type: "input"
  children: dslElement[]
  parent: dslElement | dslRoot
}
