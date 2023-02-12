<script lang="ts" setup>
import { ref } from "vue"

import FnBinderGbcall from "@/components/FnBinderGbcall.vue"
import FnBinderJs from "@/components/FnBinderJs.vue"
import { useCanvasStore } from "@/store/canvasStore"
import type { allSlotsKey } from "@/models/slots"
import { containerSlots } from "@/models/slots"
import { Slots } from "@/slots"
import type { NewSlotDragger } from "@/models/drags"
import { useFuncStore } from "@/store/funcStore"
const funcStore = useFuncStore()

const { setFunc, funcMap, form, clearForm, setForm } = useFuncStore()

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

const showAddBind = ref(false)

function handleClose() {
  clearForm()
  showAddBind.value = false
}

function addFunc() {
  setFunc(form)
  showAddBind.value = false
}

function modify(scope: any) {
  // @ts-expect-error okay
  setForm(funcMap[scope.row.name])
  showAddBind.value = true
}
</script>

<template>
  <div w-200px border-3px>
    <el-tabs v-model="activeName">
      <el-tab-pane label="组件" name="comps">
        <template v-for="name of showedSlots" :key="name">
          <div></div>
          <button
            draggable="true"
            @dragstart="dragHandler($event, name)"
            @dragend="clearDragEffect()"
          >
            {{ Slots.get(name)!.name }}
          </button>
        </template>
      </el-tab-pane>
      <el-tab-pane label="数据绑定" name="binds">
        <el-button type="primary" size="small" @click="showAddBind = true">添加</el-button>
        <el-table :data="funcStore.funcList" stripe style="width: 100%">
          <el-table-column prop="name" />
          <el-table-column>
            <template #default="scope">
              <el-button @click="modify(scope)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>

  <el-dialog
    v-model="showAddBind"
    title="添加数据绑定"
    width="50%"
    :before-close="handleClose"
  >
    <el-form :model="form" label-width="120px">
      <el-form-item label="绑定函数名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="绑定函数类型">
        <el-select v-model="form.type">
          <el-option label="JavaScript函数" value="js" />
          <el-option label="Python云函数" value="py" />
        </el-select>
      </el-form-item>
      <FnBinderGbcall v-if="form.type === 'py'"></FnBinderGbcall>
      <FnBinderJs v-if="form.type === 'js'"></FnBinderJs>
    </el-form>
    <template #footer>
      <span>
        <el-button @click="showAddBind = false">取消</el-button>
        <el-button type="primary" @click="addFunc">
          添加绑定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
