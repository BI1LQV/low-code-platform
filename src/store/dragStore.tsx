import { defineStore } from "pinia"
import { ref } from "vue"
import type { DslSunElement, passedChild } from "@/models/slots"

export const useDragStore = defineStore("dragStore", () => {
  const draggingRaw = ref<passedChild>()
  const draggingImpl = ref<DslSunElement>()
  function setDraggingRaw(child: passedChild) {
    draggingRaw.value = child
  }
  function setDraggingImpl(child: DslSunElement) {
    draggingImpl.value = child
  }
  return { draggingRaw, setDraggingRaw, draggingImpl, setDraggingImpl }
})
