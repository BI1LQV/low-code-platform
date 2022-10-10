<script lang="ts" setup>
import { ref } from "vue"
import { storeToRefs } from "pinia"
import { dslList, useCanvasStore } from "@/store"
import { containerSlots, functionalSlots, isParent, isSun } from "@/models"
const canvasStore = useCanvasStore()
const { insertElement, appendElement, removeElement, setSelectedElement } = canvasStore
const { selectedElementId, dslString } = storeToRefs(canvasStore)

let i = 1

function insertInput() {
  let toInsert = dslList.get(selectedElementId.value)
  if (toInsert == null || isParent(toInsert)) {
    insertElement(
      {
        type: functionalSlots.EInput,
        binder: ref(`${i++}`),
        prop: {},
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
        prop: {},
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
        prop: {},
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
        prop: {},
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
  <div w-200px border-3px>
    <button @click="insertInput">insert input</button>
    <div></div>
    <button @click="insertContainer">insert container</button>
    <div></div>
    <button @click="appendAfter">append after input</button>
    <div></div>
    <button @click="appendBefore">append before input</button>
    <div></div>
    <button @click="del">delete element</button>
  </div>
  <div
    absolute
    left-200px
    pointer-events-none
    v-html="dslString.replaceAll('\n', '<br/>').replaceAll(' ', '&nbsp;')"
  ></div>
</template>
