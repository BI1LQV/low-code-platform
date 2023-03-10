<script lang="tsx" setup>
import type { Component, Ref } from "vue"
import { defineAsyncComponent, ref, toRefs, watch } from "vue"
import { ElMessage } from "element-plus"
import type { SlotOptions } from "@/models/slots"
import { useFuncStore } from "@/store/funcStore"
const props = defineProps<{
  selectedProp: SlotOptions | undefined
  optionalPanel: Component
  selectedElementId: string
  selectedBinder: Ref<any> | undefined
}>()
const AsyncMonacoEditor = defineAsyncComponent({
  loader: () => import("@/components/MonacoEditor.vue"),
  loadingComponent: <div>组件加载中</div>,
})

const propStr = ref("")
const showCodeEdit = ref(false)
function toggleShowCodeEdit() {
  showCodeEdit.value = !showCodeEdit.value
  if (showCodeEdit.value) {
    propStr.value = JSON.stringify(props.selectedProp, null, 2)
  }
}

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
function confirmEdit() {
  try {
    if (!prop.value) { throw new Error("prop is undefined") }
    const newProp = JSON.parse(propStr.value)
    for (const key of Object.keys(prop.value)) {
      delete prop.value[key]
    }
    Object.assign(prop.value, newProp)
    toggleShowCodeEdit()
    ElMessage.success("修改成功")
  } catch (error) {
    ElMessage.error("JSON格式错误")
  }
}
</script>

<template>
  <div v-if="prop">
    <div class="w-100%">
      <el-button m-b-20px m-l-20px type="primary" size="small" @click="toggleShowCodeEdit">直接编辑</el-button>
      <template v-if="showCodeEdit">
        <AsyncMonacoEditor v-model="propStr" height="300px" language="json"></AsyncMonacoEditor>
        <el-button @click="confirmEdit">确认</el-button>
      </template>
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
