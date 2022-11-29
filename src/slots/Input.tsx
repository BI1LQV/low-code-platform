import type { Ref } from "vue"
import { defineComponent } from "vue"
import type { SlotOptions } from "@/models/slots"
export const Component = defineComponent({
  name: "EInput",
  props: ["binder", "prop", "isProd"],
  setup({ binder, prop }: { binder: Ref<any>; prop: SlotOptions; isProd: boolean }) {
    return () => {
      // JSON.stringify(prop)// TODO: 研究到底是怎么做到依赖捕获的
      return <input type="text"
        v-model={binder.value}
        {...prop}
       />
    }
  },
})

export function Prop() {
  return {
    style: {
      "border-width": "1px",
      "border-style": "solid",
      "border-color": "black",
      "width": "50%",
      "height": "24px",
    },
  }
}
