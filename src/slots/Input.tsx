import type { Ref } from "vue"
import { defineComponent } from "vue"
import type { SlotOptions } from "@/models/slots"
export const Component = defineComponent({
  name: "EInput",
  props: ["binder", "prop"],
  setup({ binder, prop }: { binder: Ref<any>; prop: SlotOptions }) {
    return () => {
      // JSON.stringify(prop)// TODO: 研究到底是怎么做到依赖捕获的
      return <div class="w-50%">
      <input type="text"
       border-1 border-black
        v-model={binder.value}
        {...prop}
       />
    </div>
    }
  },
})

export function Style() {
  return {}
}

export function Prop() {
  return {}
}
