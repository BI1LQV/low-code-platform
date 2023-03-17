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
        <el-form-item label="字体大小">
          <NumberWithUnit v-model="prop.style['font-size']" :units="['px', 'rem']"></NumberWithUnit>
        </el-form-item>
        <el-form-item label="调整大小">
          <ElRadioGroup v-model="prop.style.resize" class="override-el-radio-button">
            <ElRadioButton label="both">都可</ElRadioButton>
            <ElRadioButton label="horizontal">水平</ElRadioButton>
            <ElRadioButton label="vertical">垂直</ElRadioButton>
            <ElRadioButton label="none">不可</ElRadioButton>
          </ElRadioGroup>
        </el-form-item>
        <ElFormItem label="背景色">
          <ElColorPicker v-model="prop.style.backgroundColor" />
        </ElFormItem>
        <ElFormItem label="文字颜色">
          <ElColorPicker v-model="prop.style.color" />
        </ElFormItem>
        <ElFormItem label="溢出处理">
          <ElRadioGroup v-model="prop.style.overflow">
            <ElRadioButton label="hidden">隐藏</ElRadioButton>
            <ElRadioButton label="scroll">滚动</ElRadioButton>
            <ElRadioButton label="visible">直接显示</ElRadioButton>
          </ElRadioGroup>
        </ElFormItem>

        <Component :is="props.optionalPanel" :prop="prop"></Component>
      </el-form>
    </div>
  </div>
</template>
