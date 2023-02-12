<script lang="ts" setup>
import Status from "./Status.vue"
import { useFuncStore } from "@/store/funcStore"
import { useAddFuncStore } from "@/store/addFuncStore"

const { nameList } = useFuncStore()

const addFuncStore = useAddFuncStore()
const { form } = addFuncStore
</script>

<template>
  <el-form-item label="绑定目标地址">
    <el-input v-model="form.baseUrl" class="w-70%"></el-input>
    <el-checkbox v-model="form.isDirect" class="m-l-20px"></el-checkbox><span m-l-5px>直连</span>
    <Status m-l-10px :size="20" :status="addFuncStore.serverStatus"></Status>
  </el-form-item>
  <el-form-item label="绑定目标函数">
    <el-input v-model="form.pyName" class="w-70%"></el-input>
    <Status m-l-17px :size="20" :status="addFuncStore.funcStatus"></Status>
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
