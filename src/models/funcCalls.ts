export type FuncType = JsFunc | PyFunc | PyodideFunc
export interface FuncBase {
  name: string
  inputs: string[]
  receivers: string[]
  autoTrigger: boolean
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
  saveOnServer?: boolean
}

export interface PyodideFunc extends FuncBase {
  type: "pyodide"
  inputTypes: string[]
  outputTypes: string[]
  impl: string
  deps: string[]
  pyName: string
}
