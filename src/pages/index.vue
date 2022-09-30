<script setup lang="ts">
import Canvas from "../components/Canvas.vue"
import PropertyPanel from "../components/PropertyPanel.vue"
import ControlPanel from "@/components/ControlPanel.vue"
</script>

<template>
  <header h-40px>
    abc
  </header>
  <div flex flex-row h="[calc(100%-40px)]" justify-between>
    <ControlPanel></ControlPanel>
    <Canvas></Canvas>
    <PropertyPanel></PropertyPanel>
  </div>
</template>
