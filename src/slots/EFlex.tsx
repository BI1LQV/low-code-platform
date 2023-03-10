import type { Ref } from "vue"
import { Fragment, defineComponent, ref } from "vue"
import { ElColorPicker, ElFormItem, ElInputNumber, ElRadioButton, ElRadioGroup } from "element-plus"

import type { EFlexOptions, SlotOptions } from "@/models/slots"
import { BaseFlexStyleImpl, BaseStyleImpl } from "@/models/slots"
import { PngDirection, PngItemsCenter, PngItemsEnd, PngItemsStart, PngJustifyAround, PngJustifyBetween, PngJustifyCenter, PngJustifyEnd, PngJustifyStart } from "@/assets/stylePanel"
export const Component = defineComponent({
  name: "Flex布局",
  props: ["binder", "prop", "isProd"],
  setup(
    p: { binder: Ref<any>; prop: SlotOptions; isProd: boolean },
    { slots },
  ) {
    return () => {
      const newProps = {
        ...p.prop,
        style: {
          ...p.prop.style,
          "border-radius": `${Number(p.prop["border-radius-top"])}px ${Number(p.prop["border-radius-right"])}px ${Number(p.prop["border-radius-bottom"])}px ${Number(p.prop["border-radius-left"])}px`,
          "border-top": `${p.prop["border-top-width"]}px ${p.prop["border-top-fill"]} ${p.prop["border-top-color"]}`,
          "border-right": `${p.prop["border-right-width"]}px ${p.prop["border-right-fill"]} ${p.prop["border-right-color"]}`,
          "border-bottom": `${p.prop["border-bottom-width"]}px ${p.prop["border-bottom-fill"]} ${p.prop["border-bottom-color"]}`,
          "border-left": `${p.prop["border-left-width"]}px ${p.prop["border-left-fill"]} ${p.prop["border-left-color"]}`,
        },
      }

      return (
        <div class={p.isProd ? "" : "important-min-h-10px important-border-2px"} {...newProps}>
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
      "align-items": "center",
      "justify-content": "center",
      "width": "90%",
    },
  }
}

export const StylePanel = defineComponent({
  props: ["prop"],
  setup(p) {
    return () => {
      const mainRotate = p.prop.style["flex-direction"] === "row" ? "rotate-270deg" : ""
      const crossRotate = p.prop.style["flex-direction"] === "row" ? "rotate-90deg" : ""
      return (<Fragment>
        <ElFormItem label="元素方向">
          <ElRadioGroup class="override-el-radio-button" v-model={p.prop.style["flex-direction"]}>
            <ElRadioButton label="column"><img width="24" rotate-90deg src={PngDirection}></img>竖向布局</ElRadioButton>
            <ElRadioButton label="row"><img width="24" src={PngDirection}></img>横向布局</ElRadioButton>
          </ElRadioGroup>
        </ElFormItem>
        <ElFormItem label="主轴对齐">
          <ElRadioGroup class="override-el-radio-button" v-model={p.prop.style["justify-content"]}>
            <ElRadioButton label="flex-start"><img width="24" class={mainRotate} src={PngJustifyStart}></img>从头开始</ElRadioButton>
            <ElRadioButton label="flex-end"><img width="24" class={mainRotate} src={PngJustifyEnd}></img>从尾开始</ElRadioButton>
            <ElRadioButton label="center"><img width="24" class={mainRotate} src={PngJustifyCenter}></img>居中对齐</ElRadioButton>
            <ElRadioButton label="space-between"><img class={mainRotate} width="24" src={PngJustifyBetween}></img>顶头平分</ElRadioButton>
            <ElRadioButton label="space-around"><img class={mainRotate} width="24" src={PngJustifyAround}></img>等距平分</ElRadioButton>
          </ElRadioGroup>
        </ElFormItem>
        <ElFormItem label="副轴对齐">
          <ElRadioGroup class="override-el-radio-button" v-model={p.prop.style["align-items"]}>
            <ElRadioButton label="flex-start"><img width="24" class={crossRotate} src={PngItemsStart}></img>从头开始</ElRadioButton>
            <ElRadioButton label="flex-end"><img width="24" class={crossRotate} src={PngItemsEnd}></img>从尾开始</ElRadioButton>
            <ElRadioButton label="center"><img width="24" class={crossRotate} src={PngItemsCenter}></img>居中对齐</ElRadioButton>
          </ElRadioGroup>
        </ElFormItem>
        {
          [["上边框", "top"], ["下边框", "bottom"],
            ["左边框", "left"], ["右边框", "right"]]
            .map(([label, key]) => (
              <ElFormItem label={label} key={label}>
              <ElInputNumber v-model={p.prop[`border-${key}-width`]}></ElInputNumber> <span color-gray text-16px m-l-10px>px</span>
              <br />
              <ElRadioGroup v-model={p.prop[`border-${key}-fill`]} m-r-10px>
                <ElRadioButton label="dotted">圆点</ElRadioButton>
                <ElRadioButton label="dashed">虚线</ElRadioButton>
                <ElRadioButton label="solid">实线</ElRadioButton>
              </ElRadioGroup>
              <ElColorPicker v-model={p.prop[`border-${key}-color`]}></ElColorPicker>
            </ElFormItem>
            ))
        }
        <ElFormItem label="上边框圆角">
          <ElInputNumber v-model={p.prop["border-radius-top"]}></ElInputNumber><span color-gray text-16px m-l-10px>px</span>
        </ElFormItem>
        <ElFormItem label="下边框圆角">
          <ElInputNumber v-model={p.prop["border-radius-bottom"]}></ElInputNumber><span color-gray text-16px m-l-10px>px</span>
        </ElFormItem>
        <ElFormItem label="左边框圆角">
          <ElInputNumber v-model={p.prop["border-radius-left"]}></ElInputNumber><span color-gray text-16px m-l-10px>px</span>
        </ElFormItem>
        <ElFormItem label="右边框圆角">
          <ElInputNumber v-model={p.prop["border-radius-right"]}></ElInputNumber><span color-gray text-16px m-l-10px>px</span>
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
