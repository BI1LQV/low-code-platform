<script lang="tsx" setup>
import { storeToRefs } from "pinia"
import { computed, ref } from "vue"
import StylePanel from "./StylePanel.vue"
import { dslList, propList, useCanvasStore } from "@/store/canvasStore"
import { StylePanels } from "@/slots"
const canvasStore = useCanvasStore()
const { selectedElementId } = storeToRefs(canvasStore)
const activeName = ref("style")
const selectedProp = computed(() => propList.get(selectedElementId.value))
const OptionalPanel = computed(() => {
  const _type = dslList.get(selectedElementId.value)?.type
  // @ts-expect-error it's safe
  const Panel = StylePanels.get(_type)
  return Panel ?? <div></div>
})
</script>

<template>
  <div w-400px border-3px>
    <el-tabs v-model="activeName">
      <el-tab-pane label="样式" name="style">
        <StylePanel :selected-prop="selectedProp">
          <component :is="OptionalPanel"></component>
        </StylePanel>
      </el-tab-pane>
      <el-tab-pane label="属性" name="attr">Config</el-tab-pane>
    </el-tabs>
  </div>
</template>
