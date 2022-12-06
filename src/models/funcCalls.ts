import type { Ref } from "vue"

export type FuncType = JsFunc | PyFunc
export interface FuncBase {
  name: string
  args: Record<string, "number" | "string">
  inputs: Ref<any>[]
  receiver?: Ref<any>
}
export interface JsFunc extends FuncBase {
  type: "js"
  impl: string
}

export interface PyFunc extends FuncBase {
  type: "py"
  baseUrl: string
}
