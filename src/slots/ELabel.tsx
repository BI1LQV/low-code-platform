import type { Ref } from "vue"
import { Fragment, defineComponent, ref } from "vue"
import { ElColorPicker, ElFormItem, ElRadioButton, ElRadioGroup } from "element-plus"

import type { CommonOptions, SlotOptions } from "@/models/slots"
import { BaseStyleImpl } from "@/models/slots"

export const Component = defineComponent({
  name: "文本",
  props: ["binder", "prop", "isProd"],
  setup({ binder, prop, isProd: _isProd }: { binder: Ref<any>; prop: SlotOptions; isProd: boolean }) {
    return () => {
      return <span {...prop}>{binder.value}</span>
    }
  },
})

export function Binder() {
  return ref("输入文字")
}

export function Prop(): CommonOptions {
  return {
    "style": {
      ...BaseStyleImpl(),
      "overflow": "visible",
      "white-space": "pre",
    },
  }
}

export const AttrPanel = defineComponent({
  props: ["prop"],
  setup() {
    return () => {
      return <div></div>
    }
  },
})

export const StylePanel = defineComponent({
  props: ["prop"],
  setup(p) {
    return () => {
      return (
        <Fragment>
          <ElFormItem label="背景色">
          <ElColorPicker v-model={p.prop.style.backgroundColor} />
          </ElFormItem>
          <ElFormItem label="文字颜色">
          <ElColorPicker v-model={p.prop.style.color} />
          </ElFormItem>
          <ElFormItem label="溢出处理">
            <ElRadioGroup v-model={p.prop.style.overflow}>
              <ElRadioButton label="hidden">隐藏</ElRadioButton>
              <ElRadioButton label="scroll">滚动</ElRadioButton>
              <ElRadioButton label="visible">直接显示</ElRadioButton>
            </ElRadioGroup>
          </ElFormItem>
        </Fragment>
      )
    }
  },
})
