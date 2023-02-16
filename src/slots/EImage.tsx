import type { Ref } from "vue"
import { Fragment, defineComponent, ref } from "vue"
import "element-plus/es/components/image/style/css"
import "element-plus/es/components/radio-group/style/css"
import "element-plus/es/components/radio-button/style/css"
import { ElFormItem, ElImage, ElRadioButton, ElRadioGroup } from "element-plus"
import type { CommonOptions, SlotOptions } from "@/models/slots"
import { BaseStyleImpl } from "@/models/slots"
import defaultJpg from "@/assets/default.jpg"

export const Component = defineComponent({
  name: "图片",
  props: ["binder", "prop", "isProd"],
  setup({ binder, prop, isProd }: { binder: Ref<any>; prop: SlotOptions; isProd: boolean }) {
    return () => {
      if (isProd) {
        const newProp = { ...prop, "preview-src-list": prop.enableBig ? [binder.value] : undefined }
        return <ElImage src={binder.value} {...newProp}></ElImage>
      } else {
        return <ElImage src={binder.value} {...prop}></ElImage>
      }
    }
  },
})

export function Prop(): CommonOptions {
  return {
    "style": {
      ...BaseStyleImpl(),
    },
    "fit": "fill",
    "enableBig": false,
  }
}

export function Binder() {
  return ref(defaultJpg)
}

export const StylePanel = defineComponent({
  props: ["prop"],
  setup(p) {
    return () => {
      return (<Fragment>
        <ElFormItem label="填充方式">
          <ElRadioGroup v-model={p.prop.fit}>
            <ElRadioButton label="fill">fill</ElRadioButton>
            <ElRadioButton label="contain">contain</ElRadioButton>
            <ElRadioButton label="cover">cover</ElRadioButton>
            <ElRadioButton label="scale-down">scale-down</ElRadioButton>
          </ElRadioGroup>
        </ElFormItem>
        <ElFormItem label="允许大图">
          <ElRadioGroup v-model={p.prop.enableBig}>
            <ElRadioButton label={true}>启用</ElRadioButton>
            <ElRadioButton label={false}>禁用</ElRadioButton>
          </ElRadioGroup>
        </ElFormItem>
      </Fragment>)
    }
  },
})
