import type { Ref } from "vue"
import { Fragment, defineComponent, ref } from "vue"
import { ElFormItem, ElInput, ElSwitch } from "element-plus"
import "element-plus/es/components/switch/style/css"
import type { CommonOptions, SlotOptions } from "@/models/slots"
import { BaseStyleImpl } from "@/models/slots"

export const Component = defineComponent({
  name: "输入框",
  props: ["binder", "prop", "isProd"],
  setup({ binder, prop, isProd }: { binder: Ref<any>; prop: SlotOptions; isProd: boolean }) {
    return () => {
      // JSON.stringify(prop)// TODO: 研究到底是怎么做到依赖捕获的
      if (!isProd) {
        const newProp = { ...prop, disabled: false, readonly: prop.disabled }
        return <ElInput class={prop.disabled ? "override-el-input-disable" : ""} v-model={binder.value} {...newProp} />
      } else {
        return <ElInput v-model={binder.value} {...prop} />
      }
    }
  },
})

export function Prop(): CommonOptions {
  return {
    "style": {
      ...BaseStyleImpl(),
      "width": "50%",
      "height": "auto",
    },
    "placeholder": "请输入",
    "disabled": false,
  }
}

export const AttrPanel = defineComponent({
  props: ["prop"],
  setup(p) {
    return () => {
      return (<Fragment>
        <ElFormItem label="占位文本">
          <ElInput v-model={p.prop.placeholder}></ElInput>
        </ElFormItem>
        <ElFormItem label="是否禁用">
          <ElSwitch v-model={p.prop.disabled}></ElSwitch>
        </ElFormItem>
      </Fragment>)
    }
  },
})
export function Binder() {
  return ref("")
}
