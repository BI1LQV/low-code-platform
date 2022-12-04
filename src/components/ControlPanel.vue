<script lang="ts" setup>
import { ref } from "vue"
import { useCanvasStore } from "@/store/canvasStore"
import type { allSlotsKey } from "@/models/slots"
import { allSlots, containerSlots } from "@/models/slots"
import { Slots } from "@/slots"
import type { NewSlotDragger } from "@/models/drags"
import MonacoEditor from "@/components/MonacoEditor.vue"
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
const funcType = ref("js")
const jsFuncImpl = ref("")
function handleClose() {
  console.log(jsFuncImpl.value)
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
    <el-select v-model="funcType">
      <el-option label="JavaScript函数" value="js" />
      <el-option label="Python云函数" value="py" />
    </el-select>
    <MonacoEditor
      v-if="funcType === 'js'"
      v-model="jsFuncImpl"
      height="300px"
      language="json"
    ></MonacoEditor>
    <template #footer>
      <span>
        <el-button @click="showAddBind = false">取消</el-button>
        <el-button type="primary" @click="showAddBind = false">
          添加
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
