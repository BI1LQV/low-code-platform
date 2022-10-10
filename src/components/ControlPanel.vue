<script lang="ts" setup>
import { ref } from "vue"
import { storeToRefs } from "pinia"
import { dslList, useCanvasStore } from "@/store"
import { containerSlots, functionalSlots, isParent } from "@/models"
const canvasStore = useCanvasStore()
const { insertElement } = canvasStore
const { selectedElementId, dslString } = storeToRefs(canvasStore)

let i = 1

function appendC() {
  insertElement({
    type: containerSlots.EFlex,
    binder: ref(`${i++}`),
    prop: {},
  })
}

function insertD() {
  let toInsert = dslList.get(selectedElementId.value)!
  if (isParent(toInsert)) {
    insertElement(
      {
        type: functionalSlots.EInput,
        binder: ref(`${i++}`),
        prop: {},
      }, toInsert)
  }
}

function insertCon() {
  let toInsert = dslList.get(selectedElementId.value)!
  if (isParent(toInsert)) {
    insertElement(
      {
        type: containerSlots.EFlex,
        binder: ref(`${i++}`),
        prop: {},
      }, toInsert)
  }
}
</script>

<template>
  <div w-200px border-3px>
    <button @click="appendC">add container</button>
    <div></div>
    <button @click="insertD">insert input</button>
    <div></div>
    <button @click="insertCon">insert container</button>
    <div v-html="dslString.replaceAll('\n', '<br/>').replaceAll(' ', '&nbsp;')"></div>
  </div>
</template>
