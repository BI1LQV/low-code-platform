import type { Ref } from "vue"
import { defineComponent } from "vue"
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

export function Style() {
  return {}
}

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
