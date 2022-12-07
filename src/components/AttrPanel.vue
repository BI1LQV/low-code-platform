<script lang="tsx" setup>
import type { Component } from "vue"
import { ref, toRefs, watch } from "vue"
import type { SlotOptions } from "@/models/slots"
import { useFuncStore } from "@/store/funcStore"
const props = defineProps<{
  selectedProp: SlotOptions | undefined
  optionalPanel: Component
  selectedElementId: string
}>()
const { getBindMap, setBindMap } = useFuncStore()
const { selectedProp: prop } = toRefs(props)
const bindingId = ref("")
watch(() => props.selectedElementId, () => {
  bindingId.value = getBindMap(props.selectedElementId)
})
</script>

<template>
  <div v-if="prop">
    <div class="w-100%">
      <el-form :model="prop.style" label-width="80px">
        <el-form-item label="绑定ID">
          <el-input v-model="bindingId" class="w-50%"></el-input>
          <el-button type="success" @click="setBindMap(bindingId, selectedElementId)">确定</el-button>
        </el-form-item>
        <Component :is="props.optionalPanel" :prop="prop"></Component>
      </el-form>
    </div>
  </div>
</template>
