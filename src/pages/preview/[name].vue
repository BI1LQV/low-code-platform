<script setup lang="ts">
import { ref } from "vue"
import { ElMessage } from "element-plus"
import Preview from "@/components/Preview"
import { downloadString } from "@/store"
const props = defineProps<{ name: string }>()
const loading = ref(false)
downloadString(props.name, loading).catch((err) => {
  ElMessage.error(err)
})
</script>

<template>
  <Preview v-loading.fullscreen.lock="loading"></Preview>
</template>
