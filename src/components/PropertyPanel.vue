<script lang="tsx" setup>
import { storeToRefs } from "pinia"
import type { Component } from "vue"
import { computed, ref } from "vue"
import StylePanel from "./StylePanel.vue"
import AttrPanel from "./AttrPanel.vue"
import EventEditorPanel from "./EventEditorPanel.vue"
import { useCanvasStore } from "@/store/canvasStore"
import { AttrPanels, StylePanels } from "@/slots"
const canvasStore = useCanvasStore()
const { selectedElementId } = storeToRefs(canvasStore)
const { binderList, dslList, propList } = canvasStore
const activeName = ref("style")
const selectedProp = computed(() => propList.get(selectedElementId.value))
const selectedBinder = computed(() => binderList.get(selectedElementId.value))
const OptionalStylePanel = computed<Component>(() => {
  const _type = dslList.get(selectedElementId.value)?.type
  // @ts-expect-error it's safe
  const Panel = StylePanels.get(_type)
  return Panel ?? <div></div>
})

const OptionalAttrPanel = computed<Component>(() => {
  const _type = dslList.get(selectedElementId.value)?.type
  // @ts-expect-error it's safe
  const Panel = AttrPanels.get(_type)
  return Panel ?? <div></div>
})
</script>

<template>
  <div w-400px border-3px>
    <el-tabs v-model="activeName">
      <el-tab-pane label="样式" name="style">
        <StylePanel :selected-prop="selectedProp" :optional-panel="OptionalStylePanel">
        </StylePanel>
      </el-tab-pane>
      <el-tab-pane label="属性" name="attr">
        <AttrPanel
          :selected-prop="selectedProp"
          :selected-binder="selectedBinder"
          :selected-element-id="selectedElementId"
          :optional-panel="OptionalAttrPanel"
        >
        </AttrPanel>
      </el-tab-pane>
      <el-tab-pane label="事件监听" name="event">
        <EventEditorPanel :selected-prop="selectedProp"></EventEditorPanel>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
