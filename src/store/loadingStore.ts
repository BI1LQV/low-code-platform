import { computed, reactive, watchEffect } from "vue"
import { defineStore } from "pinia"
import type { MaybeStatus } from "@/models/status"
import { LoadStatus } from "@/models/status"
import { useFuncStore } from "@/store/funcStore"
import { load, loaded, worker } from "@/utils/pyodide/asyncPyodide"
import { setStatusToStore } from "@/utils/setStatusToStore"

export const useLoadingStore = defineStore("loadingStore", () => {
  const funcStore = useFuncStore()
  const pyodideLoaders = reactive<Record<string, LoadStatus >>({})

  function setPyodideLoader(name: string, status: MaybeStatus) {
    setStatusToStore(pyodideLoaders, name, status)
  }

  const showPyodideLoading = computed(() => {
    return funcStore.requirePyodide
  && Object.values(pyodideLoaders).some(status => status !== LoadStatus.OK)
  })

  watchEffect(() => {
    if (funcStore.requirePyodide && !loaded.value) {
      if (pyodideLoaders["加载Pyodide"]) {
        return
      }
      setPyodideLoader("加载Pyodide", load())
    }
  })

  watchEffect(() => {
    if (!loaded.value) { return }
    funcStore.pyodideDeps.forEach(async (dep) => {
      if ((await worker.getLoadedPackages())[dep] || pyodideLoaders[`加载依赖${dep}`]) {
        return
      }
      setPyodideLoader (`加载依赖${dep}`, worker.installDeps([dep]))
    })
  })

  const globalLoaders = reactive<Record<string, LoadStatus >>({})

  function setGlobalLoader(name: string, status: MaybeStatus) {
    setStatusToStore(globalLoaders, name, status)
  }

  const showGlobalLoading = computed(() => {
    return !showPyodideLoading.value && Object.values(globalLoaders).some(status => status !== LoadStatus.OK)
  })

  return {
    pyodideLoaders,
    globalLoaders,
    showGlobalLoading,
    showPyodideLoading,
    setGlobalLoader,
    setPyodideLoader,
  }
})
