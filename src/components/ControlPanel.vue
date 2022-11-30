<script lang="ts" setup>
// import ControlDebugger from "./ControlDebugger.vue"
import { useCanvasStore } from "@/store/canvasStore"
import type { allSlotsKey } from "@/models/slots"
import { allSlots, containerSlots } from "@/models/slots"
import { Slots } from "@/slots"
import type { NewSlotDragger } from "@/models/drags"
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
</script>

<template>
  <div w-200px border-3px>
    <!-- <ControlDebugger></ControlDebugger> -->
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
  </div>
</template>
