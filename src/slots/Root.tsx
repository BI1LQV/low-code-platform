import type { Ref } from "vue"
import { defineComponent } from "vue"
import type { EFlexOptions, SlotOptions } from "@/models/slots"
export const Component = defineComponent({
  name: "ERoot",
  props: ["binder", "prop"],
  setup({ binder: _binder, prop }: { binder: Ref<any>; prop: SlotOptions }, { slots }) {
    return () => (
    <div h-full w-full border-1px border-amber props={prop}>
      {slots.default?.()[0].children}
    </div>
    )
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
    },
  }
}
