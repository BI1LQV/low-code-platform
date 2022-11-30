import type { Ref } from "vue"
import { Fragment, defineComponent } from "vue"
import { ElFormItem, ElInput } from "element-plus"
import type { EFlexOptions, SlotOptions } from "@/models/slots"
import { BaseStyleImpl } from "@/models/slots"
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
      "display": "flex",
      "flex-direction": "column",
    },
  }
}

export const StylePanel = defineComponent({
  props: ["prop"],
  setup({ prop }: { prop: SlotOptions }) {
    return () => (
      <Fragment>
        <ElFormItem label="元素方向"><ElInput v-model={prop.style["flex-direction"]}></ElInput></ElFormItem>
      </Fragment>
    )
  },
})
