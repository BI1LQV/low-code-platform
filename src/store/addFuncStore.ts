import { defineStore } from "pinia"
import { ref, watch } from "vue"
import { clearableReactive } from "@/composables/clearableReactive"
import { pyCallGetInfo, pyCallTest } from "@/utils/globalCall"
import { worker } from "@/utils/pyodide/asyncPyodide"
import { LoadStatus } from "@/models/status"

export const useAddFuncStore = defineStore("addFuncStore", () => {
  const [form, setForm, clearForm] = clearableReactive(() => ({ // TODO: 切换type时清空form
    type: "py",
    name: "",
    pyName: "",
    impl: "",
    baseUrl: "",
    inputTmp: "",
    receiverTmp: "",
    isDirect: false,
    inputs: [] as string[],
    receivers: [] as string[],
    inputTypes: [] as string[],
    outputTypes: [] as string[],
    deps: [] as string[],
    depTmp: "",
    isModify: false,
  }))

  const serverStatus = ref(LoadStatus.ERR)
  const funcStatus = ref(LoadStatus.ERR)

  watch(() => [form.baseUrl, form.isDirect], async (_1, _2, onCleanUp) => {
    if (form.type !== "py") { return }
    if (!/^http(s)?:\/\/[a-zA-Z0-9.\-]+(:\d+)?$/.test(form.baseUrl)) { return }
    const aborter = new AbortController()
    onCleanUp(() => aborter.abort())
    serverStatus.value = LoadStatus.LOAD
    pyCallTest(form.baseUrl, form.isDirect, aborter.signal).then(() => {
      serverStatus.value = LoadStatus.OK
    }).catch(() => {
      serverStatus.value = LoadStatus.ERR
    })
  })

  const refreshTypes = (onCleanUp?: (cb: () => void) => void) => {
    if (!/^http(s)?:\/\/[a-zA-Z0-9.\-]+(:\d+)?$/.test(form.baseUrl)) { return }
    if (!form.pyName) { return }
    const aborter = new AbortController()
    onCleanUp?.(() => aborter.abort())
    funcStatus.value = LoadStatus.LOAD
    return pyCallGetInfo(form.baseUrl, form.isDirect, form.pyName, aborter.signal).then(({ input, output }) => {
      form.inputTypes = input
      form.outputTypes = output
      funcStatus.value = LoadStatus.OK
      serverStatus.value = LoadStatus.OK
    }).catch(() => {
      funcStatus.value = LoadStatus.ERR
      throw new Error("fail")
    })
  }

  watch(() => [form.baseUrl, form.isDirect, form.pyName], (_1: any, _2: any, onCleanUp) => {
    if (form.type !== "py") { return }
    if (form.inputTypes.length || form.outputTypes.length) {
      return
    }
    refreshTypes(onCleanUp)
  })

  watch(() => form.impl, async () => {
    if (form.type !== "pyodide") { return }
    try {
      const [funcName, inputTypes, outputTypes] = await worker.scanTypes(form.impl)
      form.pyName = funcName
      form.inputTypes = inputTypes
      form.outputTypes = outputTypes
    } catch {
      form.pyName = ""
      form.inputTypes = []
      form.outputTypes = []
    }
  })
  return {
    form, setForm, clearForm, serverStatus, funcStatus, refreshTypes,
  }
})
