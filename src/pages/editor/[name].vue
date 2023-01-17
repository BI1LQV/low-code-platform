<script setup lang="ts">
import { useToggle } from "@vueuse/core"
import { ref } from "vue"
import { ElMessage } from "element-plus"
import CanvasPanel from "@/components/CanvasPanel"
import PropertyPanel from "@/components/PropertyPanel.vue"
import ControlPanel from "@/components/ControlPanel.vue"
import Preview from "@/components/Preview"
import { downloadString, exportString, importString, uploadString } from "@/store"

const props = defineProps<{ name: string }>()
const loading = ref(false)
downloadString(props.name, loading).catch((err) => {
  if (err !== "空模板") { ElMessage.error(err) }
})

const [isPreview, togglePreview] = useToggle(false)

const uploading = ref(false)
function save() {
  uploadString(props.name, exportString(), uploading).then(() => {
    ElMessage.success("保存成功")
  }).catch((err) => {
    ElMessage.error(err)
  })
}

function exportDsl() {
  navigator.clipboard.writeText(exportString())
}
async function importDsl() {
  importString(await navigator.clipboard.readText())
}
</script>

<template>
  <header h-40px>
    <el-button type="primary" :loading="uploading" @click="save">保存</el-button>
    <el-button type="primary" @click="() => { togglePreview() }">{{ isPreview ? "进入编辑" : "进入预览" }}</el-button>
    <el-button type="primary" @click="exportDsl">导出到剪切板</el-button>
    <el-button type="primary" @click="importDsl">从剪切板导入</el-button>
  </header>
  <div v-loading.fullscreen.lock="loading" flex flex-row h="[calc(100%-40px)]" justify-between>
    <ControlPanel></ControlPanel>
    <div w-800px border-3px>
      <Preview v-if="isPreview"></Preview> <CanvasPanel v-else></CanvasPanel>
    </div>
    <PropertyPanel></PropertyPanel>
  </div>
</template>
