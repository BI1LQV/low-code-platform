import type { Ref } from "vue"
import { defineComponent, ref } from "vue"

import type { CommonOptions, SlotOptions } from "@/models/slots"
import { BaseStyleImpl } from "@/models/slots"

export const Component = defineComponent({
  name: "文本",
  props: ["binder", "prop", "isProd"],
  setup({ binder, prop, isProd: _isProd }: { binder: Ref<any>; prop: SlotOptions; isProd: boolean }) {
    return () => {
      return <span {...prop}>{binder.value}</span>
    }
  },
})

export function Binder() {
  return ref("输入文字")
}

export function Prop(): CommonOptions {
  return {
    "style": {
      ...BaseStyleImpl(),
    },
  }
}

export const AttrPanel = defineComponent({
  props: ["prop"],
  setup() {
    return () => {
      return <div></div>
    }
  },
})
