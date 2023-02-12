<script lang="ts" setup>
import { Plus } from "@element-plus/icons-vue"
import { ref, watch } from "vue"
import Status from "./Status.vue"
import { useFuncStore } from "@/store/funcStore"
import { pyCallTest } from "@/utils/globalCall"

const { form, nameList } = useFuncStore()
const serverStatus = ref<"OK" | "ERR" | "LOAD">("ERR")
watch(() => [form.baseUrl, form.isDirect], async (_1, _2, onCleanUp) => {
  if (!/^http(s)?:\/\/[a-zA-Z.\-]+(:\d+)?$/.test(form.baseUrl)) { return }
  const aborter = new AbortController()
  onCleanUp(() => aborter.abort())
  serverStatus.value = "LOAD"
  pyCallTest(form.baseUrl, form.isDirect, aborter.signal).then(() => {
    serverStatus.value = "OK"
  }).catch(() => {
    serverStatus.value = "ERR"
  })
})
</script>

<template>
  <el-form-item label="绑定目标地址">
    <el-input v-model="form.baseUrl" class="w-70%"></el-input>
    <el-checkbox v-model="form.isDirect" class="m-l-20px"></el-checkbox><span m-l-5px>直连</span>
    <Status m-l-10px :size="20" :status="serverStatus"></Status>
  </el-form-item>
  <el-form-item label="绑定目标函数">
    <el-input v-model="form.pyName"></el-input>
  </el-form-item>

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
</template>
