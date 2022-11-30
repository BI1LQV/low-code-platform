import type { Ref } from "vue"
import { defineComponent } from "vue"
import type { EFlexOptions, SlotOptions } from "@/models/slots"
import { BaseFlexStyleImpl, BaseStyleImpl } from "@/models/slots"
export const Component = defineComponent({
  name: "ERoot",
  props: ["binder", "prop", "isProd"],
  setup({ binder: _binder, prop, isProd }: { binder: Ref<any>; prop: SlotOptions;isProd: boolean }, { slots }) {
    return () => (
    <div class={isProd ? "" : "border-1px border-amber"} {...prop}>
      {slots.default?.()[0].children}
    </div>
    )
  },
})

export function Prop(): EFlexOptions {
  return {
    style: {
      ...BaseStyleImpl(),
      ...BaseFlexStyleImpl(),
      "height": "100%",
      "width": "100%",
    },
  }
}
