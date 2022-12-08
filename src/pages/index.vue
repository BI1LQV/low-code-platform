<script setup lang="ts">
import { useToggle } from "@vueuse/core"
import CanvasPanel from "@/components/CanvasPanel"
import PropertyPanel from "@/components/PropertyPanel.vue"
import ControlPanel from "@/components/ControlPanel.vue"
import Preview from "@/components/Preview"
import { load, save } from "@/store"

const [isPreview, togglePreview] = useToggle(false)
</script>

<template>
  <header h-40px>
    <el-button type="primary" @click="save">保存</el-button>
    <el-button type="primary" @click="load">载入</el-button>
    <el-button type="primary" @click="() => { save(); togglePreview() }">{{ isPreview ? "进入编辑" : "进入预览" }}</el-button>
  </header>
  <div flex flex-row h="[calc(100%-40px)]" justify-between>
    <ControlPanel></ControlPanel>
    <div w-800px border-3px>
      <Preview v-if="isPreview"></Preview> <CanvasPanel v-else></CanvasPanel>
    </div>
    <PropertyPanel></PropertyPanel>
  </div>
</template>
