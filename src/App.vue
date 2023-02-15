<script lang="ts" setup>
import PyodideLoading from "./components/PyodideLoading.vue"
import { useLoadingStore } from "./store/loadingStore"
const loadingStore = useLoadingStore()
</script>

<template>
  <router-view />
  <PyodideLoading></PyodideLoading>
  <div v-loading.fullscreen.lock="loadingStore.showGlobalLoading"></div>
</template>
