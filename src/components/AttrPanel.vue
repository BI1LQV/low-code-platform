<script lang="tsx" setup>
import type { Component, Ref } from "vue"
import { ref, toRefs, watch } from "vue"
import { ElMessage } from "element-plus"
import type { SlotOptions } from "@/models/slots"
import { useFuncStore } from "@/store/funcStore"
const props = defineProps<{
  selectedProp: SlotOptions | undefined
  optionalPanel: Component
  selectedElementId: string
  selectedBinder: Ref<any> | undefined
}>()
const { getBindMap, setBindMap } = useFuncStore()
const { selectedProp: prop } = toRefs(props)
const bindingId = ref("")
watch(() => props.selectedElementId, () => {
  bindingId.value = getBindMap(props.selectedElementId)
})

function confirmBind() {
  setBindMap(bindingId.value, props.selectedElementId)
  ElMessage.success("绑定成功")
}
</script>

<template>
  <div v-if="prop">
    <div class="w-100%">
      <el-form :model="prop.style" label-width="80px">
        <el-form-item label="绑定ID">
          <el-input v-model="bindingId" class="w-50%"></el-input>
          <el-button type="success" m-l-10px @click="confirmBind">确定</el-button>
        </el-form-item>
        <el-form-item v-if="props.selectedBinder" label="绑定值">
          <el-input v-model="props.selectedBinder.value" class="w-50%"></el-input>
        </el-form-item>
        <Component :is="props.optionalPanel" :prop="prop"></Component>
      </el-form>
    </div>
  </div>
</template>
