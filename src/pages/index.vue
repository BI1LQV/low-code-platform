<script setup lang="ts">
import CanvasPanel from "@/components/CanvasPanel"
import PropertyPanel from "@/components/PropertyPanel.vue"
import ControlPanel from "@/components/ControlPanel.vue"
import { useCanvasStore } from "@/store/canvasStore"
const { saveDSL, loadDSL } = useCanvasStore()
</script>

<template>
  <header h-40px>
    <button @click="saveDSL">保存</button>
    <button @click="loadDSL">载入</button>
  </header>
  <div flex flex-row h="[calc(100%-40px)]" justify-between>
    <ControlPanel></ControlPanel>
    <CanvasPanel></CanvasPanel>
    <PropertyPanel></PropertyPanel>
  </div>
</template>
