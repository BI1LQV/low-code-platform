<script lang="ts" setup>
import { computed, ref, watchEffect } from "vue"
import Status from "./components/Status.vue"
import { load, loaded, pyodide } from "@/utils/pyodide/asyncPyodide"
import { useFuncStore } from "@/store/funcStore"
const funcStore = useFuncStore()

const pyodideLoading = ref<"ERR" | "OK" | "LOAD">("LOAD")
const depsLoading = ref<("ERR" | "OK" | "LOAD")[]>([])
const showLoading = computed(() => {
  return funcStore.requirePyodide
  && pyodideLoading.value !== "OK"
  && depsLoading.value.some(dep => dep !== "OK")// TODO: fix it
})

watchEffect(() => {
  if (funcStore.requirePyodide && !loaded) {
    pyodideLoading.value = "LOAD"
    depsLoading.value = Array.from({ length: funcStore.pyodideDeps.length }, () => "LOAD")
    load()
      .then(() => pyodideLoading.value = "OK")
      .catch(() => {
        pyodideLoading.value = "ERR"
      })
      .then(() => {
        return Promise.all(funcStore.pyodideDeps.map((dep, index) => { // TODO: fix it
          return pyodide.installDeps([dep]).then(() => {
            depsLoading.value[index] = "OK"
          }).catch(() => {
            depsLoading.value[index] = "ERR"
          })
        }))
      })
  }
})
</script>

<template>
  <router-view />
  <teleport v-if="showLoading" to="body">
    <div class="flex flex-col justify-center items-center text-24px text-white w-full h-full bg-[rgba(0,0,0,0.7)] absolute left-0 top-0 z-2000">
      <div flex flex-row items-center>加载Pyodide<Status :size="24" :status="pyodideLoading"></Status></div>
      <div v-for="dep, idx in funcStore.pyodideDeps" :key="dep" items-center flex flex-row>
        <span>加载依赖{{ dep }}</span><Status :size="24" :status="depsLoading[idx]"></Status>
      </div>
    </div>
  </teleport>
</template>
