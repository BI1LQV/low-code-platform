import type { Ref } from "vue"
import { defineComponent } from "vue"
import type { SlotOptions } from "@/models"
export const name = "input"
export const Component = defineComponent({
  props: ["binder", "prop"],
  setup({ binder, prop }: { binder: Ref<any>; prop: SlotOptions }) {
    return () => (
    <div>
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
