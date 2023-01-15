<script setup lang="ts">
import Preview from "@/components/Preview"
const props = defineProps<{ name: string }>()
</script>

<template>
  {{ props.name }}
  <Preview></Preview>
</template>
