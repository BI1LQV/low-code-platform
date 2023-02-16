import { computed, shallowReactive, watch } from "vue"
import { defineStore } from "pinia"
import { useRouter } from "vue-router"
import { useCanvasStore } from "./canvasStore"
import type { FuncType } from "@/models/funcCalls"
import { pyCall } from "@/utils/globalCall"
import { worker } from "@/utils/pyodide/asyncPyodide"

export const useFuncStore = defineStore("funcStore", () => {
  const { binderList } = useCanvasStore()
  const funcMap: Record<string, FuncType> = shallowReactive({})

  const nameToIdMap: Record<string, string> = shallowReactive({})
  const idToNameMap: Record<string, string> = shallowReactive({})

  const funcList = computed(() => Object.values(funcMap))
  const nameList = computed(() => Object.keys(nameToIdMap))

  async function callFunc(id: string, signal: AbortSignal) {
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
    } else if (func.type === "py") {
      res = await pyCall(func.baseUrl, func.pyName, func.isDirect, func.inputs.map((bindName: string) => {
        return binderList.get(nameToIdMap[bindName])!.value
      }), signal)
    } else if (func.type === "pyodide") {
      res = await worker.callFunc(func.pyName, func.impl, func.inputs.map((bindName: string) => {
        return binderList.get(nameToIdMap[bindName])!.value
      }))
    }

    if (func.receivers.length && !signal.aborted) {
      if (Array.isArray(res)) {
        func.receivers.forEach((receiverId, idx) => {
          binderList.get(nameToIdMap[receiverId])!.value = res[idx]
        })
      } else {
        binderList.get(nameToIdMap[func.receivers[0]])!.value = res
      }
    }
  }
  function registerWatcher(name: string, inputs: string[]) {
    watch(inputs.map(name => binderList.get(nameToIdMap[name])), (_1, _2, onCleanUp) => {
      const aborter = new AbortController()
      onCleanUp(() => aborter.abort())
      callFunc(name, aborter.signal)
    })
  }

  function setFunc(form:
  Record<"name" | "type" | "impl" | "baseUrl" | "pyName", string>
  & {
    inputs: string[]
    receivers: string[]
    inputTypes: string[]
    outputTypes: string[]
    deps: string[]
    isDirect: boolean
  },
  ) {
    const { name, type, impl, baseUrl, inputs, receivers, isDirect, pyName, inputTypes, outputTypes, deps } = form
    if (type === "js") {
      funcMap[name] = {
        name,
        type,
        impl,
        inputs,
        receivers,
      }
    } else if (type === "py") {
      funcMap[name] = {
        name,
        type,
        baseUrl,
        inputs,
        receivers,
        isDirect,
        pyName,
        inputTypes,
        outputTypes,
      }
    } else if (type === "pyodide") {
      funcMap[name] = {
        name,
        type,
        inputs,
        receivers,
        pyName,
        inputTypes,
        outputTypes,
        deps,
        impl,
      }
    }
    registerWatcher(name, inputs)
  }

  function deleteFunc(name: string) {
    delete funcMap[name]
  }

  function setBindMap(name: string, id: string) {
    if (id in idToNameMap) {
      delete nameToIdMap[idToNameMap[id]]
    }
    nameToIdMap[name] = id
    idToNameMap[id] = name
  }
  function getBindMap(id: string) {
    return idToNameMap[id]
  }

  function saveFunc() {
    return {
      nameIdMap: JSON.stringify(nameToIdMap),
      func: JSON.stringify(funcMap),
    }
  }
  function loadFunc(funcString: ReturnType<typeof saveFunc>) {
    const nameToIdEntires = Object.entries<string>(
      JSON.parse(funcString.nameIdMap),
    )
    nameToIdEntires.forEach(([name, id]) => {
      nameToIdMap[name] = id
      idToNameMap[id] = name
    })
    Object.entries<FuncType>(JSON.parse(funcString.func),
    ).forEach(([name, func]) => {
      funcMap[name] = func
      registerWatcher(name, func.inputs)
    })
  }

  const INIT_STORE = saveFunc()
  function reset() {
    loadFunc(INIT_STORE)
  }

  const pyodideDeps = computed(() => {
    return Object.values(funcMap).reduce((pre, func) => {
      if (func.type === "pyodide") {
        return [...new Set([...pre, ...func.deps])]
      } else { return pre }
    }, [] as string[])
  })
  const router = useRouter()
  const requirePyodide = computed(() => {
    return router.currentRoute.value.name === "editor-name"
    || Object.values(funcMap).some((func) => {
      return func.type === "pyodide"
    })
  })

  return {
    callFunc,
    setFunc,
    deleteFunc,
    funcMap,
    setBindMap,
    getBindMap,
    nameToIdMap,
    saveFunc,
    loadFunc,
    reset,
    funcList,
    nameList,
    pyodideDeps,
    requirePyodide,
  }
})
