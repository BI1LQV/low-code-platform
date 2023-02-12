export type FuncType = JsFunc | PyFunc
export interface FuncBase {
  name: string
  inputs: string[]
  receivers: string[]
}
export interface JsFunc extends FuncBase {
  type: "js"
  impl: string
}

export interface PyFunc extends FuncBase {
  type: "py"
  baseUrl: string
  isDirect: boolean
  pyName: string
  inputTypes: string[]
  outputTypes: string[]
}
