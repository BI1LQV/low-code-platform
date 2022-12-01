<script lang="tsx" setup>
import type { Component } from "vue"
import { toRefs } from "vue"
import type { SlotOptions } from "@/models/slots"

const props = defineProps<{
  selectedProp: SlotOptions | undefined
  optionalPanel: Component
}>()
const { selectedProp: prop } = toRefs(props)
</script>

<template>
  <div v-if="prop">
    <div class="w-100%">
      <el-form :model="prop.style" label-width="80px">
        <Component :is="props.optionalPanel" :prop="prop"></Component>
      </el-form>
    </div>
  </div>
</template>
