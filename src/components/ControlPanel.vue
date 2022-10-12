<script lang="ts" setup>
import { storeToRefs } from "pinia"
// import ControlDebugger from "./ControlDebugger.vue"
import { dslList, useCanvasStore } from "@/store/canvasStore"
import type { allSlotsKey } from "@/models/slots"
import { allSlots, isSun } from "@/models/slots"
import { Slots } from "@/slots"
import type { NewSlotDragger } from "@/models/drags"
const canvasStore = useCanvasStore()
const {
  removeElement,
  setSelectedElement, clearPosPrompt, clearHoverHelper,
} = canvasStore
const { selectedElementId } = storeToRefs(canvasStore)

function del() {
  let toDel = dslList.get(selectedElementId.value)
  if (isSun(toDel)) {
    removeElement(toDel)
    setSelectedElement(toDel.parent)
  }
}
function dragHandler(ev: DragEvent, type: allSlotsKey) {
  ev.dataTransfer!.setData("text/plain", JSON.stringify({ type: "newSlot", slot: type } as NewSlotDragger))
  setSelectedElement({ id: "" })
}
function clearDragEffect() {
  clearPosPrompt()
  clearHoverHelper()
}
</script>

<template>
  <div w-200px border-3px>
    <!-- <ControlDebugger></ControlDebugger> -->
    <button @click="del">delete element</button>
    <template v-for="name of Slots.keys()" :key="name">
      <div></div>
      <button
        draggable="true"
        @dragstart="dragHandler($event, name)"
        @dragend="clearDragEffect()"
      >
        {{ allSlots[name] }}
      </button>
    </template>
  </div>
  <!-- <div
    absolute
    left-200px
    pointer-events-none
    v-html="dslString.replaceAll('\n', '<br/>').replaceAll(' ', '&nbsp;')"
  ></div> -->
</template>
