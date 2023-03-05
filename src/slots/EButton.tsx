import type { Ref } from "vue"
import { Fragment, defineComponent, ref } from "vue"
import { ElButton, ElFormItem, ElInput, ElRadioButton, ElRadioGroup, ElSwitch } from "element-plus"
import "element-plus/es/components/switch/style/css"
import "element-plus/es/components/button/style/css"
import type { CommonOptions, SlotOptions } from "@/models/slots"
import { BaseStyleImpl } from "@/models/slots"

export const Component = defineComponent({
  name: "按钮",
  props: ["binder", "prop", "isProd"],
  setup({ binder, prop }: { binder: Ref<any>; prop: SlotOptions; isProd: boolean }) {
    return () => {
      return <ElButton v-model={binder.value} {...prop}>{prop.innerVal}</ElButton>
    }
  },
})

export function Prop(): CommonOptions {
  return {
    "style": {
      ...(() => {
        const base = BaseStyleImpl()
        // @ts-expect-error 偷懒。
        delete base["background-color"]
        // @ts-expect-error 偷懒。
        delete base.color
        return base
      })(),
    },
    "disabled": false,
    "innerVal": "按钮名字",
    "type": "primary",
    "round": false,
    "plain": false,
    "text": false,
    "bg": false,
    "size": "default",
  }
}

export const AttrPanel = defineComponent({
  props: ["prop"],
  setup(p) {
    return () => {
      return (<Fragment>
        <ElFormItem label="是否禁用">
          <ElSwitch v-model={p.prop.disabled}></ElSwitch>
        </ElFormItem>
        <ElFormItem label="按钮名称">
          <ElInput v-model={p.prop.innerVal}></ElInput>
        </ElFormItem>
        <ElFormItem label="尺寸">
          <ElRadioGroup v-model={p.prop.size}>
            <ElRadioButton label="default" />
            <ElRadioButton label="small" />
            <ElRadioButton label="large" />
          </ElRadioGroup>
        </ElFormItem>
        <ElFormItem label="按钮类型">
          <ElRadioGroup v-model={p.prop.type}>
            <ElRadioButton label="default" />
            <ElRadioButton label="primary" />
            <ElRadioButton label="success" />
            <ElRadioButton label="info" />
            <ElRadioButton label="warning" />
            <ElRadioButton label="danger" />
          </ElRadioGroup>
        </ElFormItem>
        <ElFormItem label="是否圆角">
          <ElSwitch v-model={p.prop.round}></ElSwitch>
        </ElFormItem>
        <ElFormItem label="是否次要">
          <ElSwitch v-model={p.prop.plain}></ElSwitch>
        </ElFormItem>
        <ElFormItem label="纯文本">
          <ElSwitch v-model={p.prop.text}></ElSwitch>
        </ElFormItem>
        {p.prop.text
          ? <ElFormItem label="带背景">
          <ElSwitch v-model={p.prop.bg}></ElSwitch>
        </ElFormItem>
          : null}
      </Fragment>)
    }
  },
})
export function Binder() {
  return ref("")
}
