<script lang="ts" setup>
import { ref } from "vue"
import { useCanvasStore } from "@/store"
import { functionalSlots } from "@/models"
const { appendElement } = useCanvasStore()
let i = 1
function append() {
  appendElement({
    type: functionalSlots.input,
    binder: ref(`${i++}`),
    prop: {},
  })
}
</script>

<template>
  <div w-200px border-3px>
    <button @click="append">add input</button>
  </div>
</template>
