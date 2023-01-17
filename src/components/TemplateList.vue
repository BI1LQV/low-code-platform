<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { Plus } from "@element-plus/icons-vue"
import { useRouter } from "vue-router"
import { ElMessage } from "element-plus"
import { ref } from "vue"
import { useTemplateListStore } from "@/store/templateList"
const props = defineProps<{ isEditor: boolean }>()
const templateStore = useTemplateListStore()
const router = useRouter()
const { loading, templateList, loadError, author } = storeToRefs(templateStore)
templateStore.getTemplateList()

function toPreview(jump: boolean, id: number) {
  if (jump) {
    router.push(`/preview/${id}`)
  }
}

function toEdit(id: number) {
  router.push(`/editor/${id}`)
}
const deleteLoading = ref(false)
function confirmDelete(id: number) {
  templateStore.deleteTemplate(id, deleteLoading).catch((err) => {
    ElMessage.error(`删除失败，错误原因为${err}`)
  })
}

const displayAddTemplateDialog = ref(false)
const addTemplateName = ref("")

function addTemplate() {
  displayAddTemplateDialog.value = true
}

const addLoading = ref(false)
function confirmAdd() {
  templateStore.addTemplate(addTemplateName.value, author.value, addLoading).then(() => {
    displayAddTemplateDialog.value = false
    addTemplateName.value = ""
  }).catch((err) => {
    ElMessage.error(`添加失败，错误原因为${err}`)
  })
}
</script>

<template>
  <el-alert v-if="loadError !== ''" center show-icon title="加载出错" :description="loadError" type="error" effect="dark" important-absolute />
  <div m-40px>
    <div text-34px mb-20px>
      应用列表
    </div>
    <div v-loading.fullscreen.lock="loading" w-full flex flex-row gap-5 flex-wrap>
      <el-card
        v-for="item of templateList"
        :key="item.id" w-400px flex-shrink-0
        :class="props.isEditor ? '' : 'cursor-pointer'"
        :shadow="props.isEditor ? 'always' : 'hover'"
        @click="toPreview(!props.isEditor, item.id)"
      >
        <div>
          <div flex justify-between items-end>
            <span text-20px>{{ item.name }}</span>
            <span>{{ item.author }}</span>
          </div>
          <div v-if="props.isEditor" flex justify-end mt-20px>
            <el-button text bg @click="toPreview(true, item.id)">查看</el-button>
            <el-button text bg>复制</el-button>
            <el-button text bg @click="toEdit(item.id)">编辑</el-button>
            <el-popover
              :width="240"
              trigger="click"
            >
              <template #reference>
                <el-button text bg type="danger">删除</el-button>
              </template>
              <div>
                <div>您确认要删除应用 {{ item.name }} 吗？</div>
                <div flex justify-end mt-20px>
                  <el-button
                    type="danger" :loading="deleteLoading"
                    @click="confirmDelete(item.id)"
                  >
                    确认删除
                  </el-button>
                </div>
              </div>
            </el-popover>
          </div>
        </div>
      </el-card>
      <el-card v-if="props.isEditor" w-400px flex-shrink-0>
        <div>
          <div flex justify-between items-end>
            <span text-20px>新的应用</span>
          </div>
          <div flex justify-end mt-20px>
            <el-button text bg @click="addTemplate">
              <el-icon><Plus /></el-icon>
              添加
            </el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>

  <el-dialog
    v-model="displayAddTemplateDialog"
    title="Tips"
    width="30%"
    :before-close="() => addTemplateName = ''"
  >
    <el-form>
      <el-form-item label="应用名称" :label-width="70">
        <el-input v-model="addTemplateName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="作者" :label-width="70">
        <el-input v-model="author" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="displayAddTemplateDialog = false">Cancel</el-button>
        <el-button :loading="addLoading" type="primary" @click="confirmAdd">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
