<script lang="tsx" setup>
import type { Component } from "vue"
import { ref, toRefs } from "vue"
import type { SlotOptions } from "@/models/slots"

const props = defineProps<{
  selectedProp: SlotOptions | undefined
  optionalPanel: Component
  selectedElementId: string
}>()
const { selectedProp: prop } = toRefs(props)
const bindingId = ref("")
</script>

<template>
  <div v-if="prop">
    <div class="w-100%">
      <el-form :model="prop.style" label-width="80px">
        <el-form-item label="绑定ID">
          <el-input v-model="bindingId"></el-input>
        </el-form-item>
        <Component :is="props.optionalPanel" :prop="prop"></Component>
      </el-form>
    </div>
  </div>
</template>
