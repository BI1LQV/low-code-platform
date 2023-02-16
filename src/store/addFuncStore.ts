import { defineStore } from "pinia"
import { watch } from "vue"
import { clearableReactive } from "@/composables/clearableReactive"
import { pyCallGetInfo, pyCallTest } from "@/utils/globalCall"
import { worker } from "@/utils/pyodide/asyncPyodide"
import { LoadStatus } from "@/models/status"

export const useAddFuncStore = defineStore("addFuncStore", () => {
  const [form, setForm, clearForm] = clearableReactive(() => ({
    type: "py",
    name: "",
    pyName: "",
    impl: "",
    baseUrl: "http://localhost:23330",
    inputTmp: "",
    receiverTmp: "",
    isDirect: true,
    inputs: [] as string[],
    receivers: [] as string[],
    inputTypes: [] as string[],
    outputTypes: [] as string[],
    deps: [] as string[],
    depTmp: "",
    isModify: false as false | string,
    serverStatus: LoadStatus.ERR,
    funcStatus: LoadStatus.ERR,
  }))

  watch(() => [form.baseUrl, form.isDirect], async (_1, _2, onCleanUp) => {
    if (form.type !== "py") { return }
    if (!/^http(s)?:\/\/[a-zA-Z0-9.\-]+(:\d+)?$/.test(form.baseUrl)) { return }
    const aborter = new AbortController()
    onCleanUp(() => aborter.abort())
    form.serverStatus = LoadStatus.LOAD
    pyCallTest(form.baseUrl, form.isDirect, aborter.signal).then(() => {
      form.serverStatus = LoadStatus.OK
    }).catch(() => {
      form.serverStatus = LoadStatus.ERR
    })
  }, { immediate: true })

  const refreshTypes = (onCleanUp?: (cb: () => void) => void) => {
    if (!/^http(s)?:\/\/[a-zA-Z0-9.\-]+(:\d+)?$/.test(form.baseUrl)) { return }
    if (!form.pyName) { return }
    const aborter = new AbortController()
    onCleanUp?.(() => aborter.abort())
    form.funcStatus = LoadStatus.LOAD
    return pyCallGetInfo(form.baseUrl, form.isDirect, form.pyName, aborter.signal).then(({ input, output }) => {
      form.inputTypes = input
      form.outputTypes = output
      form.funcStatus = LoadStatus.OK
      form.serverStatus = LoadStatus.OK
    }).catch(() => {
      form.funcStatus = LoadStatus.ERR
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

  watch(() => form.type, () => {
    clearForm(["name", "type"])
  })
  return {
    form, setForm, clearForm, refreshTypes,
  }
})
