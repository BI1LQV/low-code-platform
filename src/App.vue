<script lang="ts" setup>
import { computed, watchEffect } from "vue"
import Status from "./components/Status.vue"
import { pyodideLoading } from "./utils/loadController"
import { LoadStatus } from "./models/status"
import { usePromiseStatus } from "./composables/usePromiseStatus"
import { setRefToReactive } from "./utils"
import { load, loaded, pyodide } from "@/utils/pyodide/asyncPyodide"
import { useFuncStore } from "@/store/funcStore"
const funcStore = useFuncStore()

const showLoading = computed(() => {
  return funcStore.requirePyodide
  && Object.values(pyodideLoading).some(status => status !== LoadStatus.OK)
})

let loadWorking = false

watchEffect(() => {
  if (loadWorking) {
    return
  }
  if (funcStore.requirePyodide && !loaded.value) {
    loadWorking = true
    setRefToReactive(pyodideLoading, "加载Pyodide", usePromiseStatus(load()
      .then(() => {
        loadWorking = false
      }))[0])
  }
})

watchEffect(() => {
  if (!loaded.value) { return }
  funcStore.pyodideDeps.forEach(async (dep) => {
    if ((await pyodide.getLoadedPackages())[dep] || pyodideLoading[`加载依赖${dep}`]) {
      return
    }
    setRefToReactive(pyodideLoading, `加载依赖${dep}`,
      usePromiseStatus(pyodide.installDeps([dep]))[0])
  })
})
</script>

<template>
  <router-view />
  <teleport v-if="showLoading" to="body">
    <div class="flex flex-col justify-center items-center text-24px text-white w-full h-full bg-[rgba(0,0,0,0.7)] absolute left-0 top-0 z-2000">
      <div v-for=" entire in Object.entries(pyodideLoading)" :key="entire[0]" flex flex-row items-center>
        {{ entire[0] }}<Status :size="24" :status="entire[1]"></Status>
      </div>
    </div>
  </teleport>
</template>
