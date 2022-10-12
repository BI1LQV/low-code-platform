<script lang="ts" setup>
import { ref } from "vue"
import { storeToRefs } from "pinia"
import { dslList, useCanvasStore } from "@/store/canvasStore"
import { containerSlots, functionalSlots, isParent, isSun } from "@/models/slots"
const canvasStore = useCanvasStore()
const {
  insertElement, appendElement, removeElement, setSelectedElement,
} = canvasStore
const { selectedElementId } = storeToRefs(canvasStore)

let i = 1
function insertInput() {
  let toInsert = dslList.get(selectedElementId.value)
  if (toInsert == null || isParent(toInsert)) {
    insertElement(
      {
        type: functionalSlots.EInput,
        binder: ref(`${i++}`),
      }, toInsert)
  }
}

function insertContainer() {
  let toInsert = dslList.get(selectedElementId.value)
  if (toInsert == null || isParent(toInsert)) {
    insertElement(
      {
        type: containerSlots.EFlex,
        binder: ref(`${i++}`),
      }, toInsert)
  }
}

function appendAfter() {
  let toInsert = dslList.get(selectedElementId.value)
  if (isSun(toInsert)) {
    appendElement(
      {
        type: functionalSlots.EInput,
        binder: ref(`${i++}`),
      }, toInsert, "after")
  }
}
function appendBefore() {
  let toInsert = dslList.get(selectedElementId.value)
  if (isSun(toInsert)) {
    appendElement(
      {
        type: functionalSlots.EInput,
        binder: ref(`${i++}`),
      }, toInsert, "before")
  }
}
function del() {
  let toDel = dslList.get(selectedElementId.value)
  if (isSun(toDel)) {
    removeElement(toDel)
    setSelectedElement(toDel.parent)
  }
}
</script>

<template>
  <button @click="insertInput">insert input</button>
  <div></div>
  <button @click="insertContainer">insert container</button>
  <div></div>
  <button @click="appendAfter">append after input</button>
  <div></div>
  <button @click="appendBefore">append before input</button>
  <div></div>
  <button @click="del">delete element</button>
</template>
