<script lang="ts" setup>
import { toRefs } from "vue"
import NumberWithUnit from "./NumberWithUnit.vue"
import type { SlotOptions } from "@/models/slots"
const props = defineProps<{
  selectedProp: SlotOptions | undefined
}>()
const { selectedProp: prop } = toRefs(props)
</script>

<template>
  <div v-if="prop">
    <div class="w-100%">
      <el-form :model="prop.style" label-width="50px">
        <el-form-item label="宽度">
          <NumberWithUnit v-model="prop.style.width" :units="['%', 'px']"></NumberWithUnit>
        </el-form-item>
        <el-form-item label="高度">
          <NumberWithUnit v-model="prop.style.height" :units="['%', 'px']"></NumberWithUnit>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
