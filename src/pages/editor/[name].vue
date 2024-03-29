<script setup lang="ts">
import { useToggle } from "@vueuse/core"
import { ref } from "vue"
import { ElMessage } from "element-plus"
import CanvasPanel from "@/components/CanvasPanel"
import PropertyPanel from "@/components/PropertyPanel.vue"
import ControlPanel from "@/components/ControlPanel.vue"
import Preview from "@/components/Preview"
import { downloadString, exportString, importString, uploadString } from "@/store"
import { useLoadingStore } from "@/store/loadingStore"

const props = defineProps<{ name: string }>()

const loadingStore = useLoadingStore()

loadingStore.setGlobalLoader("editor_template_load",
  downloadString(props.name).catch((err) => {
    if (err !== "空模板") { ElMessage.error(err) }
  }))

const [isPreview, togglePreview] = useToggle(false)

const uploading = ref(false)
function save() {
  return uploadString(props.name, exportString(), uploading).then(() => {
    ElMessage.success("保存成功")
  }).catch((err) => {
    ElMessage.error(err)
  })
}

function exportDsl() {
  navigator.clipboard.writeText(exportString())
  ElMessage.success("已复制到剪切板")
}
async function importDsl() {
  importString(await navigator.clipboard.readText())
  ElMessage.success("已从剪切板导入")
}
</script>

<template>
  <header h-40px>
    <el-button type="primary" :loading="uploading" @click="save">保存</el-button>
    <el-button type="primary" @click="async () => { if (!isPreview){ await save() } togglePreview() }">{{ isPreview ? "进入编辑" : "保存并进入预览" }}</el-button>
    <el-button type="primary" @click="exportDsl">导出到剪切板</el-button>
    <el-button type="primary" @click="importDsl">从剪切板导入</el-button>
  </header>
  <div flex flex-row h="[calc(100%-40px)]" justify-between>
    <template v-if="!isPreview">
      <ControlPanel></ControlPanel>
      <div border-3px w="[calc(100%-600px)]">
        <CanvasPanel></CanvasPanel>
      </div>
      <PropertyPanel></PropertyPanel>
    </template>
    <Preview v-else :id="props.name"></Preview>
  </div>
</template>
