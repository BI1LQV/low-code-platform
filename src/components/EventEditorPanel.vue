<script setup lang="ts">
import { computed, ref } from "vue"
import { Delete, Edit } from "@element-plus/icons-vue"
import type { SlotOptions } from "@/models/slots"
import { clearableReactive } from "@/composables/clearableReactive"
import { useFuncStore } from "@/store/funcStore"
import { eventNameMap } from "@/assets/eventNames"
const props = defineProps<{ selectedProp: SlotOptions | undefined }>()
const funcStore = useFuncStore()

const displayedKeys = computed(() => Object.entries(
  props.selectedProp?.events || {},
)
  .map(([name, val]) => ({ name, val, displayName: eventNameMap[name] })))

const showAdd = ref(false)

const [form, setForm, clearForm] = clearableReactive(() => ({
  eventName: "click",
  fns: [],
  isModify: false,
}))

function addListener() {
  if (!props.selectedProp) { return }
  if (props.selectedProp.events) {
    props.selectedProp.events[form.eventName] = form.fns
  } else {
    props.selectedProp.events = { [form.eventName]: form.fns }
  }
  showAdd.value = false
}

function modify(scope: any) {
  setForm({
    eventName: scope.row.name,
    fns: props.selectedProp!.events[scope.row.name],
    isModify: true,
  })
  showAdd.value = true
}

function delListener(scope: any) {
  if (!props.selectedProp) { return }
  delete props.selectedProp.events[scope.row.name]
}
</script>

<template>
  <template v-if="props.selectedProp">
    <el-button type="primary" size="small" @click="clearForm();showAdd = true">添加</el-button>
    <el-table :data="displayedKeys" stripe style="width: 100%">
      <el-table-column prop="displayName" />
      <el-table-column>
        <template #default="scope">
          <el-button :icon="Edit" circle size="small" @click="modify(scope)"></el-button>
          <el-popconfirm :width="200" :title="`您确定要删除事件${scope.row.name}的监听吗?`" @confirm="delListener(scope)">
            <template #reference>
              <el-button :icon="Delete" circle size="small"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="showAdd"
      title="添加事件监听"
      width="50%"
    >
      <el-form :model="form" label-width="120px">
        <el-form-item label="事件名称">
          <el-select v-model="form.eventName" :disabled="form.isModify">
            <el-option v-for="item of Object.entries(eventNameMap)" :key="item[0]" :label="item[1]" :value="item[0]" />
          </el-select>
        </el-form-item>
        <el-form-item label="触发函数">
          <el-select
            v-model="form.fns"
            multiple
            placeholder="选择需要绑定的函数"
          >
            <el-option
              v-for="item in funcStore.funcList"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="showAdd = false">取消</el-button>
          <el-button type="primary" @click="addListener">
            {{ form.isModify ? "修改" : "添加" }}监听
          </el-button>
        </span>
      </template>
    </el-dialog>
  </template>
  <template v-else>未选择可监听元素</template>
</template>
