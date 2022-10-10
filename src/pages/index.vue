<script setup lang="ts">
import CanvasPanel from "@/components/CanvasPanel"
import PropertyPanel from "@/components/PropertyPanel.vue"
import ControlPanel from "@/components/ControlPanel.vue"
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
