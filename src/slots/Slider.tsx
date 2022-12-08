import type { Ref } from "vue"
import { Fragment, defineComponent } from "vue"
import { ElFormItem, ElInput, ElSlider, ElSwitch } from "element-plus"
import "element-plus/es/components/slider/style/css"
import type { CommonOptions, SlotOptions } from "@/models/slots"
import { BaseStyleImpl } from "@/models/slots"

export const Component = defineComponent({
  name: "ESlider",
  props: ["binder", "prop", "isProd"],
  setup({ binder, prop, isProd }: { binder: Ref<any>; prop: SlotOptions; isProd: boolean }) {
    return () => {
      if (!isProd) {
        const newProp = { ...prop, disabled: true }
        return <ElSlider v-model={binder.value} {...newProp} />
      }
      return <ElSlider v-model={binder.value} {...prop} />
    }
  },
})

export function Prop(): CommonOptions {
  return {
    "style": {
      ...BaseStyleImpl(),
    },
    "max": 100,
    "min": 0,
    "disabled": false,
  }
}

export const AttrPanel = defineComponent({
  props: ["prop"],
  setup(p) {
    return () => {
      return (<Fragment>
        <ElFormItem label="最大值">
          <ElInput v-model={p.prop.max} onInput={() => p.prop.max = Number(p.prop.max)}></ElInput>
        </ElFormItem>
        <ElFormItem label="最小值">
          <ElInput v-model={p.prop.min} onInput={() => p.prop.min = Number(p.prop.min)}></ElInput>
        </ElFormItem>
        <ElFormItem label="是否禁用">
          <ElSwitch v-model={p.prop.disabled}></ElSwitch>
        </ElFormItem>
      </Fragment>)
    }
  },
})
