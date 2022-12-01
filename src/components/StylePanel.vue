<script lang="tsx" setup>
import type { Component } from "vue"
import { toRefs } from "vue"
import NumberWithUnit from "./NumberWithUnit.vue"
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
        <el-form-item label="宽度">
          <NumberWithUnit v-model="prop.style.width" :units="['%', 'px']"></NumberWithUnit>
        </el-form-item>
        <el-form-item label="高度">
          <NumberWithUnit v-model="prop.style.height" :units="['%', 'px']"></NumberWithUnit>
        </el-form-item>
        <el-form-item label="上间距">
          <NumberWithUnit v-model="prop.style['margin-top']" :units="['%', 'px']"></NumberWithUnit>
        </el-form-item>
        <el-form-item label="下间距">
          <NumberWithUnit v-model="prop.style['margin-bottom']" :units="['%', 'px']"></NumberWithUnit>
        </el-form-item>
        <el-form-item label="左间距">
          <NumberWithUnit v-model="prop.style['margin-left']" :units="['%', 'px']"></NumberWithUnit>
        </el-form-item>
        <el-form-item label="右间距">
          <NumberWithUnit v-model="prop.style['margin-right']" :units="['%', 'px']"></NumberWithUnit>
        </el-form-item>
        <Component :is="props.optionalPanel" :prop="prop"></Component>
      </el-form>
    </div>
  </div>
</template>
