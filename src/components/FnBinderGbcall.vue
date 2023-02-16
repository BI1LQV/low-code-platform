<script lang="ts" setup>
import { RefreshRight } from "@element-plus/icons-vue"
import { ref } from "vue"
import { ElMessage } from "element-plus"
import { storeToRefs } from "pinia"
import Status from "./Status.vue"
import { useFuncStore } from "@/store/funcStore"
import { useAddFuncStore } from "@/store/addFuncStore"
const funcStore = useFuncStore()
const { nameList } = storeToRefs(funcStore)
const addFuncStore = useAddFuncStore()
const { form, refreshTypes } = addFuncStore
const refreshLoading = ref(false)
function refreshType() {
  refreshLoading.value = true
  Promise.resolve(refreshTypes()).then(() => {
    ElMessage.success("刷新成功")
  }).catch(() => {
    ElMessage.error("刷新失败")
  }).finally(() => {
    refreshLoading.value = false
  })
}
</script>

<template>
  <el-form-item label="绑定目标地址">
    <el-input v-model="form.baseUrl" class="w-70%"></el-input>
    <el-checkbox v-model="form.isDirect" class="m-l-20px"></el-checkbox><span m-l-5px>直连</span>
    <Status m-l-10px :size="20" :status="form.serverStatus"></Status>
  </el-form-item>
  <el-form-item label="绑定目标函数">
    <el-input v-model="form.pyName" class="w-70%"></el-input>
    <Status m-l-17px :size="20" :status="form.funcStatus"></Status>
    <el-button v-if="form.inputTypes.length || form.outputTypes.length" :loading="refreshLoading" m-l-20px size="small" type="warning" :icon="RefreshRight" @click="refreshType">刷新类型</el-button>
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
