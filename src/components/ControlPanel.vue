<script lang="ts" setup>
import { ref } from "vue"
import { useCanvasStore } from "@/store"
import { functionalSlots } from "@/models"
const { insertElement } = useCanvasStore()
let i = 1
function append() {
  insertElement({
    type: functionalSlots.input,
    binder: ref(`${i++}`),
    prop: {},
  })
}

function appendC() {
  insertElement({
    type: functionalSlots.container,
    binder: ref(`${i++}`),
    prop: {},
  })
}
</script>

<template>
  <div w-200px border-3px>
    <button @click="append">add input</button>
    <div></div>
    <button @click="appendC">add container</button>
  </div>
</template>
