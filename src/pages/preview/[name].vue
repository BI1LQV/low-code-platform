<script setup lang="ts">
import { ElMessage } from "element-plus"
import Preview from "@/components/Preview"
import { downloadString } from "@/store"
import { useLoadingStore } from "@/store/loadingStore"
const props = defineProps<{ name: string }>()

const loadingStore = useLoadingStore()
loadingStore.setGlobalLoader("editor_template_load",
  downloadString(props.name).catch((err) => {
    ElMessage.error(err)
  }),
)
</script>

<template>
  <Preview :id="props.name"></Preview>
</template>
