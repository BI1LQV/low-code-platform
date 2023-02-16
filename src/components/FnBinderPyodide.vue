<script lang="tsx" setup>
import { defineAsyncComponent, ref } from "vue"
import { Plus } from "@element-plus/icons-vue"

import { ElMessage } from "element-plus"
import Status from "./Status.vue"
import { useFuncStore } from "@/store/funcStore"
import { useAddFuncStore } from "@/store/addFuncStore"
import { worker } from "@/utils/pyodide/asyncPyodide"
import { LoadStatus } from "@/models/status"
import { findAndDelete } from "@/utils"
const { nameList } = useFuncStore()

const addFuncStore = useAddFuncStore()

const AsyncMonacoEditor = defineAsyncComponent({
  loader: () => import("@/components/MonacoEditor.vue"),
  loadingComponent: <div>组件加载中</div>,
})
const { form } = addFuncStore

const addingDep = ref(false)
async function addDep() {
  addingDep.value = true
  try {
    await worker.installDeps([form.depTmp])
    form.deps.push(form.depTmp)
    form.depTmp = ""
  } catch {
    ElMessage.error(`无法载入依赖 ${form.depTmp}`)
  }
  addingDep.value = false
}
</script>

<template>
  <el-form-item label="绑定目标函数">
    <el-input v-model="form.pyName" disabled class="w-70%"></el-input>
    <Status m-l-17px :size="20" :status="form.pyName ? LoadStatus.OK : LoadStatus.ERR"></Status>
  </el-form-item>

  <el-form-item label="绑定函数依赖">
    <el-tag
      v-for="dep of form.deps"
      :key="dep" closable class="mr-20px" type="warning"
      @close="findAndDelete(form.deps, dep)"
    >
      {{ dep }}
    </el-tag>
    <el-input v-model="form.depTmp" size="small" class="w-80px"></el-input>
    <el-button
      :loading="addingDep"
      type="primary" :icon="Plus"
      m-l-10px
      size="small"
      @click="addDep"
    >
      添加
    </el-button>
  </el-form-item>

  <el-form-item label="绑定函数实现体">
    <AsyncMonacoEditor
      v-model="form.impl"
      height="300px"
      language="json"
    ></AsyncMonacoEditor>
  </el-form-item>

  <el-form-item label="输入绑定列表">
    <el-badge v-for="(input, idx) in form.inputTypes" :key="input" class="m-r-60px" type="warning" :value="input">
      <el-select v-model="form.inputs[idx]" filterable class="w-100px">
        <el-option v-for="name of nameList" :key="name" :label="name" :value="name"></el-option>
      </el-select>
    </el-badge>
  </el-form-item>
  <el-form-item label="输出绑定">
    <el-badge v-for="(output, idx) in form.outputTypes" :key="output" class="m-r-60px" type="warning" :value="output">
      <el-select v-model="form.receivers[idx]" filterable class="w-100px">
        <el-option v-for="name of nameList" :key="name" :label="name" :value="name"></el-option>
      </el-select>
    </el-badge>
  </el-form-item>
</template>
