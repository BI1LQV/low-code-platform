export type FuncType = JsFunc | PyFunc
export interface FuncBase {
  name: string
  args: Record<string, "number" | "string">
}
export interface JsFunc extends FuncBase {
  type: "js"
  impl: (args: object) => void
}

export interface PyFunc extends FuncBase {
  type: "py"
  impl: string
}
