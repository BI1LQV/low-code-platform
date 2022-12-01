<script setup lang="ts">
import { ref, watch, watchEffect } from "vue"

const { units } = defineProps<{
  units: string[]
}>()
const { modelValue } = defineModel<{
  modelValue: string
}>()

const numRef = ref("")
const unitRef = ref("")

watchEffect(() => {
  const splitted = modelValue.value.split(/(\d+)/)
  if (splitted.length >= 3) {
    const [_, _num, _unit] = splitted
    numRef.value = _num
    unitRef.value = _unit
  } else {
    unitRef.value = "auto"
    numRef.value = "0"
  }
})

watch([numRef, unitRef], ([num, unit]) => {
  if (unitRef.value === "auto") {
    modelValue.value = "auto"
  } else {
    modelValue.value = `${num}${unit}`
  }
})
</script>

<template>
  <el-input v-model="numRef" :disabled="unitRef === 'auto'" class="w-30%" />
  <el-radio-group v-model="unitRef">
    <el-radio-button v-for="unit of units" :key="unit" :label="unit"></el-radio-button>
    <el-radio-button label="auto"></el-radio-button>
  </el-radio-group>
</template>
