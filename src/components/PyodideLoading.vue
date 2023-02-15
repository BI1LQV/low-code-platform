<script lang="ts" setup>
import Status from "@/components/Status.vue"
import { useLoadingStore } from "@/store/loadController"

const loadingStore = useLoadingStore()
const { pyodideLoaders } = loadingStore
</script>

<template>
  <Teleport to="body">
    <Transition name="loading-page">
      <div v-if="loadingStore.showPyodideLoading" class="flex flex-col justify-center items-center text-24px text-white w-full h-full bg-[rgba(0,0,0,0.7)] absolute left-0 top-0 z-2000">
        <div v-for=" entire in Object.entries(pyodideLoaders)" :key="entire[0]" flex flex-row items-center>
          {{ entire[0] }}<Status :size="24" :status="entire[1]"></Status>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.loading-page-enter-active,
.loading-page-leave-active {
  transition: opacity 0.6s ease;
}

.loading-page-enter-from,
.loading-page-leave-to {
  opacity: 0;
}
</style>
