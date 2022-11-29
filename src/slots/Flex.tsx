import type { Ref } from "vue"
import { Fragment, defineComponent } from "vue"
import { ElFormItem, ElInput } from "element-plus"
import type { EFlexOptions, SlotOptions } from "@/models/slots"
export const Component = defineComponent({
  name: "EFlex",
  props: ["binder", "prop", "isProd"],
  setup(
    { prop, isProd }: { binder: Ref<any>; prop: SlotOptions; isProd: boolean },
    { slots },
  ) {
    return () => {
      return (
        <div class={isProd ? "" : "min-h-10px border-2px m-5px"} {...prop}>
          {slots.default?.()[0].children}
        </div>
      )
    }
  },
})

export function Prop(): EFlexOptions {
  return {
    style: {
      "display": "flex",
      "flex-direction": "column",
      "height": "auto",
      "width": "auto",
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
