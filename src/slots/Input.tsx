import type { Ref } from "vue"
import { defineComponent } from "vue"
import type { SlotOptions } from "@/models/slots"
export const Component = defineComponent({
  name: "EInput",
  props: ["binder", "prop"],
  setup({ binder, prop }: { binder: Ref<any>; prop: SlotOptions }) {
    return () => (
    <div class=" w-50%">
      <input class="border-1 border-black" type="text"
        v-model={binder.value}
        props={prop}
       />
       <div>{binder.value}</div>
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
