<script lang="ts" setup>
import { computed } from "vue"
import { SvgErr, SvgLoading, SvgOk } from "@/assets/status"
import { LoadStatus } from "@/models/status"

const props = defineProps<{ size: number;status: LoadStatus }>()

const imgPath = computed(() => {
  switch (props.status) {
    case LoadStatus.OK:
      return SvgOk
    case LoadStatus.ERR:
      return SvgErr
    case LoadStatus.LOAD:
      return SvgLoading
    default:
      return null as never
  }
})
</script>

<template>
  <span>
    <img :class="{ 'loading-spin': props.status === LoadStatus.LOAD }" :width="props.size" :src="imgPath" />
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
