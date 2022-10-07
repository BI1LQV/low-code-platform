<script setup lang="ts">
import CanvasPanel from "@/components/CanvasPanel"
import PropertyPanel from "@/components/PropertyPanel.vue"
import ControlPanel from "@/components/ControlPanel.vue"
// TODO: 处理这个问题
// let root = ref<any[]>([])

// let s = computed(() => {
//   console.log("computed reload")
//   return root.value.map((i) => {
//     return i
//   })
// })

// watch(root, () => {
//   console.log("watch reload")
// })

// root.value.push([])
// setTimeout(() => root.value[0].push(2), 500)
</script>

<template>
  <header h-40px>
    abc
  </header>
  <div flex flex-row h="[calc(100%-40px)]" justify-between>
    <ControlPanel></ControlPanel>
    <CanvasPanel></CanvasPanel>
    <PropertyPanel></PropertyPanel>
  </div>
</template>
