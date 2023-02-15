import { computed, reactive, watchEffect } from "vue"
import { defineStore } from "pinia"
import { LoadStatus } from "@/models/status"
import { useFuncStore } from "@/store/funcStore"
import { usePromiseStatus } from "@/composables/usePromiseStatus"
import { setRefToReactive } from "@/utils"
import { load, loaded, pyodide } from "@/utils/pyodide/asyncPyodide"

export const useLoadingStore = defineStore("loadingStore", () => {
  const funcStore = useFuncStore()
  const pyodideLoaders = reactive<Record<string, LoadStatus >>({})

  const showPyodideLoading = computed(() => {
    return funcStore.requirePyodide
  && Object.values(pyodideLoaders).some(status => status !== LoadStatus.OK)
  })

  watchEffect(() => {
    if (funcStore.requirePyodide && !loaded.value) {
      if (pyodideLoaders["加载Pyodide"]) {
        return
      }
      setRefToReactive(pyodideLoaders, "加载Pyodide", usePromiseStatus(
        load())[0])
    }
  })

  watchEffect(() => {
    if (!loaded.value) { return }
    funcStore.pyodideDeps.forEach(async (dep) => {
      if ((await pyodide.getLoadedPackages())[dep] || pyodideLoaders[`加载依赖${dep}`]) {
        return
      }
      setRefToReactive(pyodideLoaders, `加载依赖${dep}`,
        usePromiseStatus(pyodide.installDeps([dep]))[0])
    })
  })

  return {
    pyodideLoaders,
    showPyodideLoading,
  }
})
