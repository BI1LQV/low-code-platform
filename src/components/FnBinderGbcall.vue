<script lang="ts" setup>
import { Check, Close, Plus, RefreshRight } from "@element-plus/icons-vue"
import { ref, watchEffect } from "vue"
import { ElMessage } from "element-plus"
import { storeToRefs } from "pinia"
import Status from "./Status.vue"
import { useFuncStore } from "@/store/funcStore"
import { useAddFuncStore } from "@/store/addFuncStore"
import { findAndDelete } from "@/utils"
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

watchEffect(() => {
  if (form?.fileList?.[0]?.raw) {
    const reader = new FileReader()
    reader.readAsText(form.fileList[0].raw)
    reader.onload = (e) => {
      const code = e.target?.result as string
      form.impl = code
      form.codeIllegal = false
    }
  }
})
watchEffect(() => {
  if (form.codeIllegal) {
    ElMessage({
      message: "代码不合法",
      type: "error",
    })
  }
})
</script>

<template>
  <el-form-item label="存储云端">
    <el-switch v-model="form.saveOnServer" inline-prompt :active-icon="Check" :inactive-icon="Close" />
  </el-form-item>
  <template v-if="form.saveOnServer">
    <el-form-item label="代码文件">
      <el-upload v-model:file-list="form.fileList" :auto-upload="false" style="width:400px" :limit="1">
        <template #trigger>
          <el-button type="primary">选择文件</el-button>
        </template>
        <template #tip>
          <div class="el-upload__tip">
            一个绑定函数只能上传一个文件，若要替换请删除之前选择的文件。
          </div>
        </template>
      </el-upload>
    </el-form-item>
    <el-form-item label="绑定目标函数">
      <el-input v-model="form.pyName" disabled class="w-70%"></el-input>
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
        type="primary" :icon="Plus"
        m-l-10px
        size="small"
        @click="form.deps.push(form.depTmp)"
      >
        添加
      </el-button>
    </el-form-item>
  </template>
  <template v-else>
    <el-form-item label="绑定目标地址">
      <el-input v-model="form.baseUrl" class="w-70%"></el-input>
      <el-checkbox v-model="form.isDirect" class="m-l-20px"></el-checkbox><span m-l-5px>直连</span>
      <Status m-l-10px :size="20" :status="form.serverStatus"></Status>
    </el-form-item>
    <el-form-item label="绑定目标函数">
      <el-input v-model="form.pyName" class="w-70%"></el-input>
      <Status m-l-17px :size="20" :status="form.funcStatus"></Status>
      <el-button
        v-if="form.inputTypes.length || form.outputTypes.length" :loading="refreshLoading" m-l-20px size="small"
        type="warning" :icon="RefreshRight" @click="refreshType"
      >
        刷新类型
      </el-button>
    </el-form-item>
  </template>

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
