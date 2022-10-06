<script lang="ts" setup>
import { ref } from "vue"
import { useCanvasStore } from "@/store"
const { appendElement } = useCanvasStore()
let i = 1
function append() {
  appendElement({
    type: "input",
    binder: ref(`${i++}`),
    prop: {},
    style: {},
  })
}
</script>

<template>
  <div w-200px border-3px>
    <button @click="append">add input</button>
  </div>
</template>
