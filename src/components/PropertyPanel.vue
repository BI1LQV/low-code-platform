<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { computed, ref } from "vue"
import StylePanel from "./StylePanel.vue"
import { propList, useCanvasStore } from "@/store/canvasStore"
const canvasStore = useCanvasStore()
const { selectedElementId } = storeToRefs(canvasStore)
const activeName = ref("style")
const selectedProp = computed(() => propList.get(selectedElementId.value))
</script>

<template>
  <div w-300px border-3px>
    <el-tabs v-model="activeName">
      <el-tab-pane label="样式" name="style"><StylePanel :selected-prop="selectedProp"></StylePanel></el-tab-pane>
      <el-tab-pane label="属性" name="attr">Config</el-tab-pane>
    </el-tabs>
  </div>
</template>
