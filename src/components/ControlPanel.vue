<script lang="ts" setup>
import { ref } from "vue"

import { ElMessage } from "element-plus"
import { Delete, Edit } from "@element-plus/icons-vue"
import { storeToRefs } from "pinia"
import FnBinderPyodide from "./FnBinderPyodide.vue"
import FnBinderGbcall from "@/components/FnBinderGbcall.vue"
import FnBinderJs from "@/components/FnBinderJs.vue"
import { useCanvasStore } from "@/store/canvasStore"
import type { allSlotsKey } from "@/models/slots"
import { containerSlots } from "@/models/slots"
import { Slots } from "@/slots"
import type { NewSlotDragger } from "@/models/drags"
import { useFuncStore } from "@/store/funcStore"
import { useAddFuncStore } from "@/store/addFuncStore"
const funcStore = useFuncStore()

const { setFunc, funcMap, deleteFunc } = useFuncStore()
const { form, clearForm, setForm } = useAddFuncStore()
const { showAddBind } = storeToRefs(useAddFuncStore())

const activeName = ref("comps")

const showedSlots = Array.from(Slots.keys())
showedSlots.splice(showedSlots.findIndex(i => i === containerSlots.ERoot), 1)

const canvasStore = useCanvasStore()
const {
  setSelectedElement, clearDragEffect,
} = canvasStore

function dragHandler(ev: DragEvent, type: allSlotsKey) {
  ev.dataTransfer!.setData("text/plain", JSON.stringify({ type: "newSlot", slot: type } as NewSlotDragger))
  setSelectedElement({ id: "" })
}

function addFunc() {
  if (form.isModify) {
    deleteFunc(form.isModify)
  }
  if (form.name in funcMap) {
    ElMessage.error("函数名已存在")
    return
  }
  setFunc(form)
  showAddBind.value = false
}

function modify(scope: any) {
  // @ts-expect-error okay
  setForm(funcMap[scope.row.name])
  form.isModify = scope.row.name
  showAddBind.value = true
}

function del(scope: any) {
  deleteFunc(scope.row.name)
}
</script>

<template>
  <div w-200px border-3px>
    <el-tabs v-model="activeName">
      <el-tab-pane label="组件" name="comps">
        <template v-for="name of showedSlots" :key="name">
          <div></div>
          <button draggable="true" @dragstart="dragHandler($event, name)" @dragend="clearDragEffect()">
            {{ Slots.get(name)!.name }}
          </button>
        </template>
      </el-tab-pane>
      <el-tab-pane label="数据绑定" name="binds">
        <el-button type="primary" size="small" @click="clearForm(); showAddBind = true">添加</el-button>
        <el-table :data="funcStore.funcList" stripe style="width: 100%">
          <el-table-column prop="name" />
          <el-table-column>
            <template #default="scope">
              <el-button :icon="Edit" circle size="small" @click="modify(scope)"></el-button>
              <el-popconfirm :width="200" :title="`您确定要删除绑定函数${scope.row.name}吗?`" @confirm="del(scope)">
                <template #reference>
                  <el-button :icon="Delete" circle size="small"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>

  <el-dialog v-model="showAddBind" title="添加数据绑定" width="50%">
    <el-form :model="form" label-width="120px">
      <el-form-item label="绑定函数名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="绑定函数类型">
        <el-select v-model="form.type">
          <el-option label="Python云函数" value="py" />
          <el-option label="Python本地函数" value="pyodide" />
          <el-option label="JavaScript函数" value="js" />
        </el-select>
      </el-form-item>
      <el-form-item label="触发机制">
        <el-checkbox v-model="form.autoTrigger" label="自动触发" />
      </el-form-item>
      <FnBinderGbcall v-if="form.type === 'py'"></FnBinderGbcall>
      <FnBinderJs v-if="form.type === 'js'"></FnBinderJs>
      <FnBinderPyodide v-if="form.type === 'pyodide'"></FnBinderPyodide>
    </el-form>
    <template #footer>
      <span>
        <el-button @click="showAddBind = false">取消</el-button>
        <el-button type="primary" @click="addFunc">
          {{ form.isModify ? "修改" : "添加" }}绑定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
