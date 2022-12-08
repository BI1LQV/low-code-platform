import type { Ref } from "vue"
import { Fragment, defineComponent, ref } from "vue"
import { ElFormItem, ElRadioButton, ElRadioGroup } from "element-plus"
import type { EFlexOptions, SlotOptions } from "@/models/slots"
import { BaseFlexStyleImpl, BaseStyleImpl } from "@/models/slots"
import { PngDirection, PngItemsCenter, PngItemsEnd, PngItemsStart, PngJustifyAround, PngJustifyBetween, PngJustifyCenter, PngJustifyEnd, PngJustifyStart } from "@/assets/stylePanel"
export const Component = defineComponent({
  name: "EFlex",
  props: ["binder", "prop", "isProd"],
  setup(
    { prop, isProd }: { binder: Ref<any>; prop: SlotOptions; isProd: boolean },
    { slots },
  ) {
    return () => {
      return (
        <div class={isProd ? "" : "important-min-h-10px important-border-2px important-m-5px"} {...prop}>
          {slots.default?.()[0].children}
        </div>
      )
    }
  },
})

export function Prop(): EFlexOptions {
  return {
    style: {
      ...BaseStyleImpl(),
      ...BaseFlexStyleImpl(),
    },
  }
}

export const StylePanel = defineComponent({
  props: ["prop"],
  setup({ prop }: { prop: EFlexOptions }) {
    return () => {
      const mainRotate = prop.style["flex-direction"] === "row" ? "rotate-270deg" : ""
      const crossRotate = prop.style["flex-direction"] === "row" ? "rotate-90deg" : ""
      return (<Fragment>
        <ElFormItem label="元素方向">
          <ElRadioGroup class="override-el-radio-button" v-model={prop.style["flex-direction"]}>
            <ElRadioButton label="column"><img width="24" rotate-90deg src={PngDirection}></img>竖向布局</ElRadioButton>
            <ElRadioButton label="row"><img width="24" src={PngDirection}></img>横向布局</ElRadioButton>
          </ElRadioGroup>
        </ElFormItem>
        <ElFormItem label="主轴对齐">
          <ElRadioGroup class="override-el-radio-button" v-model={prop.style["justify-content"]}>
            <ElRadioButton label="flex-start"><img width="24" class={mainRotate} src={PngJustifyStart}></img>从头开始</ElRadioButton>
            <ElRadioButton label="flex-end"><img width="24" class={mainRotate} src={PngJustifyEnd}></img>从尾开始</ElRadioButton>
            <ElRadioButton label="center"><img width="24" class={mainRotate} src={PngJustifyCenter}></img>居中对齐</ElRadioButton>
            <ElRadioButton label="space-between"><img class={mainRotate} width="24" src={PngJustifyBetween}></img>顶头平分</ElRadioButton>
            <ElRadioButton label="space-around"><img class={mainRotate} width="24" src={PngJustifyAround}></img>等距平分</ElRadioButton>
          </ElRadioGroup>
        </ElFormItem>
        <ElFormItem label="副轴对齐">
          <ElRadioGroup class="override-el-radio-button" v-model={prop.style["align-items"]}>
            <ElRadioButton label="flex-start"><img width="24" class={crossRotate} src={PngItemsStart}></img>从头开始</ElRadioButton>
            <ElRadioButton label="flex-end"><img width="24" class={crossRotate} src={PngItemsEnd}></img>从尾开始</ElRadioButton>
            <ElRadioButton label="center"><img width="24" class={crossRotate} src={PngItemsCenter}></img>居中对齐</ElRadioButton>
          </ElRadioGroup>
        </ElFormItem>
      </Fragment>)
    }
  },
})

export const AttrPanel = defineComponent({
  props: ["prop"],
  setup({ prop: _prop }: { prop: EFlexOptions }) {
    return () => <div></div>
  },
})
export function Binder() {
  return ref(null)
}
