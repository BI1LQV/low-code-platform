<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { Plus } from "@element-plus/icons-vue"
import { useTemplateListStore } from "@/store/templateList"
const props = defineProps<{ isEditor: boolean }>()
const templateStore = useTemplateListStore()
const { loading, templates, loadError } = storeToRefs(templateStore)
templateStore.getTemplates()
</script>

<template>
  <el-alert v-if="loadError" title="加载应用列表时出错" type="error" effect="dark" important-absolute />
  <div m-40px>
    <div text-34px mb-20px>
      应用列表
    </div>
    <div v-loading.fullscreen.lock="loading" w-full flex flex-row gap-5 flex-wrap>
      <el-card v-for="item of templates" :key="item.id" w-400px flex-shrink-0 shadow="hover">
        <div>
          <span>{{ item.name }}</span>
          <div class="bottom">
            <el-button text class="button">Operating</el-button>
          </div>
        </div>
      </el-card>
      <el-card v-if="!props.isEditor" w-400px flex-shrink-0 shadow="hover">
        <div>
          <el-button text>
            <el-icon><Plus /></el-icon>
            添加应用
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
