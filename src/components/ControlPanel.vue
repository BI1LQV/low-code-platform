<script lang="ts" setup>
import { ref } from "vue"
import { useCanvasStore } from "@/store/canvasStore"
import type { allSlotsKey } from "@/models/slots"
import { allSlots, containerSlots } from "@/models/slots"
import { Slots } from "@/slots"
import type { NewSlotDragger } from "@/models/drags"
import MonacoEditor from "@/components/MonacoEditor.vue"
import { useFuncStore } from "@/store/funcStore"
import { clearableReactive } from "@/composables/clearableReactive"

const { setFunc } = useFuncStore()

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
const [form, _setForm, clearForm] = clearableReactive(() => ({
  type: "js",
  name: "",
  impl: "",
  baseUrl: "",
}))
const jsFuncImpl = ref("")
function handleClose() {
  clearForm()
  showAddBind.value = false
}

function addFunc() {
  setFunc(form)
  showAddBind.value = false
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
            {{ allSlots[name] }}
          </button>
        </template>
      </el-tab-pane>
      <el-tab-pane label="数据绑定" name="binds">
        <el-button type="primary" size="small" @click="showAddBind = true">添加</el-button>
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
      <el-form-item v-if="form.type === 'js'" label="绑定函数实现体">
        <MonacoEditor

          v-model="jsFuncImpl"
          height="300px"
          language="json"
        ></MonacoEditor>
      </el-form-item>
      <el-form-item v-else label="绑定目标地址">
        <el-input v-model="form.baseUrl"></el-input>
      </el-form-item>
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
