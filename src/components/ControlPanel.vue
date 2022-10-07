<script lang="ts" setup>
import { ref } from "vue"
import { useCanvasStore } from "@/store"
import { containerSlots, functionalSlots } from "@/models"
const { insertElement } = useCanvasStore()
let pre: any = null
let i = 1
function append() {
  insertElement({
    type: functionalSlots.input,
    binder: ref(`${i++}`),
    prop: {},
  })
}

function appendC() {
  pre = insertElement({
    type: containerSlots.flex,
    binder: ref(`${i++}`),
    prop: {},
  })
}
function insertC() {
  insertElement(
    {
      type: functionalSlots.input,
      binder: ref(`${i++}`),
      prop: {},
    }, pre)
}
</script>

<template>
  <div w-200px border-3px>
    <button @click="append">add input</button>
    <div></div>
    <button @click="appendC">add container</button>
    <div></div>
    <button @click="insertC">insert container</button>
  </div>
</template>
