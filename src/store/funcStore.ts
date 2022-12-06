import { shallowReactive } from "vue"
import { defineStore } from "pinia"
import type { FuncType, JsFunc, PyFunc } from "@/models/funcCalls"
import { pyCall } from "@/utils/globalCall"
export const useFuncStore = defineStore("funcStore", () => {
  const funcMap: Record<string, FuncType> = shallowReactive({})
  function callFunc(id: string) {
    const func = funcMap[id]
    if (func == null) {
      return
    }
    let res: any
    if (func.type === "js") {
      // eslint-disable-next-line no-new-func
      res = new Function(
        ...Array.from({ length: func.inputs.length }).map((_, i) => `b${i}`),
        func.impl)(...func.inputs)
    } else {
      res = pyCall(func.baseUrl, func.name, func.inputs.map(({ value }) => value))
    }
    if (func.receiver) {
      func.receiver.value = res
    }
  }
  function setFunc(form: Record<"name" | "type" | "impl" | "baseUrl", string>) {
    const { name, type, impl, baseUrl } = form
    if (type === "js") {
      funcMap[name] = {
        name,
        type,
        impl,
      } as JsFunc
    } else {
      funcMap[name] = {
        name,
        type,
        baseUrl,
      } as PyFunc
    }
  }
  return {
    callFunc,
    setFunc,
    funcMap,
  }
})
