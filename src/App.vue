<script lang="ts" setup>
import { computed, ref, watchEffect } from "vue"
import Status from "./components/Status.vue"
import { load, loaded } from "@/utils/pyodide/asyncPyodide"
import { useFuncStore } from "@/store/funcStore"
const funcStore = useFuncStore()

const pyodideLoading = ref<"ERR" | "OK" | "LOAD">("ERR")
const showLoading = computed(() => {
  return funcStore.requirePyodide && pyodideLoading.value !== "OK"
})

watchEffect(() => {
  if (funcStore.requirePyodide && !loaded) {
    pyodideLoading.value = "LOAD"
    load().then(() => setTimeout(() => pyodideLoading.value = "OK"))
  }
})
</script>

<template>
  <router-view />
  <teleport v-if="showLoading" to="body">
    <div class="flex justify-center items-center text-24px text-white w-full h-full bg-[rgba(0,0,0,0.7)] absolute left-0 top-0 z-2000">
      加载Pyodide<Status :size="24" :status="pyodideLoading"></Status>
    </div>
  </teleport>
</template>
