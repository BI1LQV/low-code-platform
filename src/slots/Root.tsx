import type { Ref } from "vue"
import { defineComponent } from "vue"
import type { SlotOptions } from "@/models/slots"
export const Component = defineComponent({
  name: "ERoot",
  props: ["binder", "prop"],
  setup({ binder: _binder, prop }: { binder: Ref<any>; prop: SlotOptions }, { slots }) {
    return () => (
    <div class="h-100% w-100% border-1px border-amber" props={prop}>
      {slots.default?.()[0].children}
    </div>
    )
  },
})

export function Style() {
  return {}
}

export function Prop() {
  return {}
}
