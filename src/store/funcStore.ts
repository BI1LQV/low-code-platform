import { shallowReactive, watch } from "vue"
import { defineStore } from "pinia"
import { useLocalStorage } from "@vueuse/core"
import { binderList } from "./canvasStore"
import type { FuncType, JsFunc, PyFunc } from "@/models/funcCalls"
import { pyCall } from "@/utils/globalCall"
export const useFuncStore = defineStore("funcStore", () => {
  const funcMap: Record<string, FuncType> = shallowReactive({})

  const nameIdMapStore = useLocalStorage("namIdMap", "")
  const funcStore = useLocalStorage("funcStore", "")

  const nameToIdMap: Record<string, string> = shallowReactive({})
  const idToNameMap: Record<string, string> = shallowReactive({})

  async function callFunc(id: string) {
    const func = funcMap[id]
    if (func == null) {
      return
    }
    let res: any
    if (func.type === "js") {
      // eslint-disable-next-line no-new-func
      res = new Function(
        ...func.inputs,
        func.impl)(...func.inputs.map(name => binderList.get(nameToIdMap[name])?.value))
    } else {
      res = await pyCall(func.baseUrl, func.name, func.isDirect, func.inputs.map((bindName: string) => {
        return binderList.get(nameToIdMap[bindName])!.value
      }))
    }
    if (func.receiver) {
      binderList.get(nameToIdMap[func.receiver])!.value = res
    }
  }
  function registerWatcher(name: string, inputs: string[]) {
    watch(inputs.map(name => binderList.get(nameToIdMap[name])), () => {
      callFunc(name)
    })
  }

  function setFunc(form:
  Record<"name" | "type" | "impl" | "baseUrl" | "receiver", string>
  & { inputs: string[]; isDirect: boolean },
  ) {
    const { name, type, impl, baseUrl, inputs, receiver, isDirect } = form
    if (type === "js") {
      funcMap[name] = {
        name,
        type,
        impl,
        inputs,
        receiver,
      } as JsFunc
    } else {
      funcMap[name] = {
        name,
        type,
        baseUrl,
        inputs,
        receiver,
        isDirect,
      } as PyFunc
    }
    registerWatcher(name, inputs)
  }

  function setBindMap(name: string, id: string) {
    nameToIdMap[name] = id
    idToNameMap[id] = name
  }
  function getBindMap(id: string) {
    return idToNameMap[id]
  }

  function saveFunc() {
    nameIdMapStore.value = JSON.stringify(nameToIdMap)
    funcStore.value = JSON.stringify(funcMap)
  }
  function loadFunc() {
    const nameToIdEntires = Object.entries<string>(JSON.parse(nameIdMapStore.value))
    nameToIdEntires.forEach(([name, id]) => {
      nameToIdMap[name] = id
      idToNameMap[id] = name
    })
    Object.entries<FuncType>(JSON.parse(funcStore.value)).forEach(([name, func]) => {
      funcMap[name] = func
      registerWatcher(name, func.inputs)
    })
  }

  return {
    callFunc,
    setFunc,
    funcMap,
    setBindMap,
    getBindMap,
    nameToIdMap,
    saveFunc,
    loadFunc,
  }
})
