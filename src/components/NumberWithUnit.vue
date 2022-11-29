<script setup lang="ts">
import { ref, watch } from "vue"

const { units } = defineProps<{
  units: string[]
}>()
const { modelValue } = defineModel<{
  modelValue: string
}>()

const [_, _num, _unit] = modelValue.value.split(/(\d+)/)
const numRef = ref(_num)
const unitRef = ref(_unit)
watch([numRef, unitRef], ([num, unit]) => {
  modelValue.value = `${num}${unit}`
})
</script>

<template>
  <el-input v-model="numRef" class="w-50%" />
  <el-radio-group v-model="unitRef">
    <el-radio-button v-for="unit of units" :key="unit" :label="unit"></el-radio-button>
  </el-radio-group>
</template>
