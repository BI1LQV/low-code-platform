<script lang="ts" setup>
import { SvgErr, SvgLoading, SvgOk } from "@/assets/status"

const props = defineProps<{ size: number;status: "OK" | "ERR" | "LOAD" }>()
</script>

<template>
  <span>
    <img v-if="props.status === 'OK'" :width="props.size" :src="SvgOk" />
    <img v-if="props.status === 'LOAD'" class="loading-spin" :width="props.size" :src="SvgLoading" />
    <img v-if="props.status === 'ERR'" :width="props.size" :src="SvgErr" />
  </span>
</template>

<style>
  .loading-spin {
    animation: spin 1s cubic-bezier(0, 0, 0.47, 0.82) infinite;
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
