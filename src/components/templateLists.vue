<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { Plus } from "@element-plus/icons-vue"
import { useRouter } from "vue-router"
import { useTemplateListStore } from "@/store/templateList"
const props = defineProps<{ isEditor: boolean }>()
const templateStore = useTemplateListStore()
const router = useRouter()
const { loading, templates, loadError } = storeToRefs(templateStore)
templateStore.getTemplates()

function toPreview(jump: boolean, id: number) {
  if (jump) {
    router.push(`/preview/${id}`)
  }
}
</script>

<template>
  <el-alert v-if="loadError" title="加载应用列表时出错" type="error" effect="dark" important-absolute />
  <div m-40px>
    <div text-34px mb-20px>
      应用列表
    </div>
    <div v-loading.fullscreen.lock="loading" w-full flex flex-row gap-5 flex-wrap>
      <el-card
        v-for="item of templates"
        :key="item.id" w-400px flex-shrink-0
        :class="props.isEditor ? '' : 'cursor-pointer'"
        :shadow="props.isEditor ? 'always' : 'hover'"
        @click="toPreview(!props.isEditor, item.id)"
      >
        <div>
          <div flex justify-between items-end>
            <span text-20px>{{ item.name }}</span>
            <span>{{ item.id }}</span>
          </div>
          <div v-if="props.isEditor" flex justify-end>
            <el-button text bg @click="toPreview(true, item.id)">查看</el-button>
            <el-button text bg>复制</el-button>
            <el-button text bg>编辑</el-button>
            <el-button text bg type="danger">删除</el-button>
          </div>
        </div>
      </el-card>
      <el-card v-if="props.isEditor" w-400px flex-shrink-0>
        <div>
          <div flex justify-between items-end>
            <span text-20px>新的应用</span>
            <span>b</span>
          </div>
          <div flex justify-end>
            <el-button text bg>
              <el-icon><Plus /></el-icon>
              添加
            </el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
