<script setup lang="ts">
import { DataLine, Edit } from "@element-plus/icons-vue"
</script>

<template>
  <div h-full flex flex-row justify-center gap-50px items-center>
    <div text-42px>
      人工智能低代码开发平台
    </div>
    <router-link to="/editor">
      <el-card cursor-pointer shadow="hover" class="entry">
        <div text-32px flex justify-center h-full items-center>
          <el-icon><Edit /></el-icon>
          编辑
        </div>
      </el-card>
    </router-link>
    <router-link to="/preview">
      <el-card cursor-pointer shadow="hover" class="entry">
        <div text-32px flex justify-center h-full items-center>
          <el-icon><DataLine /></el-icon>
          预览
        </div>
      </el-card>
    </router-link>
  </div>
</template>

<style>
.entry{
  width:300px;
  height:200px;
}
.entry .el-card__body{
  height:100%;
}
</style>
