<script lang="ts" setup>
import { defineAsyncComponent } from "vue"
import { Plus } from "@element-plus/icons-vue"
import { useFuncStore } from "@/store/funcStore"
const AsyncMonacoEditor = defineAsyncComponent(() => {
  return import("@/components/MonacoEditor.vue").then(res => res.default)
})
const { form, nameList } = useFuncStore()
</script>

<template>
  <el-form-item label="输入绑定列表">
    <el-button
      v-for="input of form.inputs" :key="input"
      type="warning"
      round
      disabled
    >
      {{ input }}
    </el-button>
    <el-select v-model="form.inputTmp">
      <el-option v-for="name of nameList" :key="name" :label="name" :value="name"></el-option>
    </el-select>
    <el-button
      type="primary" :icon="Plus" circle
      @click="() => { form.inputs.push(form.inputTmp);form.inputTmp = '' }"
    />
  </el-form-item>
  <el-form-item label="输出绑定">
    <el-button
      v-for="receiver of form.receivers" :key="receiver"
      type="warning"
      round
      disabled
    >
      {{ receiver }}
    </el-button>
    <el-select v-model="form.receiverTmp">
      <el-option v-for="name of nameList" :key="name" :label="name" :value="name"></el-option>
    </el-select>
    <el-button
      type="primary" :icon="Plus" circle
      @click="() => { form.receivers.push(form.receiverTmp);form.receiverTmp = '' }"
    />
  </el-form-item>

  <el-form-item v-if="form.type === 'js'" label="绑定函数实现体">
    <AsyncMonacoEditor
      v-model="form.impl"
      height="300px"
      language="json"
    ></AsyncMonacoEditor>
  </el-form-item>
</template>
