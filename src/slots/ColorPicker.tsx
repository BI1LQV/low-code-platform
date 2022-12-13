import type { Ref } from "vue"
import { defineComponent, ref } from "vue"
import "element-plus/es/components/color-picker/style/css"
import { ElColorPicker } from "element-plus"
import type { CommonOptions, SlotOptions } from "@/models/slots"
import { BaseStyleImpl } from "@/models/slots"

export const Component = defineComponent({
  name: "EColorPicker",
  props: ["binder", "prop", "isProd"],
  setup({ binder, prop, isProd: _isProd }: { binder: Ref<any>; prop: SlotOptions; isProd: boolean }) {
    return () => {
      return <div><ElColorPicker v-model={binder.value} {...prop}/></div>
    }
  },
})

export function Prop(): CommonOptions {
  return {
    "style": {
      ...BaseStyleImpl(),
    },
  }
}

export function Binder() {
  return ref("rgb(255,255,255)")
}
